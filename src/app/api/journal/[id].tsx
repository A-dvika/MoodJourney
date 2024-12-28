
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import JournalModel from '@/model/journal';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    // Fetch a journal by ID
    try {
      const journal = await JournalModel.findById(id);
      if (!journal) {
        return res.status(404).json({ error: 'Journal not found' });
      }
      return res.status(200).json(journal);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch journal' });
    }
  }

  if (req.method === 'PUT') {
    // Update a journal by ID
    const { title, content, mood } = req.body;

    try {
      const updatedJournal = await JournalModel.findByIdAndUpdate(
        id,
        { title, content, mood },
        { new: true }
      );
      if (!updatedJournal) {
        return res.status(404).json({ error: 'Journal not found' });
      }
      return res.status(200).json(updatedJournal);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update journal' });
    }
  }

  if (req.method === 'DELETE') {
    // Delete a journal by ID
    try {
      const deletedJournal = await JournalModel.findByIdAndDelete(id);
      if (!deletedJournal) {
        return res.status(404).json({ error: 'Journal not found' });
      }
      return res.status(200).json({ message: 'Journal deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete journal' });
    }
  }

  // Handle unsupported methods
  return res.setHeader('Allow', ['GET', 'PUT', 'DELETE']).status(405).end(`Method ${req.method} Not Allowed`);
}
