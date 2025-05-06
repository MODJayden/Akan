import React, { useState } from "react";
import {
  BookOpen,
  Film,
  Music,
  Download,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Upload,
  Clock,
  Bookmark,
  Image,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Studies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeModule, setActiveModule] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Mock cultural modules
  const modules = [
    {
      id: "naming",
      title: "Naming Ceremonies",
      description: "Explore the significance of Akan day names and rituals",
      level: "Intermediate",
      type: "Interactive Module",
      media: ["video", "quiz"],
      image:
        "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "festivals",
      title: "Festivals of the Akan",
      description:
        "Interactive guide to major Akan festivals throughout the year",
      level: "Beginner",
      type: "Multimedia Module",
      media: ["video", "audio", "image"],
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "adinkra",
      title: "Adinkra Symbols",
      description: "In-depth exploration of Adinkra symbolism and meanings",
      level: "Advanced",
      type: "Academic Module",
      media: ["text", "image", "quiz"],
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    },
  ];

  // Mock research papers
  const papers = [
    {
      id: 1,
      title: "Kente Weaving: Cultural Significance",
      description: "Analysis of Kente cloth patterns and their meanings",
      author: "Dr. Kwame Asante",
      year: 2018,
      pages: 24,
      format: "PDF",
      image:
        "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Akan Proverbs and Wisdom",
      description: "Linguistic and cultural analysis of Akan proverbs",
      author: "Prof. Ama Serwaa",
      year: 2020,
      pages: 32,
      format: "PDF",
      image:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    },
  ];

  // Mock upload simulation
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
    

      {/* Main Content */}
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cultural studies..."
              className="pl-9 pr-10 text-base h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cultural Area
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">All Areas</option>
                    <option value="traditions">Traditions</option>
                    <option value="arts">Arts</option>
                    <option value="social">Social Structures</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Media Type
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">All Types</option>
                    <option value="text">Text</option>
                    <option value="video">Video</option>
                    <option value="interactive">Interactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Difficulty Level
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </Card>
          )}

          {/* Upload Button */}
          <Sheet>
            {isAuthenticated ? (
              <SheetTrigger asChild>
                <Button className="bg-amber-600 hover:bg-amber-700 mb-6">
                  <Upload className="h-4 w-4 mr-2" /> Contribute Document
                </Button>
              </SheetTrigger>
            ) : (
              <Button className="bg-amber-600 hover:bg-amber-700 mb-6">
                <Link to="/login" className="flex justify-center items-center">
                  {" "}
                  <Upload className="h-4 w-4 mr-2" /> Contribute Study
                </Link>
              </Button>
            )}
            <SheetContent className="sm:max-w-md">
            <div className="p-8 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Contribute Cultural Research</SheetTitle>
                <p className="text-sm text-muted-foreground">
                  Share your cultural studies for review by our team
                </p>
              </SheetHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Study Title
                  </label>
                  <Input placeholder="Enter study title" />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                    placeholder="Describe your cultural study..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Cultural Focus
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Select focus area</option>
                    <option value="traditions">Traditions & Rituals</option>
                    <option value="arts">Arts & Crafts</option>
                    <option value="social">Social Structures</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Upload Files
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100 border-amber-300">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 text-amber-500 mb-2" />
                        <p className="text-sm text-amber-700">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-amber-600">
                          PDF, DOCX, JPG, MP4 up to 25MB
                        </p>
                      </div>
                      <input type="file" className="hidden" multiple />
                    </label>
                  </div>
                </div>

                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground text-center">
                      {uploadProgress}% uploaded
                    </p>
                  </div>
                )}
              </div>

              <SheetFooter>
                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  onClick={simulateUpload}
                >
                  Submit for Review
                </Button>
              </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Interactive Modules */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Interactive Cultural Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Card
                key={module.id}
                className={`hover:shadow-lg transition-shadow cursor-pointer ${
                  activeModule === module.id
                    ? "border-amber-300 bg-amber-50"
                    : ""
                }`}
                onClick={() =>
                  setActiveModule(module.id === activeModule ? null : module.id)
                }
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">{module.level}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {module.media.map((mediaType, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="capitalize"
                      >
                        {mediaType === "video" && (
                          <Film className="h-3 w-3 mr-1" />
                        )}
                        {mediaType === "audio" && (
                          <Music className="h-3 w-3 mr-1" />
                        )}
                        {mediaType === "image" && (
                          <Image className="h-3 w-3 mr-1" />
                        )}
                        {mediaType === "quiz" && (
                          <BookOpen className="h-3 w-3 mr-1" />
                        )}
                        {mediaType === "text" && (
                          <BookOpen className="h-3 w-3 mr-1" />
                        )}
                        {mediaType}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                {activeModule === module.id && (
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      <Bookmark className="h-4 w-4 mr-2" /> Save
                    </Button>
                    <Button>
                      Explore Module <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Research Papers */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-900">
              Research Papers
            </h2>
            <Button variant="ghost" className="text-amber-600">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {papers.map((paper) => (
              <Card
                key={paper.id}
                className="hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={paper.image}
                    alt={paper.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle>{paper.title}</CardTitle>
                  <CardDescription>{paper.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>By {paper.author}</span>
                    <span>
                      {paper.year} • {paper.pages} pages
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Bookmark className="h-4 w-4 mr-2" /> Save
                  </Button>
                  <Button>
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Discussion Forum Preview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Cultural Studies Forum
          </h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-amber-600"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Join the Cultural Studies Discussion
              </CardTitle>
              <CardDescription>
                Connect with researchers and cultural practitioners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title:
                      "Interpretation of Adinkra symbols in contemporary art",
                    author: "Nana Yaa",
                    date: "5 days ago",
                    replies: 4,
                  },
                  {
                    title:
                      "Documenting Akan naming ceremonies in diaspora communities",
                    author: "Kofi Mensah",
                    date: "2 weeks ago",
                    replies: 8,
                  },
                ].map((thread, index) => (
                  <div
                    key={index}
                    className="border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <h3 className="font-medium hover:text-amber-600 cursor-pointer">
                      {thread.title}
                    </h3>
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>
                        By {thread.author} • {thread.date}
                      </span>
                      <span>{thread.replies} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Discussions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Studies;
