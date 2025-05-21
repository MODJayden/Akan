import React, { useEffect, useState } from "react";
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
  FileAudio2,
  FileVideo2,
  Image,
  FileText,
  Loader2,
  Trash2,
  Pencil,
  Check,
  X,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createHistoryByUser,
  getHistoryEntries,
  updateHistoryStatus,
  deleteHistoryEntry,
} from "@/store/History";
import { uploadFile } from "@/store/Culture";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setIsUploading] = useState(false);
  const { histories, isLoading } = useSelector((store) => store.history);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    format: "",
    file: "",
  });
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const approvedHistory = histories?.filter(
    (history) => history.status === "Approved"
  );
  const [openSheet, setOpenSheet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const dispatch = useDispatch();

  // Game functions
  const checkMatch = (engId, twiId) => {
    const pairs = {
      "eng-0": "twi-2", // Hello - Agoo
      "eng-1": "twi-3", // Thank you - Medaase
      "eng-2": "twi-1", // Good morning - Maakye
      "eng-3": "twi-4", // Family - Abusua
      "eng-4": "twi-0", // Food - Aduane
    };
    return pairs[engId] === twiId;
  };

  const checkCompletion = () => {
    const visibleElements = document.querySelectorAll(
      '[id^="eng-"], [id^="twi-"]'
    );
    const visibleCount = Array.from(visibleElements).filter(
      (el) => el.style.visibility !== "hidden"
    ).length;

    if (visibleCount === 0) {
      document.getElementById("game-feedback").textContent =
        "Yɛyɛɛ! (Well done!)";
    }
  };

  useEffect(() => {
    dispatch(getHistoryEntries());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileUrl(file);
    if (!file) return;
  };

  useEffect(() => {
    if (fileUrl) {
      setIsUploading(true);
      const data = new FormData();
      data.append("file", fileUrl);
      dispatch(uploadFile(data)).then((res) => {
        if (res?.payload?.success) {
          setFormData({ ...formData, file: res?.payload?.data.url });
          setIsUploading(false);
        }
      });
    }
  }, [fileUrl]);

  const handleDownload = (fileUrl, fileName) => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName || "download";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(() => toast.error("Failed to download file"));
  };

  const handleStatusUpdate = async () => {
    if (!selectedResource || !selectedStatus) return;

    setIsUpdating(true);
    try {
      await dispatch(
        updateHistoryStatus({
          id: selectedResource._id,
          status: selectedStatus,
        })
      );
      toast.success("Resource status updated successfully");
    } catch (error) {
      toast.error("Failed to update resource status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await dispatch(deleteHistoryEntry(id));
      toast.success("Resource deleted successfully");
    } catch (error) {
      toast.error("Failed to delete resource");
    } finally {
      setIsDeleting(false);
    }
  };

  const filterHistory = approvedHistory?.filter((history) => {
    if (searchQuery) {
      return (
        history.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        history.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return history;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      dispatch(createHistoryByUser(formData)).then((res) => {
        if (res?.payload?.success) {
          setFormData({
            title: "",
            description: "",
            type: "",
            format: "",
            file: "",
          });
          setFileUrl(null);
          setFilePreview(null);
          dispatch(getHistoryEntries());
          setOpenSheet(false);
          toast.success("History resource created successfully");
        }
      });
    } catch (error) {
      toast.error("Failed to create resource");
    }
    setIsSubmitting(false);
  };

  const formatOptions = {
    "Archival Documents": ["PDF", "DOC", "TXT"],
    "Oral Histories": ["MP3", "WAV", "AAC"],
    "Cultural Objects": ["JPEG", "PNG", "OBJ", "STL"],
    Photographs: ["JPEG", "PNG", "TIFF"],
    Other: ["MP4", "MOV", "ZIP"],
  };

  const getFormatOptions = () => {
    return formData.type ? formatOptions[formData.type] || [] : [];
  };

  const renderMediaPreview = (resource) => {
    switch (resource?.format?.toLowerCase()) {
      case "mp3":
      case "wav":
      case "aac":
        return (
          <div className="mt-2">
            <audio controls className="w-full">
              <source
                src={resource.file}
                type={`audio/${resource?.format?.toLowerCase()}`}
              />
            </audio>
          </div>
        );
      case "mp4":
      case "mov":
        return (
          <div className="mt-2">
            <video controls className="w-full rounded-lg">
              <source
                src={resource.file}
                type={`video/${resource?.format?.toLowerCase()}`}
              />
            </video>
          </div>
        );
      case "jpeg":
      case "png":
      case "tiff":
        return (
          <div className="mt-2">
            <img
              src={resource.file}
              alt={resource.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        );
      default:
        return (
          <div className="mt-2 flex items-center justify-center bg-amber-50 rounded-lg p-4">
            <FileText className="h-12 w-12 text-amber-400" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen ">
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

          {/* Upload Button */}
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
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
            <SheetContent className="bg-white w-full p-8 sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-amber-900">
                  Add New History Resource
                </SheetTitle>
              </SheetHeader>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    Title
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter resource title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter detailed description"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    Resource Type
                  </label>
                  <Select
                    name="type"
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: value,
                        format: "",
                      }))
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Archival Documents">
                        Archival Documents
                      </SelectItem>
                      <SelectItem value="Oral Histories">
                        Oral Histories
                      </SelectItem>
                      <SelectItem value="Cultural Objects">
                        Cultural Objects
                      </SelectItem>
                      <SelectItem value="Photographs">Photographs</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    Format
                  </label>
                  <Select
                    name="format"
                    value={formData.format}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, format: value }))
                    }
                    disabled={!formData.type}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      {getFormatOptions().map((format) => (
                        <SelectItem key={format} value={format}>
                          {format}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    File
                  </label>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept={
                      formData.type === "Photographs"
                        ? "image/*"
                        : formData.type === "Oral Histories"
                        ? "audio/*"
                        : formData.type === "Cultural Objects"
                        ? "image/*,.obj,.stl"
                        : "video/*,.pdf,.doc,.txt,.zip"
                    }
                    required
                  />
                  {filePreview && (
                    <div className="mt-2">
                      {filePreview.type === "image" && (
                        <img
                          src={filePreview.url}
                          alt="Preview"
                          className="h-32 object-contain rounded"
                        />
                      )}
                      {filePreview.type === "audio" && (
                        <audio
                          controls
                          src={filePreview.url}
                          className="w-full mt-2"
                        />
                      )}
                      {filePreview.type === "video" && (
                        <video
                          controls
                          src={filePreview.url}
                          className="w-full h-32 mt-2 rounded"
                        />
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    disabled={isSubmitting || uploading}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Upload Resource
                  </Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        {/* Documents Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
          </div>
        ) : histories?.length === 0 ? (
          <div className="text-center py-12 bg-amber-50 rounded-lg">
            <p className="text-amber-800">No history resources found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterHistory?.map((resource) => (
              <div
                key={resource._id}
                className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-amber-900 text-lg">
                        {resource.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={
                          resource.status === "Approved"
                            ? "border-green-200 text-green-800 bg-green-50"
                            : resource.status === "Rejected"
                            ? "border-red-200 text-red-800 bg-red-50"
                            : "border-amber-200 text-amber-800 bg-amber-50"
                        }
                      >
                        {resource.status}
                      </Badge>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-amber-600 border-amber-200"
                    >
                      {resource.type}
                    </Badge>
                  </div>

                  <p className="text-amber-800 mt-2 text-sm">
                    {resource.description}
                  </p>

                  {renderMediaPreview(resource)}

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-sm text-amber-600">
                      {resource?.format?.toLowerCase() === "mp3" ||
                      resource?.format?.toLowerCase() === "wav" ? (
                        <FileAudio2 className="h-4 w-4 mr-1" />
                      ) : resource?.format?.toLowerCase() === "mp4" ||
                        resource?.format?.toLowerCase() === "mov" ? (
                        <FileVideo2 className="h-4 w-4 mr-1" />
                      ) : resource?.format?.toLowerCase() === "jpeg" ||
                        resource?.format?.toLowerCase() === "png" ? (
                        <Image className="h-4 w-4 mr-1" />
                      ) : (
                        <FileText className="h-4 w-4 mr-1" />
                      )}
                      <span>{resource.format}</span>
                    </div>

                    <div className="flex space-x-2">
                      {/* Download Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-amber-600 hover:bg-amber-100"
                        onClick={() =>
                          handleDownload(resource.file, resource.title)
                        }
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Akan Language Game */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Akan Language Match
          </h2>
          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
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
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="m4.9 4.9 14.2 14.2"></path>
                </svg>
                Match the Words
              </CardTitle>
              <CardDescription className="text-amber-700">
                Connect Twi words to their English meanings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 min-h-[200px]">
                {/* English Words Column */}
                <div className="space-y-2">
                  <h3 className="font-medium text-amber-900 mb-2">English</h3>
                  {["Hello", "Thank you", "Good morning", "Family", "Food"].map(
                    (word, index) => (
                      <div
                        key={`eng-${index}`}
                        id={`eng-${index}`}
                        className="p-3 bg-white rounded border border-amber-200 cursor-move text-center"
                        draggable="true"
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", `eng-${index}`)
                        }
                      >
                        {word}
                      </div>
                    )
                  )}
                </div>

                {/* Twi Words Column */}
                <div className="space-y-2">
                  <h3 className="font-medium text-amber-900 mb-2">Twi</h3>
                  {["Aduane", "Maakye", "Agoo", "Medaase", "Abusua"].map(
                    (word, index) => (
                      <div
                        key={`twi-${index}`}
                        id={`twi-${index}`}
                        className="p-3 bg-white rounded border border-amber-200 text-center"
                        onDrop={(e) => {
                          e.preventDefault();
                          const draggedId =
                            e.dataTransfer.getData("text/plain");
                          const draggedElement =
                            document.getElementById(draggedId);
                          if (draggedElement) {
                            const isCorrect = checkMatch(
                              draggedId,
                              `twi-${index}`
                            );
                            e.currentTarget.style.backgroundColor = isCorrect
                              ? "#d97706"
                              : "#fca5a5";
                            if (isCorrect) {
                              setTimeout(() => {
                                draggedElement.style.visibility = "hidden";
                                e.currentTarget.style.visibility = "hidden";
                                checkCompletion();
                              }, 500);
                            }
                          }
                        }}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        {word}
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-center space-y-3">
              <div
                id="game-feedback"
                className="text-amber-700 font-medium"
              ></div>
              <Button
                variant="outline"
                className="border-amber-300 text-amber-700"
                onClick={() => {
                  const elements = document.querySelectorAll(
                    '[id^="eng-"], [id^="twi-"]'
                  );
                  elements.forEach((el) => {
                    el.style.visibility = "visible";
                    el.style.backgroundColor = "white";
                  });
                  document.getElementById("game-feedback").textContent = "";
                }}
              >
                Reset Game
              </Button>
              <div className="text-xs text-amber-600">
                <p>Drag English words to match with Twi words</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default History;

/*
 */
