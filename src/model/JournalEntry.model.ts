import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    content: {
        type: String,
        required: [true, "Please provide the journal content"],
    },
    sentiment: {
        type: String,
        enum: ["happy", "sad", "neutral", "angry", "excited"],
        default: "neutral",
    },
    emoji: {
        type: String, // Can store emojis based on sentiment
        default: "😐",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const JournalEntry = mongoose.models.journalEntries || mongoose.model("journalEntries", journalEntrySchema);

export default JournalEntry;
