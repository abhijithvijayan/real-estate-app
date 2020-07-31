import {Request, Response} from 'express';
import {getRepository} from 'typeorm';

import {User} from '../models/User';

class AuthController {
  static signup = async (
    req: Request,
    res: Response
  ): Promise<Response<any>> => {
    // Todo: get role and assign it
    const {email, password} = req.body;

    const user = new User();
    user.email = email;
    user.password = user.getPasswordHash(password);

    // Try to save. If fails, the username is already in use
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return res.status(409).send({message: 'Email already in use'});
    }

    return res.status(201).send({message: 'Signup successful.'});
  };
}

export default AuthController;
