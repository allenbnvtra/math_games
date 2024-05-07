import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A quiz should have title"],
    },
    quizType: {
      type: String,
      enum: ["choices", "identification"],
      required: [true, "A quiz should have quiz type"],
    },
    submitDate: Date,
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
export default Quiz;
