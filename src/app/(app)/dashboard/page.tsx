'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import JournalTest from '@/components/JournalTest';

const UserDashboard = () => {
  return (
    <div>
      <JournalTest />
    </div>
  );
};

export default UserDashboard;


UserDashboard