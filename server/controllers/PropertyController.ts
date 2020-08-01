import {Request, Response} from 'express';
import {getRepository} from 'typeorm';

import {UserFavourite} from '../models/UserFavourite';
import {UserListing} from '../models/UserListing';
import {Property} from '../models/Property';
import {Address} from '../models/Address';
import {Country} from '../models/Country';
import {ZipCode} from '../models/ZipCode';
import {State} from '../models/State';
import {City} from '../models/City';
import {User} from '../models/User';

class PropertyController {
  static createListing = async (
    req: Request,
    res: Response
  ): Promise<Response<any>> => {
    const currentUser = req.user as User | undefined;

    if (currentUser === undefined) {
      return res.status(401).send('No such user');
    }

    const {
      squareMeter,
      shortDescription,
      longDescription,
      noOfRooms,
      noOfBedRooms,
      noOfBathRooms,
      address: {
        streetName,
        addressType,
        cityName,
        countryName,
        countryCode,
        stateName,
        stateCode,
      },
    }: {
      squareMeter: number;
      shortDescription: string;
      longDescription: string;
      noOfRooms: number;
      noOfBedRooms: number;
      noOfBathRooms: number;
      address: {
        streetName: string;
        addressType: string;
        cityName: string;
        countryName: string;
        countryCode: string;
        stateName: string;
        stateCode: string;
      };
    } = req.body;

    const property = new Property();
    property.squareMeter = squareMeter;
    property.shortDescription = shortDescription;
    property.longDescription = longDescription;
    property.noOfRooms = noOfRooms;
    property.noOfBedRooms = noOfBedRooms;
    property.noOfBathRooms = noOfBathRooms;

    const zipCodeRepository = getRepository(ZipCode);
    const countryRepository = getRepository(Country);
    const stateRepository = getRepository(State);
    const cityRepository = getRepository(City);

    /**
     *  find existing location and map to it
     *  Country/State/City based on ZipCode
     */
    let city: City | undefined = await cityRepository.findOne({
      where: {name: cityName},
    });
    if (!city) {
      city = new City();
      city.name = cityName;
      await cityRepository.save(city);
    }

    let state: State | undefined = await stateRepository.findOne({
      where: {name: stateName},
    });
    if (!state) {
      state = new State();
      state.name = stateName;
      state.code = stateCode;
      await stateRepository.save(state);
    }

    let country: Country | undefined = await countryRepository.findOne({
      where: {name: countryName},
    });
    if (!country) {
      country = new Country();
      country.name = countryName;
      country.code = countryCode;
      await countryRepository.save(country);
    }

    let zipCode: ZipCode;
    try {
      zipCode = await zipCodeRepository.findOneOrFail({
        where: {city, state, country},
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      zipCode = new ZipCode();
      zipCode.city = city;
      zipCode.state = state;
      zipCode.country = country;
      await zipCodeRepository.save(zipCode);
    }

    const address = new Address();
    address.street = streetName;
    address.type = addressType;
    address.zipCode = zipCode;

    const userListingRepository = getRepository(UserListing);
    const propertiesRepository = getRepository(Property);
    const addressRepository = getRepository(Address);
    const userRepository = getRepository(User);

    try {
      await addressRepository.save(address);
      property.address = address;

      // check if user listing exist, if not, create one
      // save to a user's listing
      let userListing: UserListing;
      let user: User | undefined;
      try {
        user = await userRepository.findOneOrFail({
          relations: ['userListing'],
          where: {id: currentUser.id},
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // Todo: Possibly ends up here if user doesn't exist(but middlewares would probably get that before)
      }

      if (user) {
        // Existing list found
        if (user?.userListing) {
          userListing = user.userListing;
        }
        // No listing found
        else {
          // save new listing
          userListing = new UserListing();
          await userListingRepository.save(userListing);
          // attach this listing to user
          user.userListing = userListing;
          await userRepository.save(user);
        }

        // append property to the listing(by updating property's listing relationship)
        property.listing = Promise.resolve(userListing); // lazy loaded

        // save property
        await propertiesRepository.save(property);

        return res
          .status(201)
          .send({message: 'Listing of property successful.', status: true});
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      //
    }

    return res
      .status(500)
      .send({message: 'Listing creation of property failed', status: false});
  };

  static getUserListings = async (
    req: Request,
    res: Response
  ): Promise<Response<any>> => {
    const currentUser = req.user as User | undefined;

    if (currentUser === undefined) {
      return res.status(401).send('No such user');
    }

    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOne({
        relations: ['userListing'],
        where: {id: currentUser.id},
      });

      if (user?.userListing) {
        // to load objects inside lazy relations:
        const properties: Property[] = await user.userListing.properties;

        return res.status(200).json({
          data: properties,
          status: true,
          message: 'Fetching successful',
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      //
    }

    return res
      .status(500)
      .send({message: "Error fetching user's listings", status: false});
  };

  static addOrRemoveFromFavourites = async (
    req: Request,
    res: Response
  ): Promise<Response<any>> => {
    const currentUser = req.user as User | undefined;

    if (currentUser === undefined) {
      return res.status(401).send('No such user');
    }

    const {action, listingId}: {action: 0 | 1; listingId: string} = req.body;
    const actionMessage =
      (action === 1 && 'Added to favourites') || 'Removed from favourites';
    const userFavouriteRepository = getRepository(UserFavourite);
    const propertiesRepository = getRepository(Property);
    const userRepository = getRepository(User);

    try {
      let userFavourite: UserFavourite;

      const user = await userRepository.findOne({
        relations: ['userFavourite'],
        where: {id: currentUser.id},
      });

      const selectedItem:
        | Property
        | undefined = await propertiesRepository.findOne({
        where: {id: listingId},
      });

      if (user && selectedItem) {
        // Existing list found
        if (user?.userFavourite) {
          userFavourite = user.userFavourite;
        }
        // No Favourite List found
        else {
          // save new favourites list
          userFavourite = new UserFavourite();
          await userFavouriteRepository.save(userFavourite);

          // attach this Favourite List to user
          user.userFavourite = userFavourite;
          await userRepository.save(user);

          // Nothing to remove as list is empty
          if (action === 0) {
            return res
              .status(500)
              .send({message: 'List is already empty', status: false});
          }
        }

        // to load objects inside lazy relations:
        const properties: Property[] = await userFavourite.properties;
        const remaining: Property[] = properties.filter(
          (property) => property.id !== selectedItem.id
        );

        // Append to favourites if item doesn't exist in list already
        if (action === 1) {
          userFavourite.properties = Promise.resolve([
            selectedItem,
            ...remaining,
          ]); // lazy loaded
        } else {
          // Remove from favourites
          userFavourite.properties = Promise.resolve(remaining); // lazy loaded
        }

        // update favourites list
        await userFavouriteRepository.save(userFavourite);

        return res.status(200).json({
          status: true,
          message: actionMessage,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      //
    }

    return res
      .status(500)
      .send({message: 'Error performing action', status: false});
  };

  static getFavourites = async (
    req: Request,
    res: Response
  ): Promise<Response<any>> => {
    const currentUser = req.user as User | undefined;

    if (currentUser === undefined) {
      return res.status(401).send('No such user');
    }

    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOne({
        relations: ['userFavourite'],
        where: {id: currentUser.id},
      });

      if (user?.userFavourite) {
        // to load objects inside lazy relations:
        const properties: Property[] = await user.userFavourite.properties;
        // Todo: attach images once it is set

        return res.status(200).json({
          data: properties,
          status: true,
          message: 'Fetching successful',
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      //
    }

    return res
      .status(500)
      .send({message: "Error fetching user's favourites", status: false});
  };

  static getAllPropertyListings = async (
    req: Request,
    res: Response
  ): Promise<Response<any>> => {
    //
    const propertiesRepository = getRepository(Property);
    // Todo: attach address and all other fields

    try {
      const properties = await propertiesRepository
        .createQueryBuilder('property')
        .leftJoinAndSelect('property.address', 'address')
        .leftJoinAndSelect('address.zipCode', 'zipCode')
        .leftJoinAndSelect('zipCode.city', 'city')
        .leftJoinAndSelect('zipCode.state', 'state')
        .leftJoinAndSelect('zipCode.country', 'country')
        .leftJoinAndSelect('property.listing', 'seller') // this is being lazy loaded
        .leftJoinAndSelect('seller.user', 'owner') // so output doesn't reflect owner field
        .getMany();

      return res.status(200).json({
        data: properties,
        status: true,
        message: 'Fetching successful',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      //
    }
    return res
      .status(500)
      .send({message: 'Error fetching properties', status: false});
  };
}

export default PropertyController;
