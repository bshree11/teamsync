/**
 * AUTH SERVICE
 * 
 * What: Handles register and login logic
 */

import User, { IUser } from '../models/User';
import { generateToken } from '../utils/jwt';

interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  error?: string;
}

/**
 * REGISTER A NEW USER
 */
export const registerUser = async (input: RegisterInput): Promise<AuthResult> => {
  const { email, password, name } = input;

  // 1. Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return {
      success: false,
      error: 'User with this email already exists',
    };
  }

  // 2. Create new user (password hashed automatically)
  const user = await User.create({
    email,
    password,
    name,
  });

  // 3. Generate token
  const token = generateToken(user._id.toString(), user.email);

  // 4. Return success
  return {
    success: true,
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

/**
 * LOGIN USER
 */
export const loginUser = async (input: LoginInput): Promise<AuthResult> => {
  const { email, password } = input;

  // 1. Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
      error: 'Invalid email or password',
    };
  }

  // 2. Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return {
      success: false,
      error: 'Invalid email or password',
    };
  }

  // 3. Generate token
  const token = generateToken(user._id.toString(), user.email);

  // 4. Return success
  return {
    success: true,
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

/**
 * GET USER BY ID
 */
export const getUserById = async (userId: string): Promise<IUser | null> => {
  const user = await User.findById(userId).select('-password');
  return user;
};