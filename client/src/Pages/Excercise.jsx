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
import { Link } from "react-router-dom";

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
      nav: "/akan/exercise/vocab",
    },
    {
      title: "Fill in the Blank",
      description: "Complete sentences with missing words",
      icon: <HelpCircle className="h-6 w-6" />,
      color: "text-blue-600 bg-blue-100",
      nav: "/akan/exercise/fillin",
    },
    {
      title: "Sentence Construction",
      description: "Arrange words to form correct sentences",
      icon: <Award className="h-6 w-6" />,
      color: "text-amber-600 bg-amber-100",
      nav: "/akan/exercise/sentence",
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

      {/* Exercise Types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ">
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
              <Link to={type.nav} className="w-full">
                <Button className="w-full" variant="outline">
                  Start Practice <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
