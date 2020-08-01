import {Request, Response} from 'express';
import {getRepository} from 'typeorm';

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
      await zipCodeRepository.save(zipCode);
    }

    // Form relationships
    city.zipCode = zipCode;
    await cityRepository.save(city);
    state.zipCode = zipCode;
    await stateRepository.save(state);
    country.zipCode = zipCode;
    await countryRepository.save(country);

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

  static getListings = async (
    req: Request,
    res: Response
  ): Promise<Response<any>> => {
    const currentUser = req.user as User | undefined;

    if (currentUser === undefined) {
      return res.status(401).send('No such user');
    }

    const userRepository = getRepository(User);
    // const propertiesRepository = getRepository(Property);

    try {
      const user = await userRepository.findOne({
        relations: ['userListing'],
        where: {id: currentUser.id},
      });

      if (user?.userListing) {
        // to load objects inside lazy relations:
        const properties: Property[] = await user.userListing.properties;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
}

export default PropertyController;