import React, { useState } from "react";
import {
  MessageSquare,
  Calendar,
  User,
  Share2,
  ChevronDown,
  ChevronRight,
  Plus,
  Bookmark,
  Heart,
  MoreHorizontal,
  Search,
  Filter,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSelector } from "react-redux";

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // Mock community data
  const discussions = [
    {
      id: 1,
      title: "Best resources for learning Twi pronunciation?",
      author: {
        name: "Kwame Asante",
        avatar: "/images/avatar1.jpg",
        role: "Language Learner",
        joinDate: "Joined 3 months ago",
      },
      date: "2 hours ago",
      replies: 5,
      likes: 12,
      tags: ["language", "pronunciation"],
      content:
        "I've been trying to improve my Twi pronunciation and was wondering what resources others have found helpful. Any recommendations for apps, videos, or tutors?",
    },
    {
      id: 2,
      title: "Upcoming Akan cultural festivals in the US",
      author: {
        name: "Ama Serwaa",
        avatar: "/images/avatar2.jpg",
        role: "Cultural Organizer",
        joinDate: "Joined 1 year ago",
      },
      date: "1 day ago",
      replies: 8,
      likes: 24,
      tags: ["events", "culture"],
      content:
        "Here's a list of upcoming Akan cultural events happening across the US this summer. Let me know if you're organizing any others!",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Twi Language Workshop (Online)",
      date: "2023-11-15",
      time: "6:00 PM GMT",
      location: "Virtual (Zoom)",
      organizer: "Akan Language Institute",
      attendees: 24,
      tags: ["language", "workshop"],
      description:
        "Join us for an interactive Twi language workshop suitable for beginners. Learn basic greetings and common phrases.",
    },
    {
      id: 2,
      title: "Kente Weaving Demonstration",
      date: "2023-11-22",
      time: "2:00 PM GMT",
      location: "Ghana Cultural Center, NYC",
      organizer: "Ghana Cultural Center",
      attendees: 15,
      tags: ["art", "demonstration"],
      description:
        "Master weaver Kwabena Osei will demonstrate traditional Kente weaving techniques and explain the symbolism of various patterns.",
    },
  ];

  const popularMembers = [
    {
      id: 1,
      name: "Kwame Asante",
      avatar: "/images/avatar1.jpg",
      role: "Language Enthusiast",
      contributions: 42,
    },
    {
      id: 2,
      name: "Ama Serwaa",
      avatar: "/images/avatar2.jpg",
      role: "Cultural Educator",
      contributions: 76,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}

      {/* Main Content */}
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search community..."
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

              {showFilters && (
                <Card className="p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Content Type
                      </label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="">All Types</option>
                        <option value="discussion">Discussions</option>
                        <option value="event">Events</option>
                        <option value="question">Questions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Topic
                      </label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="">All Topics</option>
                        <option value="language">Language Learning</option>
                        <option value="culture">Cultural Practices</option>
                        <option value="history">History</option>
                      </select>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Community Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-8"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="discussions">
                  <MessageSquare className="h-4 w-4 mr-2" /> Discussions
                </TabsTrigger>
                <TabsTrigger value="events">
                  <Calendar className="h-4 w-4 mr-2" /> Events
                </TabsTrigger>
              </TabsList>

              {/* Discussions Tab */}
              <TabsContent value="discussions" className="space-y-6">
                {/* New Post Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full mb-6 bg-amber-600 hover:bg-amber-700">
                      <Plus className="h-4 w-4 mr-2" /> Start New Discussion
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="sm:max-w-2xl">
                    <div className="p-8 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Create New Discussion</SheetTitle>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Title
                          </label>
                          <Input placeholder="What's your discussion about?" />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Content
                          </label>
                          <textarea
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
                            placeholder="Write your discussion content here..."
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Tags
                          </label>
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant="outline"
                              className="cursor-pointer hover:bg-amber-100"
                            >
                              language
                            </Badge>
                            <Badge
                              variant="outline"
                              className="cursor-pointer hover:bg-amber-100"
                            >
                              culture
                            </Badge>
                            <Badge
                              variant="outline"
                              className="cursor-pointer hover:bg-amber-100"
                            >
                              history
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-amber-600"
                            >
                              + Add Tag
                            </Button>
                          </div>
                        </div>
                      </div>
                      <SheetFooter>
                        <Button className="w-full bg-amber-600 hover:bg-amber-700">
                          Post Discussion
                        </Button>
                      </SheetFooter>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Discussion List */}
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <Card
                      key={discussion.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={discussion.author.avatar} />
                              <AvatarFallback>
                                {discussion.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle>{discussion.title}</CardTitle>
                              <CardDescription className="flex items-center gap-2">
                                <span>By {discussion.author.name}</span>
                                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                                  {discussion.author.role}
                                </span>
                                <span>• {discussion.date}</span>
                              </CardDescription>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3">{discussion.content}</p>
                        <div className="flex flex-wrap gap-2">
                          {discussion.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-amber-600"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />{" "}
                            {discussion.replies} replies
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                          >
                            <Heart className="h-4 w-4 mr-2" />{" "}
                            {discussion.likes} likes
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          Join Discussion
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-6">
                {/* Events Calendar */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Events Calendar</span>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" /> Add Event
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-md">
                          <div className="p-8 overflow-y-auto">
                            <SheetHeader>
                              <SheetTitle>Add New Event</SheetTitle>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                  Event Title
                                </label>
                                <Input placeholder="Event name" />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                  Date & Time
                                </label>
                                <Input type="datetime-local" />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                  Location
                                </label>
                                <Input placeholder="Physical or virtual location" />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                  Description
                                </label>
                                <textarea
                                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                  placeholder="Describe your event..."
                                />
                              </div>
                            </div>
                            <SheetFooter>
                              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                                Submit Event
                              </Button>
                            </SheetFooter>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-7 bg-amber-50 text-amber-900 font-medium text-sm">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <div key={day} className="p-2 text-center">
                              {day}
                            </div>
                          )
                        )}
                      </div>
                      <div className="grid grid-cols-7">
                        {Array.from({ length: 35 }).map((_, index) => (
                          <div
                            key={index}
                            className={`h-16 border p-1 ${
                              index === 18 ? "bg-amber-100" : ""
                            }`}
                          >
                            {index < 31 && (
                              <div className="text-right text-sm">
                                {index + 1}
                                {index === 18 && (
                                  <div className="text-xs text-left mt-1 text-amber-800 truncate">
                                    Twi Workshop
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Events List */}
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card
                      key={event.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {event.date} • {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>{event.location}</span>
                          </div>
                          <div>Organized by: {event.organizer}</div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-amber-600"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Bookmark className="h-4 w-4 mr-2" /> Save
                          </Button>
                          <Button size="sm">RSVP</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.avatar} alt="User" />
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-sm text-muted-foreground">
                     <i>Joined</i> : {user?.createdAt.split("T")[0]}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="font-semibold">12</div>
                    <div className="text-sm text-muted-foreground">
                      Discussions
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold">5</div>
                    <div className="text-sm text-muted-foreground">Events</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              </CardFooter>
            </Card>

            {/* Popular Members */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Members</CardTitle>
                <CardDescription>
                  Most active community contributors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {popularMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.role} • {member.contributions} contributions
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Members
                </Button>
              </CardFooter>
            </Card>

            {/* Social Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
                <CardDescription>Join our social communities</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" /> Facebook
                </Button>
                <Button variant="outline" className="gap-2">
                  <Twitter className="h-4 w-4 text-blue-400" /> Twitter
                </Button>
                <Button variant="outline" className="gap-2">
                  <Instagram className="h-4 w-4 text-pink-600" /> Instagram
                </Button>
                <Button variant="outline" className="gap-2">
                  <Youtube className="h-4 w-4 text-red-600" /> YouTube
                </Button>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex-shrink-0">
                    1
                  </div>
                  <p>Be respectful of all members and cultures</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex-shrink-0">
                    2
                  </div>
                  <p>Share knowledge and ask questions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex-shrink-0">
                    3
                  </div>
                  <p>Keep discussions relevant to Akan language and culture</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="text-amber-600 p-0">
                  Read full guidelines
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
