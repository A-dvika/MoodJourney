import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the structure of a journal entry
interface Journal {
  _id: string;
  title: string;
  content: string;
  mood: string;
}

const JournalTest = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('happy');
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);

  // Fetch all journals from the API
  const fetchJournals = async () => {
    try {
      const response = await axios.get('/api/journal');
      setJournals(response.data);
    } catch (error) {
      console.error('Failed to fetch journals:', error);
    }
  };

  // Create a new journal entry
  const createJournal = async () => {
    try {
      const response = await axios.post('/api/journal', {
        title,
        content,
        mood,
      });
      setJournals([...journals, response.data]);
      setTitle('');
      setContent('');
      setMood('happy');
    } catch (error) {
      console.error('Failed to create journal:', error);
    }
  };

  // Update an existing journal entry
  const updateJournal = async (id: string) => {
    try {
      const response = await axios.put(`/api/journal/${id}`, {
        title,
        content,
        mood,
      });
      setJournals(
        journals.map((journal) =>
          journal._id === id ? response.data : journal
        )
      );
      setSelectedJournal(null);
      setTitle('');
      setContent('');
      setMood('happy');
    } catch (error) {
      console.error('Failed to update journal:', error);
    }
  };

  // Delete a journal entry
  const deleteJournal = async (id: string) => {
    try {
      await axios.delete(`/api/journal/${id}`);
      setJournals(journals.filter((journal) => journal._id !== id));
    } catch (error) {
      console.error('Failed to delete journal:', error);
    }
  };

  // Fetch journals on component mount
  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <div>
      <h1>Journal Tester</h1>

      <div>
        <h2>{selectedJournal ? 'Edit Journal' : 'Create Journal'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="neutral">Neutral</option>
          <option value="excited">Excited</option>
          <option value="angry">Angry</option>
        </select>
        <button
          onClick={() =>
            selectedJournal ? updateJournal(selectedJournal._id) : createJournal()
          }
        >
          {selectedJournal ? 'Update' : 'Create'}
        </button>
        {selectedJournal && (
          <button
            onClick={() => {
              setSelectedJournal(null);
              setTitle('');
              setContent('');
              setMood('happy');
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <div>
        <h2>Journal Entries</h2>
        {journals.length > 0 ? (
          journals.map((journal) => (
            <div
              key={journal._id}
              style={{
                border: '1px solid #ccc',
                margin: '8px',
                padding: '8px',
              }}
            >
              <h3>{journal.title}</h3>
              <p>{journal.content}</p>
              <p>
                <strong>Mood:</strong> {journal.mood}
              </p>
              <button
                onClick={() => {
                  setSelectedJournal(journal);
                  setTitle(journal.title);
                  setContent(journal.content);
                  setMood(journal.mood);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteJournal(journal._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No journal entries found.</p>
        )}
      </div>
    </div>
  );
};

export default JournalTest;
