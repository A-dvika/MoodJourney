'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';

function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gradient-to-b from-yellow-400 to-orange-300 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-3xl font-bold tracking-tight">
          MoodJourney
        </a>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <span className="text-lg">Welcome, {user.username || user.email}</span>
              <Button onClick={() => signOut()} className="bg-white text-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-100 transition">
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-white text-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-100 transition">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
