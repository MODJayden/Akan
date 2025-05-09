import { generateResource, getResources } from "@/store/Resources";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Loader2, Plus, Wand2 } from "lucide-react";
import jsPDF from "jspdf";

const Resources = () => {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState("");
  const { isLoading, error, resources } = useSelector(
    (state) => state.resource
  );
  const [generateLoading, setGenerateLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createForm, setCreateForm] = useState({
    topic: "",
    fileType: "",
    file: null,
  });

  useEffect(() => {
    dispatch(getResources());
  }, [dispatch]);

  const handleGenerate = async () => {
    setGenerateLoading(true);
    dispatch(generateResource({ topic: topic })).then((res) => {
      if (res?.payload?.success) {
        setTopic("");
        setGenerateLoading(false);
      }
    });
  };

  const handleCreateChange = (e) => {
    const { name, value, files } = e.target;
    setCreateForm((prev) => ({
      ...prev,
      [name]: name === "file" ? files[0] : value,
    }));
  };

  const handleFileTypeChange = (value) => {
    setCreateForm((prev) => ({ ...prev, fileType: value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      // Handle file upload logic here
      console.log("Creating resource with:", createForm);
      // await dispatch(uploadResource(createForm));
      setCreateForm({ topic: "", fileType: "", file: null });
    } catch (err) {
      console.error("Creation failed:", err);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDownload = (content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resource.txt";
    link.click();
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl text-amber-500 sm:text-2xl font-bold">
          Resource Management
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Wand2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Generate</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-lg sm:text-xl">
                  Generate New Resource
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4 p-4">
                <Input
                  placeholder="Enter topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={generateLoading}
                />
                <Button
                  onClick={handleGenerate}
                  disabled={!topic || generateLoading}
                  className="w-full"
                >
                  {generateLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Resource"
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Create</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-lg sm:text-xl">
                  Create New Resource
                </SheetTitle>
              </SheetHeader>
              <form
                onSubmit={handleCreateSubmit}
                className="mt-6  p-4 space-y-4"
              >
                <Input
                  name="topic"
                  placeholder="Resource topic"
                  value={createForm.topic}
                  onChange={handleCreateChange}
                  disabled={createLoading}
                />

                <Select
                  value={createForm.fileType}
                  onValueChange={handleFileTypeChange}
                  disabled={createLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select file type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Upload File
                  </label>
                  <Input
                    type="file"
                    name="file"
                    onChange={handleCreateChange}
                    disabled={createLoading}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={
                    !createForm.topic ||
                    !createForm.fileType ||
                    !createForm.file ||
                    createLoading
                  }
                  className="w-full"
                >
                  {createLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Create Resource"
                  )}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Resources list */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {resources?.map((resource) => (
              <div
                key={resource._id}
                className="border p-3 sm:p-4 rounded-lg hover:shadow-sm transition-shadow"
              >
                <h3 className="font-medium text-sm sm:text-base">
                  {resource.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {resource.type}
                </p>
                <Button
                  variant="outline"
                  onClick={() => handleDownload(resource.content)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
