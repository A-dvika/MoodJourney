import mongoose, { Schema, Document } from 'mongoose';

export interface Journal extends Document {
  title: string;
  content: string;
  userId: mongoose.Types.ObjectId;
  isStreakEntry: boolean;
  mood: string;
  feedbackMessage: string;
  tags: string[];
  isPrivate: boolean;
  wordCount: number;
  isDeleted: boolean;
  deletedAt: Date | null;
}

const JournalSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isStreakEntry: {
      type: Boolean,
      default: false,
    },
    mood: {
      type: String,
      default: "neutral",
    },
    feedbackMessage: {
      type: String,
      default: "",
    },
    tags: {
        type: [String],
        default: [],
        validate: {
          validator: function (v: string[]) {
            return v.every((tag: string) => tag.length <= 50);
          },
          message: 'Tags must be shorter than 50 characters.',
        },
      },
      
    isPrivate: {
      type: Boolean,
      default: true,
    },
    wordCount: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

JournalSchema.pre('save', function (next) {
  this.wordCount = this.content.split(/\s+/).filter(Boolean).length;
  if (this.isDeleted && !this.deletedAt) {
    this.deletedAt = new Date();
  } else if (!this.isDeleted) {
    this.deletedAt = null;
  }
  next();
});

const JournalModel =
  mongoose.models.Journal || mongoose.model<Journal>('Journal', JournalSchema);

export default JournalModel;
