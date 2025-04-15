/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateUserId,
} from './user.utils';

const createUserIntoDB = async (
  file: any,
  password: string,
  payload: TUser,
) => {
  // create a user object
  const userData: Partial<TUser> = {...payload};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);


  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateUserId();

    if (file) {
      const imageName = `${userData.id}${payload?.name}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a User
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }


    await session.commitTransaction();
    await session.endSession();

    return newUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};


const getMe = async (userId: string) => {
  const result = await User.findOne({ id: userId }).select('+password');
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getMe,
  changeStatus,
};
