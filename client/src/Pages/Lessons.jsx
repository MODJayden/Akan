import React from "react";
import {
  BookOpen,
  Headphones,
  Download,
  Award,
  Users,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Lessons = () => {
  const levels = [
    {
      title: "Beginner",
      description: "Start with basic greetings and essential vocabulary",
      progress: 35,
      lessons: 12,
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: "Intermediate",
      description: "Build sentences and understand grammar structures",
      progress: 15,
      lessons: 8,
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Advanced",
      description: "Master conversational skills and complex expressions",
      progress: 5,
      lessons: 5,
      icon: <Award className="h-6 w-6" />,
    },
  ];

  const featuredLessons = [
    {
      title: "Greetings & Introductions",
      description: "Learn how to greet people and introduce yourself",
      duration: "15 min",
      completed: true,
    },
    {
      title: "Family Members",
      description: "Names for family relationships in Akan",
      duration: "20 min",
      completed: true,
    },
    {
      title: "Numbers 1-100",
      description: "Counting and using numbers in daily life",
      duration: "25 min",
      completed: false,
    },
    {
      title: "Daily Activities",
      description: "Vocabulary for common daily routines",
      duration: "30 min",
      completed: false,
    },
  ];

  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
          Akan Language Lessons
        </h1>
        <p className="text-xl text-amber-800 max-w-3xl mx-auto">
          Structured lessons from beginner to advanced levels with cultural
          context
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {levels.map((level, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                {level.icon}
              </div>
              <div>
                <CardTitle>{level.title}</CardTitle>
                <CardDescription>{level.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{level.progress}%</span>
              </div>
              <Progress value={level.progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {level.lessons} lessons available
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                View Lessons <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-amber-900 mb-6">
          Continue Learning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredLessons.map((lesson, index) => (
            <Card
              key={index}
              className={`hover:shadow-md transition-shadow ${
                lesson.completed ? "border-green-100" : ""
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {lesson.completed && (
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      )}
                      {lesson.title}
                    </CardTitle>
                    <CardDescription>{lesson.description}</CardDescription>
                  </div>
                  <span className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" /> {lesson.duration}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  variant={lesson.completed ? "outline" : "default"}
                >
                  {lesson.completed ? "Review Lesson" : "Start Lesson"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Downloadable Resources */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-amber-900 mb-6">
          Downloadable Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Twi Phrasebook", type: "PDF" },
            { title: "Akan Alphabet Chart", type: "PDF" },
            { title: "Vocabulary Flashcards", type: "Printable" },
            { title: "Grammar Guide", type: "E-book" },
          ].map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.type}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Cultural Snippets */}
      <div className="bg-amber-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          Cultural Insight
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">
              The Meaning Behind Greetings
            </h3>
            <p className="text-gray-700 mb-4">
              In Akan culture, greetings are more than just words - they convey
              respect, show concern for well-being, and establish social
              connections. The common greeting "Ɛte sɛn?" (How is it?) is
              typically followed by responses about one's health and family.
            </p>
            <Button variant="link" className="text-amber-600 p-0">
              Learn more about Akan greetings
            </Button>
          </div>
          <div className="md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
              alt="Akan cultural greeting"
              className="rounded-lg object-cover w-full h-full max-h-48"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
