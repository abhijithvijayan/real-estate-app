import {UserRole} from '../models/Role';

export const RolesSeed = [
  {
    name: UserRole.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: UserRole.BUYER,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: UserRole.SELLER,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: UserRole.AGENT,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
