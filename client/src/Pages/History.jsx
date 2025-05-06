import React, { useState } from "react";
import {
  BookOpen,
  Archive,
  Download,
  Search,
  Calendar,
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
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Mock historical documents
  const documents = [
    {
      id: 1,
      title: "Akan Migration Patterns (18th Century)",
      description:
        "Primary source documents tracking Akan migration across West Africa",
      level: "Advanced",
      type: "Archival Documents",
      date: "1750-1800",
      pages: 42,
      format: "PDF",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Oral Traditions of the Ashanti Kingdom",
      description: "Collected oral histories from Ashanti elders",
      level: "Intermediate",
      type: "Transcribed Interviews",
      date: "1920-1935",
      pages: 28,
      format: "PDF",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    },
    {
      id: 3,
      title: "Introduction to Akan History",
      description: "Beginner's guide to major events in Akan history",
      level: "Beginner",
      type: "Educational Material",
      date: "2020",
      pages: 15,
      format: "PDF",
      image:
        "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
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
    

      {/* Main Content */}
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search historical documents..."
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
                    Time Period
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">All Periods</option>
                    <option value="pre-colonial">Pre-Colonial</option>
                    <option value="colonial">Colonial Era</option>
                    <option value="post-colonial">Post-Colonial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Document Type
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">All Types</option>
                    <option value="archival">Archival Documents</option>
                    <option value="oral">Oral Histories</option>
                    <option value="scholarly">Scholarly Works</option>
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
                  <Upload className="h-4 w-4 mr-2" /> Contribute Document
                </Link>
              </Button>
            )}
            <SheetContent className="sm:max-w-md">
              <div className="p-8 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Contribute Historical Document</SheetTitle>
                  <p className="text-sm text-muted-foreground">
                    Upload documents for review by our historical team
                  </p>
                </SheetHeader>

                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Document Title
                    </label>
                    <Input placeholder="Enter document title" />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                      placeholder="Describe the document's content and significance..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Time Period
                    </label>
                    <Input placeholder="Example: 18th century" />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Document Type
                    </label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">Select type</option>
                      <option value="archival">Archival Document</option>
                      <option value="oral">Oral History</option>
                      <option value="photo">Photograph</option>
                      <option value="other">Other</option>
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-amber-600">
                            PDF, JPG, DOCX up to 10MB
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
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card
              key={doc.id}
              className="hover:shadow-lg transition-shadow h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={doc.image}
                  alt={doc.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">{doc.level}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{doc.title}</CardTitle>
                <CardDescription>{doc.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Archive className="h-3 w-3" /> {doc.type}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {doc.date}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {doc.pages} pages • {doc.format}
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

        {/* Discussion Forum Preview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Research Discussions
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
                Join the Historical Research Forum
              </CardTitle>
              <CardDescription>
                Connect with other researchers and discuss historical findings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Interpretation of 18th Century Migration Records",
                    author: "Dr. Kwame Asante",
                    date: "2 days ago",
                    replies: 5,
                  },
                  {
                    title:
                      "Seeking primary sources on Ashanti-British relations",
                    author: "Sarah Mensah",
                    date: "1 week ago",
                    replies: 3,
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

export default History;
