import React, { useEffect, useState } from "react";
import {
  PlusCircle,
  Trash2,
  Image,
  Video,
  Music,
  FileImage,
  File,
  Download,
  Check,
  X,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Search,
  Plus,
  ChevronRight,
  Upload,
  User,
  Loader2,
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
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { createCultureByUser, getCultures } from "@/store/Culture";

const Culture = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openSheet, setOpenSheet] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cultures, isLoading } = useSelector((state) => state.culture);
  const { user } = useSelector((state) => state.auth);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    fileType: "",
    status: "pending",
    user,
    fileUrl: "",
  });

  useEffect(() => {
    dispatch(getCultures());
  }, [dispatch]);

  const categories = [
    { id: "traditions", name: "Traditions & Customs" },
    { id: "history", name: "History & Heritage" },
    { id: "arts", name: "Arts & Crafts" },
    { id: "music", name: "Music & Dance" },
    { id: "social", name: "Social Customs" },
    { id: "folklore", name: "Folklore" },
  ];

  const filteredCultures = cultures?.filter((item) => {
    const statusMatch = item.status === "approved";
    const categoryMatch =
      activeTab === "all" || item.category.toLowerCase().includes(activeTab);
    const searchMatch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && categoryMatch && searchMatch;
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getFileTypeIcon = (fileType) => {
    switch (fileType) {
      case "image":
        return <Image className="h-5 w-5 text-amber-600" />;
      case "video":
        return <Video className="h-5 w-5 text-amber-600" />;
      case "audio":
        return <Music className="h-5 w-5 text-amber-600" />;
      default:
        return <File className="h-5 w-5 text-amber-600" />;
    }
  };

  const renderMediaContent = (culture) => {
    if (!culture.fileUrl) return null;

    switch (culture.fileType) {
      case "image":
        return (
          <img
            src={culture.fileUrl}
            alt={culture.title}
            className="w-full h-48 object-cover rounded-md"
          />
        );
      case "video":
        return (
          <video
            controls
            className="w-full h-48 object-cover rounded-md"
            src={culture.fileUrl}
          />
        );
      case "audio":
        return (
          <audio controls className="w-full">
            <source src={culture.fileUrl} type="audio/mpeg" />
          </audio>
        );
      default:
        return (
          <Button
            variant="ghost"
            onClick={() => window.open(culture.fileUrl, "_blank")}
            className="text-amber-600 hover:text-amber-800"
          >
            <Download className="mr-2 h-4 w-4" />
            View File
          </Button>
        );
    }
  };

  useEffect(() => {
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      dispatch(uploadFile(formData))
        .then((res) => {
          if (res?.payload?.success) {
            setFormData((prev) => ({
              ...prev,
              fileUrl: res.payload.data.url,
            }));
            toast.success("File uploaded successfully");
          } else {
            toast.error("File upload failed");
          }
        })
        .finally(() => setIsUploading(false));
    }
  }, [file, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.title ||
      !formData.category ||
      !formData.fileType ||
      !formData.fileUrl
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const result = await dispatch(createCultureByUser(formData));
      if (result?.payload?.success) {
        toast.success("Content submitted successfully!");
        setFormData({
          title: "",
          category: "",
          description: "",
          fileType: "",
          status: "pending",
          user,
          fileUrl: "",
        });
        setFile(null);
        setOpenSheet(false);
        dispatch(getCultures());
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen">
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cultural content..."
              className="pl-9 pr-10 h-12 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger asChild>
              {isAuthenticated ? (
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <Plus className="h-4 w-4 mr-2" /> Add Content
                </Button>
              ) : (
                <Button asChild className="bg-amber-600 hover:bg-amber-700">
                  <Link to="/login">
                    <Plus className="h-4 w-4 mr-2" /> Add Content
                  </Link>
                </Button>
              )}
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-[500px] overflow-y-auto  p-4"
            >
              <SheetHeader className="mb-6">
                <SheetTitle className="text-amber-900">
                  Add Cultural Content
                </SheetTitle>
              </SheetHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-amber-800">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter content title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-amber-800">
                    Category *
                  </Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-amber-800">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your content"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileType" className="text-amber-800">
                    Media Type *
                  </Label>
                  <Select
                    name="fileType"
                    value={formData.fileType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, fileType: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file" className="text-amber-800">
                    Media File *
                  </Label>
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="file-upload"
                      className={`flex-1 cursor-pointer border-2 border-dashed rounded-lg p-4 text-center hover:bg-amber-50 transition-colors ${
                        file ? "border-amber-300" : "border-gray-300"
                      }`}
                    >
                      {file ? (
                        <div className="space-y-2">
                          <p className="font-medium text-amber-800 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-amber-600">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="mx-auto h-8 w-8 text-amber-500" />
                          <p className="text-sm text-amber-700">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-amber-500">
                            Max file size: 5MB
                          </p>
                        </div>
                      )}
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept={
                        formData.fileType === "image"
                          ? "image/*"
                          : formData.fileType === "video"
                          ? "video/*"
                          : formData.fileType === "audio"
                          ? "audio/*"
                          : "*"
                      }
                      required
                    />
                  </div>
                  {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-amber-600">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Uploading file...</span>
                    </div>
                  )}
                  {formData.fileUrl && !isUploading && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Check className="h-4 w-4" />
                      <span>File uploaded successfully</span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={isUploading || isLoading}
                >
                  {isUploading || isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Content"
                  )}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full  grid-cols-2 sm:grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name.split(" & ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
            </div>
          ) : (
            <div className="mt-15">
              {filteredCultures?.length === 0 ? (
                <div className="text-center  bg-amber-50 rounded-lg">
                  <File className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-amber-800">
                    No content found
                  </h3>
                  <p className="mt-2 text-sm text-amber-600">
                    {searchQuery
                      ? "No results match your search"
                      : activeTab === "all"
                      ? "No cultural content available yet"
                      : `No ${
                          categories.find((c) => c.id === activeTab)?.name ||
                          activeTab
                        } content found`}
                  </p>
                  {isAuthenticated && (
                    <Button
                      onClick={() => setOpenSheet(true)}
                      className="mt-4 bg-amber-600 hover:bg-amber-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Content
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCultures.map((culture) => (
                    <Card
                      key={culture._id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="text-amber-900">
                            {culture.title}
                          </CardTitle>
                          <Badge variant="outline" className="text-amber-600">
                            {culture.category.split(" & ")[0]}
                          </Badge>
                        </div>
                        <CardDescription className="text-amber-800 line-clamp-2">
                          {culture.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{renderMediaContent(culture)}</CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-amber-600">
                          {getFileTypeIcon(culture.fileType)}
                          <span className="ml-2 capitalize">
                            {culture.fileType}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          className="text-amber-600 hover:text-amber-800"
                          onClick={() => window.open(culture.fileUrl, "_blank")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </Tabs>

        {/* Contributors Section */}
        {filteredCultures?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              Top Contributors
            </h2>
            <div className="relative overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                {[...filteredCultures, ...filteredCultures].map(
                  (culture, index) => (
                    <div
                      key={`${culture._id}-${index}`}
                      className="inline-block mx-3 bg-white rounded-lg shadow-sm p-4 w-48"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-amber-900 truncate">
                            {culture.user?.name || "Anonymous"}
                          </p>
                          <p className="text-xs text-amber-600">
                            {culture.contributions || 1} contribution(s)
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Culture;
