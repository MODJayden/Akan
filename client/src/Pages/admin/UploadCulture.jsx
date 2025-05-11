import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCultureByAdmin,
  getCultures,
  uploadFile,
  updateCulture,
} from "@/store/Culture";
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
  Upload,
  Edit,
  User,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UploadCulture = () => {
  const dispatch = useDispatch();
  const { cultures, isLoading, error } = useSelector((state) => state.culture);
  const { user } = useSelector((state) => state.auth);
  const [openSheet, setOpenSheet] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCulture, setCurrentCulture] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("pending");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    fileType: "",
    status: "pending",
    user,
  });

  useEffect(() => {
    dispatch(getCultures());
  }, [dispatch]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadFile(data)).then((res) => {
        if (res?.payload?.success) {
          setFormData({ ...formData, fileUrl: res?.payload?.data.url });
          setIsUploading(false);
        }
      });
    }
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createCultureByAdmin(formData)).then((res) => {
      if (res?.payload?.success) {
        setFormData({
          title: "",
          category: "",
          description: "",
          fileType: "",
          status: "pending",
          user,
        });
        setOpenSheet(false);
        setFile(null);
        dispatch(getCultures());
      }
    });
  };

  const openStatusDialog = (culture) => {
    setCurrentCulture(culture);
    setStatusUpdate(culture.status);
    setOpenDialog(true);
  };

  const handleStatusUpdate = () => {
    if (!currentCulture) return;

    dispatch(
      updateCulture({
        id: currentCulture._id,
        status: statusUpdate,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        console.log(res);
        dispatch(getCultures());
        setOpenDialog(false);
      }
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  const getFileTypeIcon = (fileType) => {
    switch (fileType) {
      case "image":
        return <Image className="h-5 w-5 text-amber-600" />;
      case "video":
        return <Video className="h-5 w-5 text-amber-600" />;
      case "audio":
        return <Music className="h-5 w-5 text-amber-600" />;
      case "gallery":
        return <FileImage className="h-5 w-5 text-amber-600" />;
      default:
        return <File className="h-5 w-5 text-amber-600" />;
    }
  };

  const renderMediaContent = (culture) => {
    if (!culture.fileUrl) return null;

    switch (culture.fileType) {
      case "image":
        return (
          <div className="mt-3 rounded-md overflow-hidden">
            <img
              src={culture.fileUrl}
              alt={culture.title}
              className="w-full h-48 object-cover"
            />
          </div>
        );
      case "video":
        return (
          <div className="mt-3 rounded-md overflow-hidden">
            <video
              controls
              className="w-full h-48 object-cover"
              src={culture.fileUrl}
            />
          </div>
        );
      case "audio":
        return (
          <div className="mt-3">
            <audio controls className="w-full">
              <source src={culture.fileUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      default:
        return (
          <div className="mt-3">
            <a
              href={culture.fileUrl}
              download
              className="flex items-center text-amber-600 hover:text-amber-800"
            >
              <Download className="mr-2 h-4 w-4" />
              Download File
            </a>
          </div>
        );
    }
  };

  const categories = [
    "Traditions & Customs",
    "History & Heritage",
    "Arts & Crafts",
    "Music & Dance",
    "Social Customs & Etiquette",
    "Folklore & Oral Traditions",
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-amber-900">
            Cultural Content Management
          </h1>
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Cultural Content
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[500px]">
              <SheetHeader>
                <SheetTitle className="text-amber-900">
                  Add New Cultural Content
                </SheetTitle>
              </SheetHeader>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 p-4">
                <div>
                  <Label htmlFor="title" className="text-amber-800">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-amber-800">
                    Category
                  </Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-amber-800">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="fileType" className="text-amber-800">
                    Media Type
                  </Label>
                  <Select
                    name="fileType"
                    value={formData.fileType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, fileType: value })
                    }
                    required
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="gallery">Image Gallery</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="file" className="text-amber-800">
                    Media File
                  </Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Label
                      htmlFor="file"
                      className="cursor-pointer bg-amber-100 text-amber-800 px-4 py-2 rounded-md hover:bg-amber-200 transition-colors flex items-center"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {file ? file.name : "Choose file"}
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    {file && (
                      <span className="text-sm text-amber-600 flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Selected
                      </span>
                    )}
                  </div>
                  {isUploading && (
                    <p className="text-xs text-amber-600 mt-1">
                      Uploading file...
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 mt-6"
                  disabled={isLoading || isUploading}
                >
                  {isLoading || isUploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Upload Content"
                  )}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isLoading && cultures.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : cultures.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-amber-700 text-lg">
              No cultural content uploaded yet. Click "Add Cultural Content" to
              get started.
            </p>
          </div>
        ) : (
          <Tabs defaultValue={categories[0]} className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category.split(" & ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid pt-8 grid-cols-1 md:grid-cols-2 md:pt-4 lg:grid-cols-3 gap-6 lg:pt-4">
                  {cultures
                    .filter((culture) => culture.category === category)
                    .map((culture) => (
                      <Card
                        key={culture._id}
                        className="hover:shadow-lg transition-shadow h-full flex flex-col"
                      >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-lg font-bold text-amber-900">
                            {culture.title}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            {getFileTypeIcon(culture.fileType)}
                            {getStatusIcon(culture.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-gray-600 mb-3">
                            {culture.description}
                          </p>

                          {renderMediaContent(culture)}
                          <div className="mt-3 flex items-center gap-2 text-sm text-amber-600">
                            <User className="h-4 w-4" />
                            <span>
                              {culture.user?.name || "Anonymous Contributor"}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <Badge variant="outline" className="text-amber-600">
                              {culture.fileType}
                            </Badge>
                            <div className="flex gap-2">
                              {culture.status === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-amber-600 hover:text-amber-800"
                                  onClick={() => openStatusDialog(culture)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-800"
                                onClick={() => {
                                  if (
                                    confirm(
                                      "Are you sure you want to delete this item?"
                                    )
                                  ) {
                                    // Add delete functionality here
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Status Update Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Content Status</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-amber-800">Current Status</Label>
                <div className="mt-1 flex items-center gap-2">
                  {getStatusIcon(currentCulture?.status)}
                  <span className="capitalize">{currentCulture?.status}</span>
                </div>
              </div>

              <div>
                <Label htmlFor="status" className="text-amber-800">
                  New Status
                </Label>
                <Select value={statusUpdate} onValueChange={setStatusUpdate}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleStatusUpdate}
                className="w-full bg-amber-600 hover:bg-amber-700 mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Status"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UploadCulture;
