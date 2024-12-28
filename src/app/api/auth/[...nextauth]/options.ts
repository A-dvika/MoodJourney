import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        console.log('Starting authorization process...');
        await dbConnect();
        try {
          console.log('Searching for user with credentials...');
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            console.error('User not found');
            throw new Error('User not found');
          }

          console.log('User found:', user.username);

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            console.error('Invalid password');
            throw new Error('Invalid password');
          }

          console.log('Password is correct');
          return user; // Make sure the user is of the correct type
        } catch (err) {
          console.error('Authorization error:', err);
          throw new Error('Invalid credentials or user not found');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback triggered...');
      if (user) {
        token._id = (user as any)._id?.toString() || ''; // Cast to User type
        token.username = user.username;
        console.log('JWT token updated with user data:', token);
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback triggered...');
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        console.log('Session updated:', session);
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET || 'fallback-secret',
  pages: {
    signIn: '/sign-in',
  },
};
