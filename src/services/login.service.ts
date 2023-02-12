import { UserModel } from '../models/user';
import { encryptPassword } from './encrypt.service';

const comparePassword = (password: string, hash: string) => encryptPassword(password) === hash;

const login = async (email: string, password: string): Promise<UserLogin | null> => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return null;
  }

  return comparePassword(password, user.password) ? user : null;
};

export { login };
