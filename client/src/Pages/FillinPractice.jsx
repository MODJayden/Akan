import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFillIns } from "@/store/Fillin";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  RotateCcw,
  ArrowLeftCircle,
  Award,
  Edit,
} from "lucide-react";
import { Link } from "react-router-dom";

const FillinPractice = () => {
  const { fillins, isLoading } = useSelector((state) => state.fillIn);
  const dispatch = useDispatch();
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    dispatch(getFillIns());
  }, [dispatch]);

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const filteredFillins =
    selectedLevel === "All"
      ? fillins
      : fillins.filter((f) => f.level === selectedLevel);

  const currentFillins = filteredFillins[currentSet]?.sentenceTemplates || [];
  const totalSets = filteredFillins.length;

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const checkAnswers = () => {
    let correct = 0;
    currentFillins.forEach((question) => {
      if (selectedAnswers[question._id] === question.correctAnswer) {
        correct++;
      }
    });
    const newScore = Math.round((correct / currentFillins.length) * 100);
    setScore(newScore);
    setShowResults(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const resetPractice = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const nextSet = () => {
    if (currentSet < totalSets - 1) {
      resetPractice();
      setCurrentSet((prev) => prev + 1);
    }
  };

  const prevSet = () => {
    if (currentSet > 0) {
      resetPractice();
      setCurrentSet((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <Link
            to="/akan/language/exercises"
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
          >
            <ArrowLeftCircle className="text-amber-600 w-8 h-8 hover:text-amber-700 transition-colors" />
          </Link>
          <h1 className="text-3xl font-bold text-amber-800 mb-2 flex items-center justify-center">
            <Edit className="mr-3" />
            Fill-in-the-Blank Practice
          </h1>
          <p className="text-lg text-amber-600">
            Complete the sentences with the correct words
          </p>
        </div>

        {/* Level Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => {
                  setSelectedLevel(level);
                  setCurrentSet(0);
                  resetPractice();
                }}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedLevel === level
                    ? "bg-amber-600 text-white"
                    : "bg-white text-amber-700 hover:bg-amber-50"
                } ${level === "All" ? "rounded-l-lg" : ""} ${
                  level === levels[levels.length - 1] ? "rounded-r-lg" : ""
                } border border-amber-200 transition-colors`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        {totalSets > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-amber-700">
                Set {currentSet + 1} of {totalSets}
              </span>
              <span className="text-xs text-amber-600">
                {filteredFillins[currentSet]?.level}
              </span>
            </div>
            <div className="w-full bg-amber-100 rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentSet + 1) / totalSets) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Fill-in Practice Area */}
        {filteredFillins.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-700">
              No fill-in exercises available for this level
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Set Info */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-amber-800 flex items-center">
                  <Award className="mr-2 text-amber-600" />
                  {filteredFillins[currentSet]?.level} Fill-in Exercises
                </h2>
                {showResults && (
                  <button
                    onClick={resetPractice}
                    className="flex items-center text-sm text-amber-600 hover:text-amber-800 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </button>
                )}
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {currentFillins.map((question) => (
                  <div
                    key={question._id}
                    className="p-4 rounded-lg border transition-all duration-200"
                    style={{
                      borderColor: showResults
                        ? question.correctAnswer ===
                          selectedAnswers[question._id]
                          ? "#10B981"
                          : "#FECACA"
                        : "#E5E7EB",
                      backgroundColor: showResults
                        ? question.correctAnswer ===
                          selectedAnswers[question._id]
                          ? "#ECFDF5"
                          : "#FEF2F2"
                        : "#F9FAFB",
                    }}
                  >
                    <p className="font-medium text-gray-800 mb-3">
                      {question.question.replace("_____", "__________")}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {question.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            !showResults &&
                            handleAnswerSelect(question._id, index)
                          }
                          disabled={showResults}
                          className={`p-3 rounded-md text-left transition-all flex items-center ${
                            selectedAnswers[question._id] === index
                              ? "border-2 border-amber-500 bg-amber-50"
                              : "border border-gray-200 hover:border-amber-300"
                          } ${
                            showResults && index === question.correctAnswer
                              ? "border-green-500 bg-green-50"
                              : ""
                          }`}
                        >
                          <span
                            className={`inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full border ${
                              selectedAnswers[question._id] === index
                                ? "border-amber-500 bg-amber-500 text-white"
                                : "border-gray-300"
                            } ${
                              showResults && index === question.correctAnswer
                                ? "border-green-500 bg-green-500 text-white"
                                : ""
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1">{option}</span>
                          {showResults && (
                            <span className="ml-2">
                              {index === question.correctAnswer ? (
                                <Check className="text-green-500" />
                              ) : selectedAnswers[question._id] === index ? (
                                <X className="text-red-500" />
                              ) : null}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Results or Check Button */}
              {showResults ? (
                <div
                  className={`mt-6 p-4 rounded-lg border border-amber-200 bg-amber-50 transition-all duration-500 ${
                    isAnimating ? "animate-pulse" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-lg font-bold text-amber-800">
                        Your Score
                      </h3>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                          <div
                            className="h-2 rounded-full bg-amber-600"
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="text-xl font-bold text-amber-700">
                          {score}%
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={resetPractice}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Try Again
                      </button>
                      <button
                        onClick={nextSet}
                        disabled={currentSet >= totalSets - 1}
                        className={`px-4 py-2 rounded-md text-white transition-colors flex items-center ${
                          currentSet >= totalSets - 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-amber-600 hover:bg-amber-700"
                        }`}
                      >
                        Next Set
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={prevSet}
                    disabled={currentSet <= 0}
                    className={`px-4 py-2 rounded-md flex items-center ${
                      currentSet <= 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-amber-600 hover:bg-amber-50"
                    }`}
                  >
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Previous
                  </button>
                  <button
                    onClick={checkAnswers}
                    disabled={
                      Object.keys(selectedAnswers).length <
                      currentFillins.length
                    }
                    className={`px-6 py-3 rounded-md text-white font-medium transition-colors ${
                      Object.keys(selectedAnswers).length <
                      currentFillins.length
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-amber-600 hover:bg-amber-700"
                    }`}
                  >
                    Check Answers
                  </button>
                  <button
                    onClick={nextSet}
                    disabled={currentSet >= totalSets - 1}
                    className={`px-4 py-2 rounded-md flex items-center ${
                      currentSet >= totalSets - 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-amber-600 hover:bg-amber-50"
                    }`}
                  >
                    Next
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FillinPractice;
