import { UserModel } from '../models/user';
import { encryptPassword } from './encrypt.service';

const comparePassword = (password: string, hash: string) => {
  const encryptedPassword = encryptPassword(password);
  return encryptedPassword === hash;
};

const login = async (email: string, password: string): Promise<UserLogin | null> => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return null;
  }
  const isPasswordCorrect = comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    return null;
  }

  return user;
};

export { login };
