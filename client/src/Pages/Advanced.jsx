import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Check,
  X,
  BookOpen,
  Award,
  RotateCcw,
  ArrowLeftCircle,
} from "lucide-react";
import { useEffect } from "react";
import { getLesson } from "@/store/Lesson";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Advanced = () => {
  const { lessons, isLoading } = useSelector((state) => state.lesson);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLesson());
  }, [dispatch]);

  // Filter only beginner lessons
  const advancedLessons =
    lessons?.filter((lesson) => lesson.level === "Advanced") || [];

  const handleAnswerSelect = (lessonId, questionIndex, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        [questionIndex]: answerIndex,
      },
    }));
  };

  const checkAnswers = (lessonId) => {
    const lesson = advancedLessons?.find((l) => l._id === lessonId);
    let correct = 0;

    lesson.exercises.forEach((exercise, index) => {
      if (selectedAnswers[lessonId]?.[index] === exercise.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / lesson.exercises.length) * 100);
    setScores((prev) => ({ ...prev, [lessonId]: score }));
    setShowResults((prev) => ({ ...prev, [lessonId]: true }));
  };

  const clearAnswers = (lessonId) => {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[lessonId];
      return newAnswers;
    });
    setShowResults((prev) => ({ ...prev, [lessonId]: false }));
    setScores((prev) => {
      const newScores = { ...prev };
      delete newScores[lessonId];
      return newScores;
    });
  };

  const toggleLesson = (lessonId) => {
    setExpandedLesson((prev) => (prev === lessonId ? null : lessonId));
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );

  return (
    <>
      {advancedLessons?.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div>
            <p>No Advanced Lessons Found....</p>
            <Link
              className="text-amber-600 text-center hover:text-amber-800"
              to={"/language/lessons"}
            >
              Back to Lessons
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <Link to={"/language/lessons"} className="fixed left-4 top-24 z-50">
            <ArrowLeftCircle className="text-amber-600 w-6 h-6" />
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-800 mb-2">
              <BookOpen className="inline mr-2" />
              Advanced Akan Lessons
            </h1>
            <p className="text-lg text-amber-600">
              Master conversational skills and complex expressions
            </p>
          </div>

          <div className="space-y-4">
            {advancedLessons?.map((lesson) => (
              <div
                key={lesson._id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <div
                  className="p-4 sm:p-6 cursor-pointer flex justify-between items-center hover:bg-amber-50 transition-colors"
                  onClick={() => toggleLesson(lesson._id)}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-full transition-colors ${
                        expandedLesson === lesson._id
                          ? "bg-amber-600 text-white"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {lesson.order === 1 ? (
                        <BookOpen size={20} />
                      ) : (
                        <Award size={20} />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {lesson.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                  {expandedLesson === lesson._id ? (
                    <ChevronUp className="text-amber-600" />
                  ) : (
                    <ChevronDown className="text-amber-600" />
                  )}
                </div>

                {expandedLesson === lesson._id && (
                  <div className="px-4 sm:px-6 pb-6 animate-fadeIn">
                    <div className="prose max-w-none">
                      {lesson?.content?.split("\n").map((paragraph, i) => (
                        <p key={i} className="mb-4 text-gray-700">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center">
                          <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                          Practice Exercises
                        </h3>
                        {showResults[lesson._id] && (
                          <button
                            onClick={() => clearAnswers(lesson._id)}
                            className="flex items-center text-sm text-amber-600 hover:text-amber-800"
                          >
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Clear Answers
                          </button>
                        )}
                      </div>

                      {lesson?.exercises?.map((exercise, exIndex) => (
                        <div
                          key={exIndex}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <p className="font-medium mb-3 text-gray-800">
                            {exercise.question}
                          </p>
                          <ul className="space-y-2">
                            {exercise.options.map((option, optIndex) => (
                              <li key={optIndex}>
                                <button
                                  onClick={() =>
                                    handleAnswerSelect(
                                      lesson._id,
                                      exIndex,
                                      optIndex
                                    )
                                  }
                                  disabled={showResults[lesson._id]}
                                  className={`w-full text-left p-3 rounded-md flex items-center transition-all ${
                                    selectedAnswers[lesson._id]?.[exIndex] ===
                                    optIndex
                                      ? "border-2 border-amber-500 bg-amber-50"
                                      : "border border-gray-200 hover:border-amber-300"
                                  } ${
                                    showResults[lesson._id] &&
                                    optIndex === exercise.correctAnswer
                                      ? "bg-green-50 border-green-500"
                                      : ""
                                  }`}
                                >
                                  <span
                                    className={`inline-flex items-center justify-center w-5 h-5 mr-3 rounded-full border transition-colors ${
                                      selectedAnswers[lesson._id]?.[exIndex] ===
                                      optIndex
                                        ? "border-amber-500 bg-amber-500 text-white"
                                        : "border-gray-300"
                                    } ${
                                      showResults[lesson._id] &&
                                      optIndex === exercise.correctAnswer
                                        ? "border-green-500 bg-green-500 text-white"
                                        : ""
                                    }`}
                                  >
                                    {String.fromCharCode(65 + optIndex)}
                                  </span>
                                  <span className="text-left">{option}</span>
                                  {showResults[lesson._id] && (
                                    <span className="ml-auto">
                                      {optIndex === exercise.correctAnswer ? (
                                        <Check className="text-green-500" />
                                      ) : selectedAnswers[lesson._id]?.[
                                          exIndex
                                        ] === optIndex ? (
                                        <X className="text-red-500" />
                                      ) : null}
                                    </span>
                                  )}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                        {showResults[lesson._id] ? (
                          <div className="px-4 py-3 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 w-full sm:w-auto">
                            <div className="flex items-center justify-between">
                              <span>Your score:</span>
                              <span className="font-bold ml-2">
                                {scores[lesson._id]}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                              <div
                                className="h-2.5 rounded-full bg-amber-600 transition-all duration-500"
                                style={{ width: `${scores[lesson._id]}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 w-full sm:w-auto">
                            Select all answers to check your score
                          </div>
                        )}
                        <div className="flex gap-2 w-full sm:w-auto">
                          {showResults[lesson._id] ? (
                            <button
                              onClick={() => clearAnswers(lesson._id)}
                              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                            >
                              <RotateCcw className="w-4 h-4 mr-2" />
                              Try Again
                            </button>
                          ) : (
                            <button
                              onClick={() => checkAnswers(lesson._id)}
                              disabled={
                                !selectedAnswers[lesson._id] ||
                                Object.keys(selectedAnswers[lesson._id])
                                  .length < lesson.exercises.length
                              }
                              className={`px-4 py-2 rounded-md text-white transition-colors flex-1 ${
                                !selectedAnswers[lesson._id] ||
                                Object.keys(selectedAnswers[lesson._id])
                                  .length < lesson.exercises.length
                                  ? "bg-gray-300 cursor-not-allowed"
                                  : "bg-amber-600 hover:bg-amber-700"
                              }`}
                            >
                              Check Answers
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <style jsx>{`
              .prose a {
                color: #d97706;
                text-decoration: underline;
              }
              .prose strong {
                color: #92400e;
              }
              .prose ul {
                list-style-type: disc;
                padding-left: 1.5rem;
                margin-bottom: 1rem;
              }
            `}</style>
          </div>
        </div>
      )}
    </>
  );
};

export default Advanced;
