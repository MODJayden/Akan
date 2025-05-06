import React, { useState } from "react";
import {
  Languages,
  BarChart2,
  BookOpen,
  Download,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Upload,
  Clock,
  Bookmark,
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

const Linguistics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTool, setActiveTool] = useState("frequency");

  // Mock linguistic resources
  const resources = [
    {
      id: 1,
      title: "Twi Phonology Analysis",
      description: "Detailed examination of Twi sound systems and patterns",
      level: "Advanced",
      type: "Research Paper",
      author: "Dr. Abena Owusu",
      format: "PDF",
      image:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    },
    {
      id: 2,
      title: "Comparative Grammar: Twi and English",
      description: "Side-by-side analysis of grammatical structures",
      level: "Intermediate",
      type: "Educational Material",
      author: "Linguistics Department",
      format: "PDF",
      image:
        "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "Akan Language Family Overview",
      description: "Introduction to the Akan language group and its dialects",
      level: "Beginner",
      type: "Guide",
      author: "Akan Language Institute",
      format: "PDF",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
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
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-center">
        <div className="max-w-7xl mx-auto text-center bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Linguistic Analysis
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 max-w-3xl mx-auto">
            Tools and resources for studying Akan language structures
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search linguistic resources..."
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
                    Linguistic Area
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">All Areas</option>
                    <option value="phonology">Phonology</option>
                    <option value="syntax">Syntax</option>
                    <option value="morphology">Morphology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Dialect
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">All Dialects</option>
                    <option value="twi">Twi</option>
                    <option value="fante">Fante</option>
                    <option value="other">Other</option>
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
            <SheetTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700 mb-6">
                <Upload className="h-4 w-4 mr-2" /> Contribute Research
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Contribute Linguistic Research</SheetTitle>
                <p className="text-sm text-muted-foreground">
                  Upload your linguistic analysis for review by our team
                </p>
              </SheetHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Research Title
                  </label>
                  <Input placeholder="Enter research title" />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Abstract</label>
                  <textarea
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                    placeholder="Provide an abstract of your research..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Linguistic Focus
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Select focus area</option>
                    <option value="phonology">Phonology</option>
                    <option value="syntax">Syntax</option>
                    <option value="morphology">Morphology</option>
                    <option value="semantics">Semantics</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Upload File
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
                          PDF, DOCX up to 10MB
                        </p>
                      </div>
                      <input type="file" className="hidden" />
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
            </SheetContent>
          </Sheet>
        </div>

        {/* Analysis Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Analysis Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className={`hover:shadow-md transition-shadow cursor-pointer ${
                activeTool === "frequency" ? "border-amber-300 bg-amber-50" : ""
              }`}
              onClick={() => setActiveTool("frequency")}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart2 className="h-6 w-6 text-amber-600" />
                  <CardTitle>Word Frequency</CardTitle>
                </div>
                <CardDescription>
                  Analyze word usage patterns in Akan texts
                </CardDescription>
              </CardHeader>
              <CardContent className="h-32 bg-amber-50/50 rounded-lg flex items-center justify-center">
                {activeTool === "frequency" ? (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Enter text to analyze:
                    </p>
                    <Input
                      placeholder="Paste Akan text here"
                      className="w-full"
                    />
                  </div>
                ) : (
                  <p className="text-muted-foreground">Tool preview</p>
                )}
              </CardContent>
            </Card>

            <Card
              className={`hover:shadow-md transition-shadow cursor-pointer ${
                activeTool === "compare" ? "border-amber-300 bg-amber-50" : ""
              }`}
              onClick={() => setActiveTool("compare")}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Languages className="h-6 w-6 text-amber-600" />
                  <CardTitle>Dialect Comparison</CardTitle>
                </div>
                <CardDescription>
                  Compare words and phrases across Akan dialects
                </CardDescription>
              </CardHeader>
              <CardContent className="h-32 bg-amber-50/50 rounded-lg flex items-center justify-center">
                {activeTool === "compare" ? (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Coming Soon
                    </p>
                    <Button variant="outline" disabled>
                      Under Development
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Tool preview</p>
                )}
              </CardContent>
            </Card>

            <Card
              className={`hover:shadow-md transition-shadow cursor-pointer ${
                activeTool === "grammar" ? "border-amber-300 bg-amber-50" : ""
              }`}
              onClick={() => setActiveTool("grammar")}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                  <CardTitle>Grammar Explorer</CardTitle>
                </div>
                <CardDescription>
                  Interactive Akan grammar reference tool
                </CardDescription>
              </CardHeader>
              <CardContent className="h-32 bg-amber-50/50 rounded-lg flex items-center justify-center">
                {activeTool === "grammar" ? (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Coming Soon
                    </p>
                    <Button variant="outline" disabled>
                      Under Development
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Tool preview</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card
              key={resource.id}
              className="hover:shadow-lg transition-shadow h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">{resource.level}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-sm text-muted-foreground mb-2">
                  By {resource.author}
                </div>
                <Badge variant="outline">{resource.type}</Badge>
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

        {/* Discussion Forum Preview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Linguistics Forum
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
                Join the Linguistics Discussion
              </CardTitle>
              <CardDescription>
                Connect with linguists and language researchers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Twi Tone Patterns Analysis",
                    author: "Prof. Ama Serwaa",
                    date: "3 days ago",
                    replies: 7,
                  },
                  {
                    title: "Seeking corpus data for Fante morphology study",
                    author: "David Osei",
                    date: "1 week ago",
                    replies: 2,
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

export default Linguistics;
