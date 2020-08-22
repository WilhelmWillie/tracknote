import mongoose from 'mongoose';

import { User } from '../types';

type UserType = User & mongoose.Document;

const UserSchema = new mongoose.Schema({
  spotify: {
    tokens: {
      type: {
        access: String,
        refresh: String,
        expireDate: Date,
      },
      select: false,
    },
    id: {
      type: String,
      unique: true,
    },
    email: String,
    displayName: String,
  },
  jwt: {
    type: String,
    unique: true,
    select: false,
  },
});

const UserModel = mongoose.model<UserType>('User', UserSchema);

export {
  UserSchema
};

export default UserModel;