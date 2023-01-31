import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<User>({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

export const UserModel = mongoose.model<User>('user', UserSchema);
