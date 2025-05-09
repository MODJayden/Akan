import React from "react";
import {
  BookOpen,
  Headphones,
  Download,
  Award,
  Users,
  Clock,
  ChevronRight,
  Star,
  StarIcon,
} from "lucide-react";
const greetbg = "/Akan-Greetings.jpg";
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
import { Link } from "react-router-dom";
import { getResources } from "@/store/Resources";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Lessons = () => {
  const { isLoading, error, resources } = useSelector(
    (state) => state.resource
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResources());
  }, [dispatch]);

  const levels = [
    {
      title: "Beginner",
      description: "Start with basic greetings and essential vocabulary",
      lessons: 12,
      icon: <BookOpen className="h-6 w-6" />,
      nav: "/lesson/begginers",
    },
    {
      title: "Intermediate",
      description: "Build sentences and understand grammar structures",
      progress: 15,
      lessons: 8,
      icon: <Users className="h-6 w-6" />,
      nav: "/lesson/intermediate",
    },
    {
      title: "Advanced",
      description: "Master conversational skills and complex expressions",
      progress: 5,
      lessons: 5,
      icon: <Award className="h-6 w-6" />,
      nav: "/lesson/advanced",
    },
  ];
  const handleDownload = (content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resource.txt";
    link.click();
  };

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
              <span className="flex items-center text-sm text-muted-foreground justify-center">
                {" "}
                <StarIcon className="h-4 w-4 mr-1 text-yellow-300" />
                <StarIcon className="h-4 w-4 mr-1 text-yellow-300" />
                <StarIcon className="h-4 w-4 mr-1 text-yellow-300" />
                <StarIcon className="h-4 w-4 mr-1 text-yellow-300" />
                <StarIcon className="h-4 w-4 mr-1 text-yellow-300" />
              </span>
            </CardContent>
            <CardFooter>
              <Link className="w-full" to={level.nav}>
                <Button className="w-full" variant="outline">
                  View Lessons <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Downloadable Resources */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-amber-900 mb-6">
          Downloadable Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources?.map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.type}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleDownload(resource.content)}
                >
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
            <Link to={"/lesson/intermediate"}>
              <Button variant="link" className="text-amber-600 p-0">
                Learn more about Akan greetings
              </Button>
            </Link>
          </div>
          <div className="md:w-1/3">
            <img
              src={greetbg}
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
