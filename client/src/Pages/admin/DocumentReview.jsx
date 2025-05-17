import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createHistoryByAdmin,
  getHistoryEntries,
  updateHistoryStatus,
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
  Trash2,
  Pencil,
  Check,
  X,
  Download,
} from "lucide-react";
import { toast } from "sonner";
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
import {
  Dialog,
  DialogContent,
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
import { Badge } from "@/components/ui/badge";

const DocumentReview = () => {
  const dispatch = useDispatch();
  const { histories, isLoading } = useSelector((store) => store.history);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const pendingHistory = histories?.filter(
    (history) => history.status === "Pending"
  );

  useEffect(() => {
    dispatch(getHistoryEntries());
  }, [dispatch]);

  const handleStatusUpdate = async () => {
    if (!selectedResource || !selectedStatus) return;

    setIsUpdating(true);
    try {
       dispatch(
        updateHistoryStatus({
          id: selectedResource._id,
          status: selectedStatus,
        })
      ).then((res) => {
        if (res?.payload?.success) {
          toast.success("Resource status updated successfully");
          dispatch(getHistoryEntries());
        }
      });
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-amber-900">Review Resources</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
        </div>
      ) : pendingHistory?.length === 0 ? (
        <div className="text-center py-12 bg-amber-50 rounded-lg">
          <p className="text-amber-800">No pending history resources found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingHistory?.map((resource) => (
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-amber-600 hover:bg-amber-100"
                          onClick={() => {
                            setSelectedResource(resource);
                            setSelectedStatus(resource.status);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Update Resource Status</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Select
                            value={selectedStatus}
                            onValueChange={setSelectedStatus}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Approved">
                                <div className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  Approved
                                </div>
                              </SelectItem>
                              <SelectItem value="Rejected">
                                <div className="flex items-center">
                                  <X className="h-4 w-4 mr-2 text-red-500" />
                                  Rejected
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            onClick={handleStatusUpdate}
                            disabled={isUpdating}
                            className="bg-amber-600 hover:bg-amber-700"
                          >
                            {isUpdating ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : null}
                            Update Status
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentReview;
