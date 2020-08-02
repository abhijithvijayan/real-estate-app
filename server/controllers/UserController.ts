import {Request, Response, NextFunction} from 'express';
import {getRepository} from 'typeorm';

import {Role, UserRole} from '../models/Role';
import {User} from '../models/User';

class UserController {
  static signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any>> => {
    const {
      email,
      password,
      role,
    }: {email: string; password: string; role: 0 | 1} = req.body;

    let selectedRole: Role;
    const selectedRoleName = (role === 0
      ? UserRole.BUYER
      : UserRole.SELLER) as string;
    const userRepository = getRepository(User);
    const rolesRepository = getRepository(Role);

    const user = new User();
    user.email = email;
    user.password = user.getPasswordHash(password);
    try {
      selectedRole = await rolesRepository.findOneOrFail({
        where: {name: selectedRoleName},
      });
      // Assign selected role for new user
      user.roles = [selectedRole];
      // Try to save. If fails, the username is already in use
      await userRepository.save(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return res
        .status(409)
        .send({message: 'Email already in use', status: false});
    }

    req.user = {
      ...user,
      // Todo: attach admin flag
    };

    return next();
  };
}

export default UserController;
