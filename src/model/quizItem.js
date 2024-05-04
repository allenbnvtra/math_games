import mongoose from "mongoose";

const quizItemSchema = new mongoose.Schema({
  quizID: {
    type: mongoose.Schema.ObjectId,
    ref: "Quiz",
    // required: [true, "quiz id is needed"],
  },
  questionNumber: Number,
  question: {
    type: String,
    required: [true, "Question is required"],
  },
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
  isAnswerCorrect: {
    type: Boolean,
    default: false,
  },
});

quizItemSchema.pre(/^find/, function (next) {
  this.populate({
    path: "quizID",
    select: "title",
  });
  next();
});

const quizItem =
  mongoose.models.QuizItem || mongoose.model("QuizItem", quizItemSchema);

export default quizItem;
