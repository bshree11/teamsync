/**
 * USER SERVICE
 * 
 * What: Handles user profile operations
 */

import User, { IUser } from '../models/User';

interface UpdateProfileInput {
  name?: string;
  avatar?: string;
}

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

interface ServiceResult {
  success: boolean;
  user?: any;
  users?: any[];
  error?: string;
}

/**
 * GET USER PROFILE
 */
export const getProfile = async (userId: string): Promise<ServiceResult> => {
  const user = await User.findById(userId).select('-password');

  if (!user) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  return {
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
    },
  };
};

/**
 * UPDATE USER PROFILE
 */
export const updateProfile = async (
  userId: string,
  input: UpdateProfileInput
): Promise<ServiceResult> => {
  const user = await User.findById(userId);

  if (!user) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  if (input.name) user.name = input.name;
  if (input.avatar) user.avatar = input.avatar;

  await user.save();

  return {
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    },
  };
};

/**
 * CHANGE PASSWORD
 */
export const changePassword = async (
  userId: string,
  input: ChangePasswordInput
): Promise<ServiceResult> => {
  const user = await User.findById(userId);

  if (!user) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  const isMatch = await user.matchPassword(input.currentPassword);

  if (!isMatch) {
    return {
      success: false,
      error: 'Current password is incorrect',
    };
  }

  user.password = input.newPassword;
  await user.save();

  return {
    success: true,
  };
};

/**
 * GET ALL USERS
 */
export const getAllUsers = async (): Promise<ServiceResult> => {
  const users = await User.find().select('-password');

  return {
    success: true,
    users: users.map((user) => ({
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    })),
  };
};