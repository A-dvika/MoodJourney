import mongoose from "mongoose";

const moodStreakSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    streak: {
        type: Number,
        default: 0,
    },
    lastEntryDate: {
        type: Date,
        default: null,
    },
    moods: {
        type: [String], // Array of emojis for each day's mood
        default: [],
    },
});

const MoodStreak = mongoose.models.moodStreaks || mongoose.model("moodStreaks", moodStreakSchema);

export default MoodStreak;
