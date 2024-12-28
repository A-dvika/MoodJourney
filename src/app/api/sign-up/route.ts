import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// Validation helper
const validateInput = ({ username, email, password }: Record<string, any>) => {
  console.log('Validating input...');
  if (!email || !password || !username) {
    throw new Error('Username, email, and password are required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  console.log('Input validated successfully.');
};

// Helper function to check password strength
const checkPasswordStrength = (password: string) => {
  console.log('Checking password strength...');
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(password)) {
    throw new Error(
      'Password must contain at least one letter, one number, and one special character.'
    );
  }
  console.log('Password is strong.');
};

export async function POST(request: Request) {
  await dbConnect();

  try {
    console.log('Connecting to the database...');
    
    const { username, email, password, profilePictureUrl } = await request.json();
    console.log('Received data:', { username, email, password, profilePictureUrl });

    // Validate input
    validateInput({ username, email, password });
    checkPasswordStrength(password); // Check for strong passwords

    // Check if user already exists
    console.log('Checking if user already exists...');
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      console.log('User with this email already exists');
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 400 }
      );
    }
    console.log('No user with this email found.');

    // Hash password before saving
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully.');

    // Create a new user with additional fields
    console.log('Creating new user...');
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      profilePictureUrl: profilePictureUrl || null,  // Optional field, can be null initially
      journals: [], // Initialize an empty array for journals
    });

    await newUser.save();
    console.log('User saved successfully:', newUser);

    // Generate JWT token for new user
    console.log('Generating JWT token...');
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });
    console.log('JWT token generated:', token);

    return NextResponse.json(
      { success: true, message: 'Signup successful', token },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in signup:', error.message);
    return NextResponse.json(
      { success: false, message: error.message || 'Error in signup' },
      { status: 400 }
    );
  }
}
