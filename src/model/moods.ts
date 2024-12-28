import mongoose, { Schema, Document } from 'mongoose';

export interface Mood extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the user
  date: Date; // Specific date
  mood: string; // Mood for that day
  streakCount: number; // Current streak count
}

const MoodSchema: Schema<Mood> = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'neutral', 'excited', 'angry'], // Define mood types
    required: [true, 'Mood is required'],
  },
  streakCount: {
    type: Number,
    default: 0,
  },
});

const MoodModel =
  (mongoose.models.Mood as mongoose.Model<Mood>) ||
  mongoose.model<Mood>('Mood', MoodSchema);

export default MoodModel;
