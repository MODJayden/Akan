import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Search,
  Upload,
  Copy,
} from "lucide-react";
import {
  addDictionaryEntry,
  createWordByAdmin,
  deleteDictionaryEntry,
  getDictionaryEntries,
} from "@/store/Dictionary";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
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

const DictionaryAdmin = () => {
  const dispatch = useDispatch();
  const { entries, isLoading } = useSelector((state) => state.dictionary);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [generateCount, setGenerateCount] = useState(7);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    twi: "",
    english: "",
    definition: "",
    partOfSpeech: "noun",
    examples: { twi: "", english: "" },
    status: "pending",
    user: user?._id,
  });

  useEffect(() => {
    dispatch(getDictionaryEntries()).then((res) => {
      if (res.payload?.success) {
        console.log(res.payload.data);
      }
    });
  }, [dispatch]);

  const handleGenerate = async () => {
    try {
      await dispatch(addDictionaryEntry()).then((res) => {
        if (res.payload?.success) {
          toast.success(`Generated ${generateCount} new entries`);
          dispatch(getDictionaryEntries());
        }
      });
    } catch (error) {
      toast.error("Failed to generate entries");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExampleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      examples: { ...prev.examples, [name]: value },
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createWordByAdmin(formData)).then((res) => {
      if (res.payload?.success) {
        setSearchTerm("");
        setFormData({
          twi: "",
          english: "",
          definition: "",
          partOfSpeech: "noun",
          examples: { twi: "", english: "" },
          status: "pending",
          user: user?._id,
        });
        toast.success("Entry created successfully, please wait for approval");
        dispatch(getDictionaryEntries());
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDictionaryEntry(deleteId)).then((res) => {
        if (res.payload?.success) {
          toast.success("Entry deleted");
          dispatch(getDictionaryEntries());
        }
      });
    } catch (error) {
      toast.error("Failed to delete entry");
    }
  };
  const approvedEntry = entries.filter((entry) => entry.status === "approved");

  const filteredEntries = approvedEntry.filter(
    (entry) =>
      entry.twi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.english.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleselectId = (id) => {
    setDeleteId(id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-amber-700 mb-6">
        Dictionary Generator
      </h1>

      {/* Search and Generate Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" />
          <Input
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-amber-300 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Sheet>
            {isAuthenticated ? (
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" /> Suggest a Word
                </Button>
              </SheetTrigger>
            ) : (
              <Button variant="outline">
                <Link to="/login" className="flex justify-center items-center">
                  <Upload className="h-4 w-4 mr-2" /> Suggest a Word
                </Link>
              </Button>
            )}
            <SheetContent className="sm:max-w-md">
              <div className="p-8 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Suggest a Dictionary Entry</SheetTitle>
                  <p className="text-sm text-muted-foreground">
                    Help us grow the dictionary by suggesting new words or
                    corrections
                  </p>
                </SheetHeader>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 max-w-2xl mx-auto"
                >
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="twi">Twi Word</Label>
                      <Input
                        id="twi"
                        name="twi"
                        value={formData.twi}
                        onChange={handleChange}
                        placeholder="Enter word in Twi"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="english">English Word</Label>
                      <Input
                        id="english"
                        name="english"
                        value={formData.english}
                        onChange={handleChange}
                        placeholder="Enter word in English"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="definition">Definition</Label>
                      <Input
                        id="definition"
                        name="definition"
                        value={formData.definition}
                        onChange={handleChange}
                        placeholder="Enter definition"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="partOfSpeech">Part of Speech</Label>
                      <Select
                        value={formData.partOfSpeech}
                        onValueChange={(value) =>
                          handleSelectChange("partOfSpeech", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select part of speech" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="interjection">
                            Interjection
                          </SelectItem>
                          <SelectItem value="noun">Noun</SelectItem>
                          <SelectItem value="verb">Verb</SelectItem>
                          <SelectItem value="adjective">Adjective</SelectItem>
                          <SelectItem value="adverb">Adverb</SelectItem>
                          <SelectItem value="pronoun">Pronoun</SelectItem>
                          <SelectItem value="preposition">
                            Preposition
                          </SelectItem>
                          <SelectItem value="conjunction">
                            Conjunction
                          </SelectItem>
                          <SelectItem value="determiner">Determiner</SelectItem>
                          <SelectItem value="numeral">Numeral</SelectItem>
                          <SelectItem value="phrase">Phrase</SelectItem>
                          <SelectItem value="idiom">Idiom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-4 border p-4 rounded-lg">
                      <h3 className="font-medium">Example</h3>
                      <div className="grid gap-2">
                        <Label htmlFor="example-twi">Twi Example</Label>
                        <Input
                          id="example-twi"
                          name="twi"
                          value={formData.examples.twi}
                          onChange={handleExampleChange}
                          placeholder="Enter example in Twi"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="example-english">English Example</Label>
                        <Input
                          id="example-english"
                          name="english"
                          value={formData.examples.english}
                          onChange={handleExampleChange}
                          placeholder="Enter example in English"
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          handleSelectChange("status", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full mt-6">
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </SheetContent>
          </Sheet>

          <Button
            onClick={handleGenerate}
            className="bg-amber-600 hover:bg-amber-700 text-white"
            disabled={isLoading}
          >
            <Plus className="mr-2 h-4 w-4" />
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-amber-600">
            {searchTerm
              ? "No matching entries found"
              : "No entries yet. Generate some!"}
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div
              key={entry._id}
              className="border border-amber-200 rounded-lg overflow-hidden"
            >
              <div
                className="flex justify-between items-center p-4 bg-amber-50 cursor-pointer"
                onClick={() =>
                  setExpandedCard(expandedCard === entry._id ? null : entry._id)
                }
              >
                <div>
                  <h3 className="font-medium text-amber-800">{entry.twi}</h3>
                  <p className="text-sm text-amber-600">{entry.english}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleselectId(entry._id);
                        }}
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

                  {expandedCard === entry._id ? (
                    <ChevronUp className="h-5 w-5 text-amber-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              </div>

              {expandedCard === entry._id && (
                <div className="p-4 border-t border-amber-100 bg-white">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-amber-700">
                        Pronunciation
                      </p>
                      <p>{entry.pronunciation || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-700">
                        Part of Speech
                      </p>
                      <p className="capitalize">{entry.partOfSpeech}</p>
                    </div>
                  </div>
                  {entry.examples?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-amber-700 mb-1">
                        Examples
                      </p>
                      <div className="space-y-2">
                        {entry.examples.map((example, idx) => (
                          <div key={idx} className="text-sm">
                            <p className="font-medium">{example.twi}</p>
                            <p className="text-amber-600">{example.english}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DictionaryAdmin;
