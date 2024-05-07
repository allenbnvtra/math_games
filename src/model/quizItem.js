import mongoose from "mongoose";

const quizItemSchema = new mongoose.Schema({
  quizID: {
    type: mongoose.Schema.ObjectId,
    ref: "Quiz",
    // required: [true, "quiz id is needed"],
  },
  question: {
    type: String,
    required: [true, "Question is required"],
  },
  answers: [
    {
      type: String,
      required: [true, "Choice is required"],
    },
  ],
  correctAnswer: {
    type: String,
    required: [true, "Correct Answer is required"],
  },
});

quizItemSchema.pre(/^find/, function (next) {
  this.populate({
    path: "quizID",
    select: "title quizType",
  });
  next();
});

const QuizItem =
  mongoose.models.QuizItem || mongoose.model("QuizItem", quizItemSchema);

export default QuizItem;
