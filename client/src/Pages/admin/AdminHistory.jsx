import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createHistoryByAdmin,
  getHistoryEntries,
  deleteHistoryEntry,
} from "@/store/History";
import {
  Plus,
  Loader2,
  Play,
  Image,
  FileAudio2,
  FileVideo2,
  FileText,
  Download,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { uploadFile } from "@/store/Culture";

const AdminHistory = () => {
  const dispatch = useDispatch();
  const { histories, isLoading } = useSelector((store) => store.history);
  const [fileUrl, setFileUrl] = useState(null);
  const [uploading, setIsUploading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    format: "",
    file: "",
  });
  const approvedHistory = histories?.filter(
    (history) => history.status === "Approved"
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    dispatch(getHistoryEntries());
  }, [dispatch]);
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
  const handleselectId = (id) => {
    setDeleteId(id);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      dispatch(createHistoryByAdmin(formData)).then((res) => {
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
          toast.success("History resource created successfully");
        }
      });
    } catch (error) {
      toast.error("Failed to create resource");
    } finally {
      setIsSubmitting(false);
    }
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

  const handleDelete = () => {
    dispatch(deleteHistoryEntry(deleteId)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getHistoryEntries());
        setDeleteId(null);
        
        toast.success("History resource deleted successfully");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-amber-900">History Resources</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </SheetTrigger>
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
          {approvedHistory?.map((resource) => (
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
                <div className="flex items-center justify-between mt-4">
                  <div className="mt-3 flex items-center text-sm text-amber-600">
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

                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-amber-600 hover:bg-amber-100"
                            onClick={() => handleselectId(resource._id)}
                            title="Download"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Are you sure you want to delete?
                            </DialogTitle>
                            <DialogDescription>
                              This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex items-center space-x-2"></div>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Close
                              </Button>
                            </DialogClose>
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={handleDelete}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHistory;
