import React, { useState } from "react";
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

const Dictionary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("twi");
  const [savedWords, setSavedWords] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);

  // Mock dictionary data
  const dictionaryEntries = [
    {
      id: 1,
      twi: "Akwaaba",
      fante: "Akwaaba",
      english: "Welcome",
      pronunciation: "/a-kwaa-ba/",
      etymology: "From 'akwa' (to receive) + 'aba' (visitors)",
      partOfSpeech: "interjection",
      examples: [
        {
          twi: "Akwaaba wo fie!",
          english: "Welcome to our home!",
          dialect: "Twi",
        },
        {
          twi: "Akwaaba wɔ Ghana!",
          english: "Welcome to Ghana!",
          dialect: "Fante",
        },
      ],
      related: ["Ɛte sɛn?", "Meda wo ase"],
      adinkra: "Sankofa",
    },
    {
      id: 2,
      twi: "Nsuo",
      fante: "Nsu",
      english: "Water",
      pronunciation: "/n-su-o/",
      etymology: "Proto-Bantu '*-jijʊ̀",
      partOfSpeech: "noun",
      examples: [
        {
          twi: "Mepɛ sɛ mema nsuo",
          english: "I want to drink water",
          dialect: "Twi",
        },
      ],
      related: ["Nsuom", "Nsuo tɔn"],
      adinkra: "Nsaa",
    },
    {
      id: 3,
      twi: "Ɛte sɛn?",
      fante: "Ɛte sɛn?",
      english: "How are you?",
      pronunciation: "/eh-teh sen/",
      partOfSpeech: "phrase",
      examples: [
        {
          twi: "Ɛte sɛn? Me ho yɛ",
          english: "How are you? I'm fine",
          dialect: "Twi",
        },
      ],
      related: ["Akwaaba", "Wo ho te sɛn?"],
    },
  ];

  // Filter entries based on search query
  const filteredEntries = dictionaryEntries.filter(
    (entry) =>
      entry.twi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.fante.toLowerCase().includes(searchQuery.toLowerCase())
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

  // Toggle saved word
  const toggleSavedWord = (word) => {
    setSavedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center">
        <div className="max-w-7xl mx-auto text-center bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Akan Dictionary
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 max-w-3xl mx-auto">
            Explore words and phrases in Twi, Fante, and English with
            pronunciation guides
          </p>
        </div>
      </section>

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
                    Adinkra Symbol
                  </label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">All Symbols</option>
                    <option value="sankofa">Sankofa</option>
                    <option value="gye_nyame">Gye Nyame</option>
                    <option value="nsaa">Nsaa</option>
                  </select>
                </div>
              </div>
            </Card>
          )}

          {/* Dialect Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="twi">Twi</TabsTrigger>
              <TabsTrigger value="fante">Fante</TabsTrigger>
              <TabsTrigger value="english">English</TabsTrigger>
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
                  key={entry.id}
                  className={`hover:shadow-md transition-shadow ${
                    selectedWord === entry.id
                      ? "border-amber-300 bg-amber-50"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedWord(entry.id === selectedWord ? null : entry.id)
                  }
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {entry.twi}{" "}
                          {entry.fante !== entry.twi && `(${entry.fante})`}
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
                      <Badge variant="outline" className="text-amber-600">
                        {entry.partOfSpeech}
                      </Badge>
                      <Badge variant="outline">
                        <Volume2 className="h-3 w-3 mr-1" />{" "}
                        {entry.pronunciation}
                      </Badge>
                      {entry.adinkra && (
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-800"
                        >
                          {entry.adinkra} symbol
                        </Badge>
                      )}
                    </div>

                    {selectedWord === entry.id && (
                      <div className="space-y-4 mt-4">
                        {/* Etymology */}
                        {entry.etymology && (
                          <div>
                            <h4 className="font-medium mb-1 flex items-center">
                              <Info className="h-4 w-4 mr-2 text-amber-600" />{" "}
                              Etymology
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {entry.etymology}
                            </p>
                          </div>
                        )}

                        {/* Examples */}
                        <div>
                          <h4 className="font-medium mb-2">Examples</h4>
                          <div className="space-y-3">
                            {entry.examples.map((example, idx) => (
                              <div
                                key={idx}
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
                                <div className="text-xs text-amber-600 mt-1">
                                  {example.dialect} dialect
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
                    <SheetTrigger asChild>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" /> Suggest a Word
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="sm:max-w-md">
                      <SheetHeader>
                        <SheetTitle>Suggest a Dictionary Entry</SheetTitle>
                        <p className="text-sm text-muted-foreground">
                          Help us grow the dictionary by suggesting new words or
                          corrections
                        </p>
                      </SheetHeader>

                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Word (Twi)
                          </label>
                          <Input placeholder="Enter the word in Twi" />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Word (Fante)
                          </label>
                          <Input placeholder="Enter the word in Fante" />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            English Meaning
                          </label>
                          <Input placeholder="Enter the English translation" />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Pronunciation
                          </label>
                          <Input placeholder="Example: /a-kwaa-ba/" />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Example Sentence
                          </label>
                          <textarea
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                            placeholder="Provide an example sentence in context..."
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Your Email (optional)
                          </label>
                          <Input placeholder="We'll contact you if we have questions" />
                        </div>
                      </div>

                      <SheetFooter>
                        <Button
                          type="submit"
                          className="w-full bg-amber-600 hover:bg-amber-700"
                        >
                          Submit Suggestion
                        </Button>
                      </SheetFooter>
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
                          onClick={() => toggleSavedWord(word)}
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

            {/* Dialect Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-amber-600" /> Akan Dialect Map
                </CardTitle>
                <CardDescription>
                  Regions where Akan languages are spoken
                </CardDescription>
              </CardHeader>
              <CardContent className="h-48 bg-amber-50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  Interactive map would appear here
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore Map
                </Button>
              </CardFooter>
            </Card>

            {/* Common Phrases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="h-5 w-5 text-amber-600" /> Common Phrases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { twi: "Ɛte sɛn?", english: "How are you?" },
                  { twi: "Me ho yɛ", english: "I'm fine" },
                  { twi: "Meda wo ase", english: "Thank you" },
                  { twi: "Mepa wo kyɛw", english: "Please" },
                ].map((phrase, index) => (
                  <Collapsible key={index}>
                    <div className="flex justify-between items-center p-2 hover:bg-amber-50 rounded">
                      <div>
                        <p className="font-medium">{phrase.twi}</p>
                        <p className="text-sm text-muted-foreground">
                          {phrase.english}
                        </p>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="px-2 pb-2">
                      <div className="bg-amber-50 rounded-lg p-3 text-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Button variant="outline" size="sm">
                            <Play className="h-4 w-4 mr-2" /> Listen
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleSavedWord(phrase.twi)}
                          >
                            <Star
                              className={`h-4 w-4 mr-2 ${
                                savedWords.includes(phrase.twi)
                                  ? "fill-amber-500 text-amber-500"
                                  : ""
                              }`}
                            />
                            Save
                          </Button>
                        </div>
                        <p className="text-muted-foreground">
                          Pronunciation: /eh-teh sen/
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Phrases
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
