import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import JournalModel from '@/model/journal';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    // Fetch all journals
    try {
      const journals = await JournalModel.find({});
      return res.status(200).json(journals);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch journals' });
    }
  }

  if (req.method === 'POST') {
    // Create a new journal
    const { title, content, mood } = req.body;

    if (!title || !content || !mood) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newJournal = await JournalModel.create({ title, content, mood });
      return res.status(201).json(newJournal);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create journal' });
    }
  }

  // Handle unsupported methods
  return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Method ${req.method} Not Allowed`);
}
