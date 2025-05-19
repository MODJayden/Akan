import React, { useEffect, useState } from "react";
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
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { createDiscussion, fetchDiscussions } from "@/store/discussionSlice";
import { createComment, fetchComments } from "@/store/commentSlice";
import { createEvent, getEvents } from "@/store/Event";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    tags: [],
    author: user?._id,
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    tags: [],
  });
  const [newComment, setNewComment] = useState({});
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const { discussions, isLoading: discussionsLoading } = useSelector(
    (state) => state.discussions
  );
  const { comments, isLoading: commentsLoading } = useSelector(
    (state) => state.comments
  );
  const { events, isLoading: eventsLoading } = useSelector(
    (state) => state.event
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
    dispatch(fetchDiscussions());
    dispatch(getEvents());
  }, [dispatch]);

  const handleCreateDiscussion = (data) => {
    dispatch(createDiscussion(data)).then((res) => {
      if (res?.payload?.success) {
        setNewDiscussion({ title: "", content: "", tags: [] });
        dispatch(fetchDiscussions());
        toast.success("Discussion created successfully");
      } else {
        toast.error("Discussion creation failed: " );
      }
    });
  };

  const handleCreateEvent = () => {
    dispatch(
      createEvent({
        ...newEvent,
        organizer: user.name,
        attendees: 0,
      })
    ).then(() => {
      setNewEvent({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        tags: [],
      });
      dispatch(getEvents());
    });
  };

  const handleCreateComment = (discussionId) => {
    dispatch(
      createComment({
        content: newComment[discussionId] || "",
        discussionId,
        author: user._id,
      })
    ).then(() => {
      setNewComment((prev) => ({ ...prev, [discussionId]: "" }));
      dispatch(fetchComments());
      dispatch(fetchDiscussions());
    });
  };

  const handleLikeDiscussion = (discussionId) => {
    // Implement like functionality
    console.log("Liked discussion:", discussionId);
  };

  const availableTags = [
    "language",
    "pronunciation",
    "events",
    "culture",
    "history",
    "traditions",
  ];

  const filteredDiscussions =
    Array.isArray(discussions) &&
    discussions?.filter((discussion) =>
      discussion?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
    );

  const filteredEvents = events?.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Main Content */}
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl font-bold text-amber-900">
                Community Hub
              </h1>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                <Input
                  placeholder="Search community..."
                  className="pl-9 pr-10 h-10 bg-white border-amber-200 focus:border-amber-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 hover:bg-amber-100"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Community Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="bg-white rounded-lg shadow-sm"
            >
              <TabsList className="grid w-full grid-cols-2 bg-amber-50">
                <TabsTrigger
                  value="discussions"
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" /> Discussions
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                >
                  <Calendar className="h-4 w-4 mr-2" /> Events
                </TabsTrigger>
              </TabsList>

              {/* Discussions Tab */}
              <TabsContent value="discussions" className="p-4 space-y-6">
                {/* New Post Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 shadow-md">
                      <Plus className="h-4 w-4 mr-2" /> Start New Discussion
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="sm:max-w-2xl">
                    <ScrollArea className="h-full">
                      <div className="p-6">
                        <SheetHeader>
                          <SheetTitle className="text-amber-900">
                            Create New Discussion
                          </SheetTitle>
                          <SheetDescription>
                            Share your thoughts with the community
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-amber-800">
                              Title
                            </label>
                            <Input
                              placeholder="What's your discussion about?"
                              value={newDiscussion.title}
                              onChange={(e) =>
                                setNewDiscussion({
                                  ...newDiscussion,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-amber-800">
                              Content
                            </label>
                            <Textarea
                              className="min-h-[200px]"
                              placeholder="Write your discussion content here..."
                              value={newDiscussion.content}
                              onChange={(e) =>
                                setNewDiscussion({
                                  ...newDiscussion,
                                  content: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-amber-800">
                              Tags
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {newDiscussion.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="bg-amber-100 text-amber-800 border-amber-200"
                                >
                                  {tag}
                                  <button
                                    onClick={() =>
                                      setNewDiscussion({
                                        ...newDiscussion,
                                        tags: newDiscussion.tags.filter(
                                          (t) => t !== tag
                                        ),
                                      })
                                    }
                                    className="ml-2"
                                  >
                                    ×
                                  </button>
                                </Badge>
                              ))}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-amber-600 border-amber-200"
                                  >
                                    + Add Tag
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  {availableTags
                                    .filter(
                                      (tag) => !newDiscussion.tags.includes(tag)
                                    )
                                    .map((tag) => (
                                      <DropdownMenuItem
                                        key={tag}
                                        onSelect={() =>
                                          setNewDiscussion({
                                            ...newDiscussion,
                                            tags: [...newDiscussion.tags, tag],
                                          })
                                        }
                                      >
                                        {tag}
                                      </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                        <SheetFooter>
                          <Button
                            className="w-full bg-amber-600 hover:bg-amber-700"
                            onClick={() => handleCreateDiscussion(newDiscussion)}
                          >
                            Post Discussion
                          </Button>
                        </SheetFooter>
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>

                {/* Discussion List */}
                {discussionsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                  </div>
                ) : filteredDiscussions?.length === 0 ? (
                  <Card className="text-center py-8">
                    <CardDescription>
                      No discussions found. Start a new one!
                    </CardDescription>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredDiscussions?.map((discussion) => (
                      <Card
                        key={discussion?._id}
                        className="hover:shadow-md transition-shadow border-amber-100"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg text-amber-900">
                              {discussion?.title}
                            </CardTitle>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-amber-600"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>Bookmark</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                {user?._id === discussion.author?._id && (
                                  <DropdownMenuItem className="text-red-600">
                                    Delete
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={discussion?.author?.avatar}
                                alt={discussion?.author?.name}
                              />
                              <AvatarFallback>
                                {discussion?.author?.name?.charAt(0)}  
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm text-amber-800">
                              <span className="font-medium">
                                {discussion?.author?.name}
                              </span>
                              <span className="text-amber-600 mx-2">•</span>
                              <span>
                                {formatDistanceToNow(
                                  new Date(discussion.createdAt),
                                  { addSuffix: true }
                                )}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-amber-900">{discussion?.content}</p>
                          {discussion.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {discussion?.tags?.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="bg-amber-100 text-amber-800 border-amber-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-amber-100 pt-3">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-amber-600"
                              onClick={() =>
                                handleLikeDiscussion(discussion._id)
                              }
                            >
                              <Heart className="h-4 w-4 mr-2" />
                              {discussion.likes.length}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-amber-600"
                              onClick={() =>
                                setSelectedDiscussion(
                                  selectedDiscussion === discussion._id
                                    ? null
                                    : discussion._id
                                )
                              }
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              {discussion.comments.length} comments
                            </Button>
                          </div>
                        </CardFooter>

                        {/* Comments Section */}
                        {selectedDiscussion === discussion._id && (
                          <div className="border-t border-amber-100 p-4 space-y-4">
                            <div className="space-y-4">
                              {discussion.comments.map((comment) => (
                                <div key={comment._id} className="flex gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={comment.author.avatar}
                                      alt={comment.author.name}
                                    />
                                    <AvatarFallback>
                                      {comment.author.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="bg-amber-50 rounded-lg p-3">
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="font-medium text-amber-900">
                                          {comment.author.name}
                                        </span>
                                        <span className="text-amber-600">
                                          •
                                        </span>
                                        <span className="text-amber-700">
                                          {formatDistanceToNow(
                                            new Date(comment.createdAt),
                                            { addSuffix: true }
                                          )}
                                        </span>
                                      </div>
                                      <p className="mt-1 text-amber-900">
                                        {comment.content}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Add Comment */}
                            <div className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={user.avatar}
                                  alt={user.name}
                                />
                                <AvatarFallback>
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-2">
                                <Textarea
                                  placeholder="Add a comment..."
                                  value={newComment[discussion._id] || ""}
                                  onChange={(e) =>
                                    setNewComment({
                                      ...newComment,
                                      [discussion._id]: e.target.value,
                                    })
                                  }
                                  className="min-h-[80px]"
                                />
                                <div className="flex justify-end">
                                  <Button
                                    size="sm"
                                    className="bg-amber-600 hover:bg-amber-700"
                                    onClick={() =>
                                      handleCreateComment(discussion._id)
                                    }
                                  >
                                    Post Comment
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="p-4 space-y-6">
                {/* Events Calendar */}
                <Card className="border-amber-100">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-amber-900">
                      <span>Upcoming Events</span>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-amber-300 text-amber-700 hover:bg-amber-50"
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add Event
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-md">
                          <ScrollArea className="h-full">
                            <div className="p-6">
                              <SheetHeader>
                                <SheetTitle className="text-amber-900">
                                  Add New Event
                                </SheetTitle>
                                <SheetDescription>
                                  Share an upcoming event with the community
                                </SheetDescription>
                              </SheetHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-amber-800">
                                    Event Title
                                  </label>
                                  <Input
                                    placeholder="Event name"
                                    value={newEvent.title}
                                    onChange={(e) =>
                                      setNewEvent({
                                        ...newEvent,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium text-amber-800">
                                      Date
                                    </label>
                                    <Input
                                      type="date"
                                      value={newEvent.date}
                                      onChange={(e) =>
                                        setNewEvent({
                                          ...newEvent,
                                          date: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium text-amber-800">
                                      Time
                                    </label>
                                    <Input
                                      type="time"
                                      value={newEvent.time}
                                      onChange={(e) =>
                                        setNewEvent({
                                          ...newEvent,
                                          time: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-amber-800">
                                    Location
                                  </label>
                                  <Input
                                    placeholder="Physical or virtual location"
                                    value={newEvent.location}
                                    onChange={(e) =>
                                      setNewEvent({
                                        ...newEvent,
                                        location: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-amber-800">
                                    Description
                                  </label>
                                  <Textarea
                                    className="min-h-[100px]"
                                    placeholder="Describe your event..."
                                    value={newEvent.description}
                                    onChange={(e) =>
                                      setNewEvent({
                                        ...newEvent,
                                        description: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-amber-800">
                                    Tags
                                  </label>
                                  <div className="flex flex-wrap gap-2">
                                    {newEvent.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="outline"
                                        className="bg-amber-100 text-amber-800 border-amber-200"
                                      >
                                        {tag}
                                        <button
                                          onClick={() =>
                                            setNewEvent({
                                              ...newEvent,
                                              tags: newEvent.tags.filter(
                                                (t) => t !== tag
                                              ),
                                            })
                                          }
                                          className="ml-2"
                                        >
                                          ×
                                        </button>
                                      </Badge>
                                    ))}
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="text-amber-600 border-amber-200"
                                        >
                                          + Add Tag
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        {availableTags
                                          .filter(
                                            (tag) =>
                                              !newEvent.tags.includes(tag)
                                          )
                                          .map((tag) => (
                                            <DropdownMenuItem
                                              key={tag}
                                              onSelect={() =>
                                                setNewEvent({
                                                  ...newEvent,
                                                  tags: [...newEvent.tags, tag],
                                                })
                                              }
                                            >
                                              {tag}
                                            </DropdownMenuItem>
                                          ))}
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </div>
                              <SheetFooter>
                                <Button
                                  className="w-full bg-amber-600 hover:bg-amber-700"
                                  onClick={handleCreateEvent}
                                >
                                  Submit Event
                                </Button>
                              </SheetFooter>
                            </div>
                          </ScrollArea>
                        </SheetContent>
                      </Sheet>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg overflow-hidden border-amber-200">
                      <div className="grid grid-cols-7 bg-amber-100 text-amber-900 font-medium text-sm">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <div
                              key={day}
                              className="p-2 text-center border-r border-amber-200 last:border-r-0"
                            >
                              {day}
                            </div>
                          )
                        )}
                      </div>
                      <div className="grid grid-cols-7">
                        {Array.from({ length: 35 }).map((_, index) => (
                          <div
                            key={index}
                            className={`h-16 border border-amber-100 p-1 ${
                              index === 18 ? "bg-amber-50" : "bg-white"
                            }`}
                          >
                            {index < 31 && (
                              <div className="text-right text-sm text-amber-800">
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
                {eventsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                  </div>
                ) : filteredEvents.length === 0 ? (
                  <Card className="text-center py-8">
                    <CardDescription>
                      No upcoming events. Add a new one!
                    </CardDescription>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredEvents.map((event) => (
                      <Card
                        key={event._id}
                        className="hover:shadow-md transition-shadow border-amber-100"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg text-amber-900">
                              {event.title}
                            </CardTitle>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-amber-600"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>Bookmark</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                {user._id === event.organizer && (
                                  <DropdownMenuItem className="text-red-600">
                                    Delete
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="text-sm text-amber-800">
                            <span className="font-medium">
                              Organized by {event.organizer}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-amber-700">
                                Date & Time
                              </div>
                              <div className="text-amber-900">
                                {new Date(event.date).toLocaleDateString()} at{" "}
                                {event.time}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-amber-700">
                                Location
                              </div>
                              <div className="text-amber-900">
                                {event.location}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 space-y-1">
                            <div className="text-sm font-medium text-amber-700">
                              Description
                            </div>
                            <p className="text-amber-900">
                              {event.description}
                            </p>
                          </div>
                          {event.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {event.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="bg-amber-100 text-amber-800 border-amber-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-amber-100 pt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-amber-600"
                          >
                            <Users className="h-4 w-4 mr-2" />
                            {event.attendees} attending
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-amber-300 text-amber-700 hover:bg-amber-50"
                            >
                              I'm interested
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-amber-600"
                            >
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <Card className="border-amber-100">
              <CardHeader>
                <CardTitle className="text-amber-900">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.avatar} alt="User" />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-amber-900">
                      {user?.name}
                    </div>
                    <div className="text-sm text-amber-700">
                      <i>Joined</i> :{" "}
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="font-semibold text-amber-900">
                      {discussions?.filter((d) => d?.author?._id === user?._id)
                        .length || 0}
                    </div>
                    <div className="text-sm text-amber-700">Discussions</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-amber-900">
                      {events.filter((e) => e.organizer === user.name).length ||
                        0}
                    </div>
                    <div className="text-sm text-amber-700">Events</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <User className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              </CardFooter>
            </Card>

            {/* Popular Members */}
            <Card className="border-amber-100">
              <CardHeader>
                <CardTitle className="text-amber-900">
                  Top Contributors
                </CardTitle>
                <CardDescription className="text-amber-700">
                  Most active community members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  ...discussions
                    ?.reduce((map, discussion) => {
                      const authorId = discussion?.author?._id;
                      if (!map.has(authorId)) {
                        map.set(authorId, {
                          ...discussion?.author,
                          contributions: 0,
                        });
                      }
                      map.get(authorId).contributions += 1;
                      return map;
                    }, new Map())
                    .values(),
                ]
                  .sort((a, b) => b.contributions - a.contributions)
                  .slice(0, 3)
                  .map((member) => (
                    <div key={member._id} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-amber-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-amber-700">
                          {member.contributions} contributions
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  View All Members
                </Button>
              </CardFooter>
            </Card>

            {/* Social Sharing */}
            <Card className="border-amber-100">
              <CardHeader>
                <CardTitle className="text-amber-900">
                  Connect With Us
                </CardTitle>
                <CardDescription className="text-amber-700">
                  Join our social communities
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="gap-2 border-amber-200 hover:bg-amber-50"
                >
                  <Facebook className="h-4 w-4 text-blue-600" /> Facebook
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-amber-200 hover:bg-amber-50"
                >
                  <Twitter className="h-4 w-4 text-blue-400" /> Twitter
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-amber-200 hover:bg-amber-50"
                >
                  <Instagram className="h-4 w-4 text-pink-600" /> Instagram
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-amber-200 hover:bg-amber-50"
                >
                  <Youtube className="h-4 w-4 text-red-600" /> YouTube
                </Button>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="border-amber-100">
              <CardHeader>
                <CardTitle className="text-amber-900">
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex-shrink-0">
                    1
                  </div>
                  <p className="text-amber-900">
                    Be respectful of all members and cultures
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex-shrink-0">
                    2
                  </div>
                  <p className="text-amber-900">
                    Share knowledge and ask questions
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex-shrink-0">
                    3
                  </div>
                  <p className="text-amber-900">
                    Keep discussions relevant to Akan language and culture
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="text-amber-600 p-0 hover:text-amber-800"
                >
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
