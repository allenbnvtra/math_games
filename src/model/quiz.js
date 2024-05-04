import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A quiz should have title"],
    },
    numberOfItems: {
      type: Number,
      required: [true, "A quiz should have number of items"],
    },
    submitDate: Date,
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
export default Quiz;
