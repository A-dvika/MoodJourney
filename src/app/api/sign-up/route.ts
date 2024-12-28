import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return Response.json(
          { success: false, message: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Generate JWT token for login
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET!, {
        expiresIn: '7d',
      });

      return Response.json(
        { success: true, message: 'Login successful', token },
        { status: 200 }
      );
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      isAcceptingMessages: true,
      messages: [],
    });

    await newUser.save();

    // Generate JWT token for new user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    return Response.json(
      { success: true, message: 'Signup successful', token },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in authentication:', error);
    return Response.json(
      { success: false, message: 'Error in authentication' },
      { status: 500 }
    );
  }
}
