import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Search,
  Volume2,
  Bookmark,
  List,
  Map,
  Info,
  ChevronDown,
  ChevronRight,
  Play,
  Upload,
  Check,
  X,
  Star,
  Pause,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createWordByUser, getDictionaryEntries } from "@/store/Dictionary";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPhrases } from "@/store/Phrases";

const Dictionary = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("twi");
  const [savedWords, setSavedWords] = useState(() => {
    const storedWords = localStorage.getItem("savedWords");
    return storedWords ? JSON.parse(storedWords) : [];
  });
  const [savedPhrases, setSavedPhrases] = useState(() => {
    const storedPhrases = localStorage.getItem("savedPhrases");
    return storedPhrases ? JSON.parse(storedPhrases) : [];
  });
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { isLoading, entries } = useSelector((state) => state.dictionary);
  const [audioPlaying, setAudioPlaying] = useState(null);
  const { phrases } = useSelector((state) => state.phrase);  
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
    dispatch(getDictionaryEntries());
    dispatch(getPhrases());
  }, [dispatch]);

  const ApprovedEntries = entries?.filter(
    (entry) => entry.status === "approved"
  );

  // Filter entries based on search query
  const filteredEntries = ApprovedEntries.filter(
    (entry) =>
      entry.twi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.fante &&
        entry.fante.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Mock upload simulation
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Remove saved word
  const removeSavedPhrase = (wordToRemove) => {
    const updatedSavedWords = savedPhrases.filter(
      (word) => word !== wordToRemove
    );
    setSavedPhrases(updatedSavedWords);
    localStorage.setItem("savedPhrases", JSON.stringify(updatedSavedWords));
  };
  const removeSavedWord = (wordToRemove) => {
    const updatedSavedWords = savedWords.filter(
      (word) => word !== wordToRemove
    );
    setSavedWords(updatedSavedWords);
    localStorage.setItem("savedWords", JSON.stringify(updatedSavedWords));
  };

  // Toggle saved word
  const toggleSavedWord = (word) => {
    const isSaved = savedWords.includes(word);
    const updatedSavedWords = isSaved
      ? savedWords.filter((w) => w !== word)
      : [...savedWords, word];
    setSavedWords(updatedSavedWords);
    localStorage.setItem("savedWords", JSON.stringify(updatedSavedWords));
  };
  const toggleSavedPhrase = (word) => {
    const isSaved = savedPhrases.includes(word);
    const updatedSavedWords = isSaved
      ? savedWords.filter((w) => w !== word)
      : [...savedPhrases, word];
    setSavedPhrases(updatedSavedWords);
    localStorage.setItem("savedPhrases", JSON.stringify(updatedSavedWords));
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
    dispatch(createWordByUser(formData)).then((res) => {
      if (res.payload?.success) {
        toast.success("Entry created");
        dispatch(getDictionaryEntries());
      }
    });
  };

  const playAudio = (audioUrl) => {
    if (audioPlaying === audioUrl) {
      setAudioPlaying(null);
    } else {
      setAudioPlaying(audioUrl);
      new Audio(audioUrl).play();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-amber-700">Loading dictionary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen   ">
      {/* Main Content */}
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search in Twi, Fante, or English..."
              className="pl-9 pr-10 text-base h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showAdvancedSearch ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>

          {/* Advanced Search */}
          {showAdvancedSearch && (
            <Card className="p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Dialect
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">All Dialects</option>
                    <option value="twi">Twi</option>
                    <option value="fante">Fante</option>
                    <option value="other">Other Akan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Part of Speech
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">All Types</option>
                    <option value="noun">Noun</option>
                    <option value="verb">Verb</option>
                    <option value="adjective">Adjective</option>
                    <option value="phrase">Phrase</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">All Statuses</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </Card>
          )}

          {/* Dialect Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="twi">Twi</TabsTrigger>
           
            </TabsList>
          </Tabs>
        </div>

        {/* Dictionary Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Dictionary List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <Card
                  key={entry._id}
                  className={`hover:shadow-md transition-shadow ${
                    selectedWord === entry._id
                      ? "border-amber-300 bg-amber-50"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedWord(
                      entry._id === selectedWord ? null : entry._id
                    )
                  }
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {entry.twi}{" "}
                          {entry.fante &&
                            entry.fante !== entry.twi &&
                            `(${entry.fante})`}
                        </CardTitle>
                        <CardDescription className="text-lg">
                          {entry.english}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSavedWord(entry.twi);
                        }}
                      >
                        <Star
                          className={`h-5 w-5 ${
                            savedWords.includes(entry.twi)
                              ? "fill-amber-500 text-amber-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className="text-amber-600 capitalize"
                      >
                        {entry.partOfSpeech}
                      </Badge>
                      <Badge variant="outline">
                        <Volume2 className="h-3 w-3 mr-1" />{" "}
                        {entry.pronunciation}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          entry.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : entry.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {entry.status}
                      </Badge>
                    </div>

                    {selectedWord === entry._id && (
                      <div className="space-y-4 mt-4">
                        {/* Examples */}
                        <div>
                          <h4 className="font-medium mb-2">Examples</h4>
                          <div className="space-y-3">
                            {entry.examples.map((example, idx) => (
                              <div
                                key={example._id || idx}
                                className="bg-amber-50 rounded-lg p-3"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{example.twi}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {example.english}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <Play className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Related Words */}
                        {entry.related && entry.related.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Related Words</h4>
                            <div className="flex flex-wrap gap-2">
                              {entry.related.map((word, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-amber-100"
                                >
                                  {word}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No results found</CardTitle>
                  <CardDescription>
                    Try a different search term or contribute a new word
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Sheet>
                    {isAuthenticated ? (
                      <SheetTrigger asChild>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" /> Suggest a Word
                        </Button>
                      </SheetTrigger>
                    ) : (
                      <Button variant="outline">
                        <Link
                          to="/login"
                          className="flex justify-center items-center"
                        >
                          {" "}
                          <Upload className="h-4 w-4 mr-2" /> Suggest a Word
                        </Link>
                      </Button>
                    )}
                    <SheetContent className="sm:max-w-md">
                      <div className="p-8 overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>Suggest a Dictionary Entry</SheetTitle>
                          <p className="text-sm text-muted-foreground">
                            Help us grow the dictionary by suggesting new words
                            or corrections
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
                              <Label htmlFor="partOfSpeech">
                                Part of Speech
                              </Label>
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
                                  <SelectItem value="adjective">
                                    Adjective
                                  </SelectItem>
                                  <SelectItem value="adverb">Adverb</SelectItem>
                                  <SelectItem value="pronoun">
                                    Pronoun
                                  </SelectItem>
                                  <SelectItem value="preposition">
                                    Preposition
                                  </SelectItem>
                                  <SelectItem value="conjunction">
                                    Conjunction
                                  </SelectItem>
                                  <SelectItem value="determiner">
                                    Determiner
                                  </SelectItem>
                                  <SelectItem value="numeral">
                                    Numeral
                                  </SelectItem>
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
                                <Label htmlFor="example-english">
                                  English Example
                                </Label>
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
                                  <SelectItem value="pending">
                                    Pending
                                  </SelectItem>
                                  <SelectItem value="approved">
                                    Approved
                                  </SelectItem>
                                  <SelectItem value="rejected">
                                    Rejected
                                  </SelectItem>
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
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved Words */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-amber-600" /> Saved Words
                </CardTitle>
                <CardDescription>Your personal vocabulary list</CardDescription>
              </CardHeader>
              <CardContent>
                {savedWords.length > 0 ? (
                  <div className="space-y-2">
                    {savedWords.map((word, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 hover:bg-amber-50 rounded"
                      >
                        <span>{word}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeSavedWord(word)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Save words by clicking the star icon
                  </p>
                )}
              </CardContent>
              {savedWords.length > 0 && (
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Create Practice List
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* Saved Phrase */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-amber-600" /> Saved Phrases
                </CardTitle>
                <CardDescription>Your personal vocabulary list</CardDescription>
              </CardHeader>
              <CardContent>
                {savedPhrases.length > 0 ? (
                  <div className="space-y-2">
                    {savedPhrases.map((word, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 hover:bg-amber-50 rounded"
                      >
                        <span>{word}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeSavedPhrase(word)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Save words by clicking the star icon
                  </p>
                )}
              </CardContent>
              {savedWords.length > 0 && (
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Create Practice List
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* Common Phrases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="h-5 w-5 text-amber-600" /> Common Phrases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.isArray(phrases) && phrases.length > 0 ? (
                  phrases.slice(0, 4).map((phrase) => (
                    <Collapsible key={phrase._id}>
                      <div className="flex justify-between items-center p-2 hover:bg-amber-50 rounded">
                        <div>
                          <p className="font-medium">{phrase.phrase}</p>
                          <p className="text-sm text-muted-foreground">
                            {phrase.meaning}
                          </p>
                        </div>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="px-2 pb-2">
                        <div className="bg-amber-50 rounded-lg p-3 text-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => playAudio(phrase.audioUrl)}
                            >
                              {audioPlaying === phrase.audioUrl ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleSavedPhrase(phrase.phrase)}
                            >
                              <Star
                                className={`h-4 w-4 mr-2 ${
                                  savedPhrases.includes(phrase.twi)
                                    ? "fill-amber-500 text-amber-500"
                                    : ""
                                }`}
                              />
                              Save
                            </Button>
                          </div>
                          {phrase.pronunciation && (
                            <p className="text-muted-foreground">
                              Pronunciation: {phrase.pronunciation}
                            </p>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No phrases found
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Phrases
                </Button>
              </CardFooter>
            </Card>

            {/* Common Words */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
