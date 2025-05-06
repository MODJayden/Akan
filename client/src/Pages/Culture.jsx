import React, { useState } from "react";
import {
  BookOpen,
  History,
  Palette,
  Music,
  Users,
  Book,
  Map,
  Clock,
  Search,
  Upload,
  ChevronDown,
  ChevronRight,
  Play,
  Plus,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { Progress } from "@/components/ui/progress";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Culture = () => {
  const [activeTab, setActiveTab] = useState("traditions");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

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

  const cultureSections = [
    {
      id: "traditions",
      title: "Traditions & Customs",
      icon: <BookOpen className="h-5 w-5" />,
      content: [
        {
          title: "Naming Ceremonies",
          description:
            "The significance of Akan day names and naming traditions",
          image:
            "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
          type: "article",
        },
        {
          title: "Marriage Customs",
          description: "Traditional Akan wedding rituals and practices",
          image:
            "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80",
          type: "video",
        },
      ],
    },
    {
      id: "history",
      title: "History & Heritage",
      icon: <History className="h-5 w-5" />,
      content: [
        {
          title: "Akan Kingdoms",
          description: "The rise and organization of historic Akan states",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          type: "timeline",
        },
        {
          title: "Migration Patterns",
          description: "Historical movements of Akan people across West Africa",
          image:
            "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
          type: "map",
        },
      ],
    },
    {
      id: "arts",
      title: "Arts & Crafts",
      icon: <Palette className="h-5 w-5" />,
      content: [
        {
          title: "Kente Weaving",
          description: "The art and symbolism of traditional Kente cloth",
          image:
            "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
          type: "gallery",
        },
        {
          title: "Adinkra Symbols",
          description: "Meaning and use of traditional Akan symbols",
          image:
            "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          type: "article",
        },
      ],
    },
    {
      id: "music",
      title: "Music & Dance",
      icon: <Music className="h-5 w-5" />,
      content: [
        {
          title: "Traditional Instruments",
          description:
            "The talking drum, fontomfrom, and other Akan instruments",
          image:
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          type: "audio",
        },
        {
          title: "Festival Dances",
          description: "Ceremonial dances and their cultural significance",
          image:
            "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
          type: "video",
        },
      ],
    },
    {
      id: "social",
      title: "Social Customs & Etiquette",
      icon: <Users className="h-5 w-5" />,
      content: [
        {
          title: "Greeting Protocols",
          description: "Proper ways to greet elders and peers in Akan culture",
          image:
            "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
          type: "quiz",
        },
        {
          title: "Gift Giving",
          description:
            "Appropriate gifts for different occasions and relationships",
          image:
            "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          type: "article",
        },
      ],
    },
    {
      id: "folklore",
      title: "Folklore & Oral Traditions",
      icon: <Book className="h-5 w-5" />,
      content: [
        {
          title: "Ananse Stories",
          description: "The trickster spider and moral tales",
          image:
            "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          type: "audio",
        },
        {
          title: "Proverbs",
          description: "Wisdom sayings and their interpretations",
          image:
            "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          type: "article",
        },
      ],
    },
  ];

  const filteredContent =
    cultureSections
      .find((section) => section.id === activeTab)
      ?.content.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
       

      {/* Main Content */}
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        {/* Culture Sections Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto">
            {cultureSections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="py-3 flex flex-col items-center gap-2"
              >
                <span className="text-amber-600">{section.icon}</span>
                <span className="text-xs sm:text-sm">{section.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Search and Upload */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search in ${
                cultureSections.find((s) => s.id === activeTab)?.title
              }...`}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Sheet open={uploadOpen} onOpenChange={setUploadOpen}>
            {isAuthenticated ? (
              <SheetTrigger asChild>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <Upload className="h-4 w-4 mr-2" /> Share Your Content
                </Button>
              </SheetTrigger>
            ) : (
              <Button className="bg-amber-600  hover:bg-amber-700">
                <Link to="/login" className="flex justify-center items-center">
                  {" "}
                  <Upload className="h-4 w-4 mr-2" /> Share Your Content
                </Link>
              </Button>
            )}

            <SheetContent className="sm:max-w-md">
              <div className="p-4">
                <SheetHeader>
                  <SheetTitle>Share Akan Culture</SheetTitle>
                  <p className="text-sm text-muted-foreground">
                    Upload your photos, videos, or stories about Akan culture
                    (content will be reviewed before publishing)
                  </p>
                </SheetHeader>

                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Title</label>
                    <Input placeholder="Enter a title for your submission" />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                      placeholder="Tell us about your submission..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Media</label>
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-amber-100">
                        {item.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="text-amber-600 hover:text-amber-800"
                  >
                    Explore <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  {item.type === "video" || item.type === "audio" ? (
                    <Button variant="outline" size="icon">
                      <Play className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Elements Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Interactive Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Map Component */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Map className="h-6 w-6 text-amber-600" />
                  <CardTitle>Akan Cultural Map</CardTitle>
                </div>
                <CardDescription>
                  Explore the geographical distribution of Akan people and
                  cultural sites
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 bg-amber-50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  Interactive map would appear here
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Open Full Map
                </Button>
              </CardFooter>
            </Card>

            {/* Timeline Component */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-amber-600" />
                  <CardTitle>Historical Timeline</CardTitle>
                </div>
                <CardDescription>
                  Important events in Akan history from ancient times to present
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 bg-amber-50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  Interactive timeline would appear here
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore Timeline
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* User Contributions Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-900">
              Community Contributions
            </h2>
            <Button variant="ghost" className="text-amber-600">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="hover:shadow-md transition-shadow">
                <div className="relative h-32 overflow-hidden rounded-t-lg">
                  <img
                    src="https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="User contribution"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">
                    Traditional Wedding Photo
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Submitted by Kwame A.
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Culture;
