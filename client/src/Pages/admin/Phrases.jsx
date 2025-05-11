import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPhrases,
  deletePhrase,
  uploadAudioPhrase,
  createPhrase,
} from "@/store/Phrases";
import { PlusCircle, Trash2, Volume2, Upload, X, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Phrases = () => {
  const { phrases, isLoading, error } = useSelector((state) => state.phrase);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const [openSheet, setOpenSheet] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    phrase: "",
    meaning: "",
    audioUrl: "",
  });
  const [audioPlaying, setAudioPlaying] = useState(null);

  useEffect(() => {
    dispatch(getPhrases());
  }, [dispatch]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.append("audio", file);
      dispatch(uploadAudioPhrase(data)).then((res) => {
        if (res?.payload?.success) {
          setFormData({ ...formData, audioUrl: res?.payload?.data.url });
          setIsUploading(false);
        }
      });
    }
  }, [file]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    dispatch(createPhrase(formData)).then((res) => {
      if (res?.payload?.success) {
        setFormData({
          phrase: "",
          meaning: "",
          audioUrl: "",
        });
        setOpenSheet(false);
        dispatch(getPhrases());
      }
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Phrase?")) {
       dispatch(deletePhrase(id));
      dispatch(getPhrases());
    }
  };

  const playAudio = (audioUrl) => {
    if (audioPlaying === audioUrl) {
      // If the same audio is playing, stop it
      setAudioPlaying(null);
    } else {
      setAudioPlaying(audioUrl);
      new Audio(audioUrl).play();
    }
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className=" font-bold text-amber-900 md:text-3xl">
            Akan Phrases Management
          </h1>
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Upload Phrase
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[500px]">
              <SheetHeader>
                <SheetTitle className="text-amber-900">
                  Upload New Phrase
                </SheetTitle>
              </SheetHeader>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 p-4">
                <div>
                  <Label htmlFor="letter" className="text-amber-800">
                    Phrase
                  </Label>
                  <Input
                    id="phrase"
                    name="phrase"
                    value={formData.phrase}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="eg. Bra bɛ da"
                  />
                </div>
                <div>
                  <Label htmlFor="meaning" className="text-amber-800">
                    Meaning
                  </Label>
                  <Input
                    id="meaning"
                    name="meaning"
                    value={formData.meaning}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="audio" className="text-amber-800">
                    Audio File
                  </Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Label
                      htmlFor="audio"
                      className="cursor-pointer bg-amber-100 text-amber-800 px-4 py-2 rounded-md hover:bg-amber-200 transition-colors flex items-center"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {file ? file.name : "Choose file"}
                    </Label>
                    <Input
                      id="audio"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {file && (
                      <span className="text-sm text-amber-600 flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Selected
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 mt-6"
                  disabled={isLoading || isUploading}
                >
                  {isLoading ? "Uploading..." : "Upload Phrase"}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        

        {isLoading && phrases.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : phrases.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-amber-700 text-lg">
              No phrases uploaded yet. Click "Upload Alphabet" to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {phrases.map((alphabet) => (
              <div
                key={alphabet._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-amber-900">
                        {alphabet.phrase}
                      </h2>
                      <p className="text-amber-700 mt-1">
                        meaning: {alphabet.meaning}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(alphabet._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      disabled={isLoading}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {alphabet.audioUrl && (
                  <div className="bg-amber-50 px-6 py-4 border-t border-amber-100">
                    <button
                      onClick={() => playAudio(alphabet.audioUrl)}
                      className={`flex items-center ${
                        audioPlaying === alphabet.audioUrl
                          ? "text-amber-700"
                          : "text-amber-600 hover:text-amber-800"
                      } transition-colors`}
                    >
                      <Volume2 className="h-5 w-5 mr-2" />
                      {audioPlaying === alphabet.audioUrl
                        ? "Playing..."
                        : "Play Sound"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Phrases;
