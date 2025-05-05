import React, { useState } from "react";
import {
  Check,
  ChevronRight,
  Trophy,
  Award,
  HelpCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Exercises = () => {
  const [currentExercise, setCurrentExercise] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const exerciseTypes = [
    {
      title: "Vocabulary Matching",
      description: "Match Twi words with their English translations",
      icon: <Check className="h-6 w-6" />,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Fill in the Blank",
      description: "Complete sentences with missing words",
      icon: <HelpCircle className="h-6 w-6" />,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Listening Comprehension",
      description: "Answer questions based on audio clips",
      icon: <Clock className="h-6 w-6" />,
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: "Sentence Construction",
      description: "Arrange words to form correct sentences",
      icon: <Award className="h-6 w-6" />,
      color: "text-amber-600 bg-amber-100",
    },
  ];

  const exercises = [
    {
      id: 1,
      type: "Vocabulary Matching",
      question: "Match the following words:",
      options: [
        { twi: "Nsuo", english: "Water" },
        { twi: "Edziban", english: "Food" },
        { twi: "Fie", english: "House" },
        { twi: "Aban", english: "Fortress" },
      ],
      correctAnswers: {
        Nsuo: "Water",
        Edziban: "Food",
        Fie: "House",
        Aban: "Fortress",
      },
    },
    {
      id: 2,
      type: "Fill in the Blank",
      question: "Complete the sentence: Me din de _____ (My name is _____)",
      options: ["John", "Kwame", "Ama", "Esi"],
      correctAnswer: "Kwame",
    },
    {
      id: 3,
      type: "Listening Comprehension",
      question: "What does the speaker want to buy?",
      audio: "",
      options: ["Food", "Water", "Clothes", "Book"],
      correctAnswer: "Food",
    },
  ];

  const handleAnswer = (exerciseId, answer) => {
    setAnswers((prev) => ({ ...prev, [exerciseId]: answer }));
  };

  const calculateScore = () => {
    if (!currentExercise) return 0;
    const exercise = exercises.find((ex) => ex.id === currentExercise);
    if (!exercise) return 0;

    if (exercise.type === "Vocabulary Matching") {
      // For matching exercises, we'd need more complex logic
      return 50; // Placeholder
    } else {
      return answers[currentExercise] === exercise.correctAnswer ? 100 : 0;
    }
  };

  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
          Practice Exercises
        </h1>
        <p className="text-xl text-amber-800 max-w-3xl mx-auto">
          Reinforce your learning with interactive quizzes and activities
        </p>
      </div>

      {currentExercise === null ? (
        <>
          {/* Exercise Types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {exerciseTypes.map((type, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 ${type.color}`}
                  >
                    {type.icon}
                  </div>
                  <CardTitle>{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => setCurrentExercise(index + 1)}
                  >
                    Start Practice <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Progress */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>
                Track your improvement across exercise types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Vocabulary", value: 65 },
                  { name: "Grammar", value: 40 },
                  { name: "Listening", value: 80 },
                  { name: "Speaking", value: 30 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.value}%
                      </span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Recent Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { type: "Vocabulary", score: 80, date: "Today" },
              { type: "Listening", score: 65, date: "Yesterday" },
              { type: "Grammar", score: 90, date: "2 days ago" },
            ].map((activity, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardDescription>{activity.type} Exercise</CardDescription>
                  <CardTitle className="text-3xl">{activity.score}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Completed {activity.date}
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={activity.score} className="h-2" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Exercise Content */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardDescription>
                    {exercises[currentExercise - 1]?.type} Exercise
                  </CardDescription>
                  <CardTitle className="text-2xl">
                    {exercises[currentExercise - 1]?.question}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCurrentExercise(null);
                    setShowResults(false);
                  }}
                >
                  Back to Exercises
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {exercises[currentExercise - 1]?.type ===
                "Vocabulary Matching" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exercises[currentExercise - 1]?.options.map(
                    (option, idx) => (
                      <div
                        key={idx}
                        className="border rounded-lg p-4 hover:bg-amber-50 transition-colors"
                      >
                        <div className="font-medium mb-2">{option.twi}</div>
                        <select
                          className="w-full p-2 border rounded"
                          onChange={(e) =>
                            handleAnswer(currentExercise, e.target.value)
                          }
                        >
                          <option value="">Select match</option>
                          {exercises[currentExercise - 1]?.options.map(
                            (opt, i) => (
                              <option key={i} value={opt.english}>
                                {opt.english}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    )
                  )}
                </div>
              )}

              {(exercises[currentExercise - 1]?.type === "Fill in the Blank" ||
                exercises[currentExercise - 1]?.type ===
                  "Listening Comprehension") && (
                <div className="space-y-4">
                  {exercises[currentExercise - 1]?.options.map(
                    (option, idx) => (
                      <Button
                        key={idx}
                        variant={
                          answers[currentExercise] === option
                            ? "default"
                            : "outline"
                        }
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => handleAnswer(currentExercise, option)}
                      >
                        {option}
                      </Button>
                    )
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Exercise {currentExercise} of {exercises.length}
              </div>
              <Button
                onClick={() => setShowResults(true)}
                disabled={!answers[currentExercise]}
              >
                Check Answer
              </Button>
            </CardFooter>
          </Card>

          {/* Results */}
          {showResults && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-green-600" />
                  {calculateScore() === 100 ? "Excellent!" : "Good Try!"}
                </CardTitle>
                <CardDescription>
                  {calculateScore() === 100
                    ? "You got it right! Keep up the good work."
                    : "Review the material and try again."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {calculateScore()}%
                    </div>
                    <Progress
                      value={calculateScore()}
                      className="h-2 bg-green-200"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {calculateScore() === 100
                      ? "Perfect score!"
                      : "The correct answer is: " +
                        exercises[currentExercise - 1]?.correctAnswer}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, [currentExercise]: "" }));
                    setShowResults(false);
                  }}
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => {
                    setCurrentExercise((prev) =>
                      prev === exercises.length ? null : (prev || 0) + 1
                    );
                    setShowResults(false);
                  }}
                >
                  Next Exercise
                </Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default Exercises;
