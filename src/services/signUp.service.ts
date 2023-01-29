import { UserModel } from '../models/user';

const createUser = (user: User): Promise<User> => {
  const createdUser = new UserModel(user);
  return createdUser.save();
};

export { createUser };
