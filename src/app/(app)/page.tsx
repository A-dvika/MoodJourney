'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { useInView } from 'framer-motion'; // For scroll animations

export default function Home() {
  useEffect(() => {
    // Adding smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-yellow-400 to-orange-300 text-white">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight transform transition-all duration-500 hover:scale-105">
            Welcome to MoodJourney
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-80 transition-opacity duration-500 hover:opacity-100">
            Your personal companion to track and uplift your mood.
          </p>
          <Button className="mt-6 px-6 py-3 bg-white text-yellow-500 font-semibold rounded-lg shadow-lg hover:bg-yellow-100 transition-transform transform hover:scale-110">
            Get Started
          </Button>
        </section>

        {/* Highlighted Features */}
        <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white text-orange-500 shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Track Your Mood</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Easily record daily reflections and analyze trends over time.</p>
            </CardContent>
          </Card>

          <Card className="bg-white text-orange-500 shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Get personalized feedback and encouragement based on your entries.</p>
            </CardContent>
          </Card>

          <Card className="bg-white text-orange-500 shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Stay Motivated</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Unlock mood streaks and positive affirmations to stay on track.</p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 bg-orange-700 text-white">
        <p className="text-sm">© 2024 MoodJourney. All rights reserved.</p>
      </footer>
    </>
  );
}
