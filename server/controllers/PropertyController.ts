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

    let zipCode: ZipCode | undefined = await zipCodeRepository.findOne({
      where: {city, state, country},
    });
    if (!zipCode) {
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

      // save property
      property.address = address;
      await propertiesRepository.save(property);

      // check if user listing exist, if not, create one
      // save to a user's listing
      let userListing: UserListing;
      try {
        const user = await userRepository.findOneOrFail({
          relations: ['user_listing'],
          where: {id: currentUser.id},
        });
        userListing = user.userListing;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.log(err);

        // Todo: Possibly ends up here if user doesn't exist(but middlewares should probably get that before)
        userListing = new UserListing();
        userListing.properties = [];
      }

      // save or append to user's listing
      userListing.properties = [...userListing.properties, property];
      await userListingRepository.save(userListing);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.log(err);

      return res
        .status(500)
        .send({message: 'Listing creation of property failed'});
    }

    return res.status(201).send({message: 'Listing of property successful.'});
  };
}

export default PropertyController;
