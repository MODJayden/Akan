import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateVocabs, getVocabs } from "@/store/Exercise";
import { generateFillIn, getFillIns } from "@/store/Fillin";
import { generateSentence, getSentences } from "@/store/Sentence";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, PlusCircle, BookOpen, Edit, CheckCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

const UploadExercise = () => {
  const dispatch = useDispatch();
  const { sentences, isLoading: sentenceLoading } = useSelector(
    (state) => state.sentence
  );
  const { vocabs, isLoading: vocabLoading } = useSelector(
    (state) => state.vocabs
  );
  const { fillins, isLoading: fillInLoading } = useSelector(
    (state) => state.fillIn
  );

  const [openSheet, setOpenSheet] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  console.log(fillins);

  const handleVocabGenerate = () => {
    dispatch(generateVocabs({ level: selectedLevel })).then((res) => {
      if (res?.payload?.success) {
        setOpenSheet(false);
        dispatch(getVocabs());
      } else {
        setOpenSheet(false);
      }
    });
  };

  const handleSentenceGenerate = () => {
    dispatch(generateSentence({ level: selectedLevel })).then((res) => {
      if (res?.payload?.success) {
        setOpenSheet(false);
        dispatch(getSentences());
      } else {
        setOpenSheet(false);
      }
    });
  };

  const handleFillinGenerate = () => {
    dispatch(generateFillIn({ level: selectedLevel })).then((res) => {
      if (res?.payload?.success) {
        setOpenSheet(false);
        dispatch(getFillIns());
      } else {
        setOpenSheet(false);
      }
    });
  };

 

  useEffect(() => {
    dispatch(getSentences());
    dispatch(getVocabs());
    dispatch(getFillIns());
  }, [dispatch]);

  const levels = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-900 mb-8">
          Exercise Generator
        </h1>

        {/* Generation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            onClick={() => setOpenSheet("vocab")}
            className="bg-amber-600 hover:bg-amber-700 flex "
          >
            <BookOpen className="h-6 w-6" />
            <span>Vocabulary Matching</span>
          </Button>

          <Button
            onClick={() => setOpenSheet("sentence")}
            className="bg-amber-600 hover:bg-amber-700   flex   gap-2"
          >
            <Edit className="h-6 w-6" />
            <span>Sentence Construction</span>
          </Button>

          <Button
            onClick={() => setOpenSheet("fillin")}
            className="bg-amber-600 hover:bg-amber-700  flex   gap-2"
          >
            <PlusCircle className="h-6 w-6" />
            <span>Fill in the Blank</span>
          </Button>
        </div>

        {/* Generated Exercises */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-amber-900 mb-4">
            Generated Exercises
          </h2>

          {/* Vocabulary Exercises */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="text-amber-600" />
              <h3 className="font-medium text-amber-800">
                Vocabulary Matching
              </h3>
            </div>
            {vocabs?.length === 0 ? (
              <p className="text-amber-700 italic">
                No vocabulary exercises generated yet
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(vocabs) &&
                  vocabs?.length > 0 &&
                  vocabs?.map((vocabSet, index) => (
                    <div
                      key={index}
                      className="border border-amber-200 rounded-lg p-4 bg-amber-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">
                          {vocabSet.level}
                        </span>
                        <span className="text-xs text-amber-600">
                          {vocabSet?.vocabs?.length} items
                        </span>
                      </div>
                      <ScrollArea className="h-40 pr-2">
                        {vocabSet?.vocabs?.slice(0, 3).map((vocab, idx) => (
                          <div key={idx} className="mb-2">
                            <p className="text-sm font-medium">
                              {vocab.question}
                            </p>
                            <p className="text-xs text-amber-600">
                              Correct: {vocab.options[vocab.correctAnswer]}
                            </p>
                          </div>
                        ))}
                        {vocabSet.vocabs.length > 3 && (
                          <p className="text-xs text-amber-500 mt-1">
                            +{vocabSet.vocabs.length - 3} more...
                          </p>
                        )}
                      </ScrollArea>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Sentence Exercises */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Edit className="text-amber-600" />
              <h3 className="font-medium text-amber-800">
                Sentence Construction
              </h3>
            </div>
            {Array.isArray(sentences) && sentences?.length === 0 ? (
              <p className="text-amber-700 italic">
                No sentence exercises generated yet
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(sentences) &&
                  sentences?.length > 0 &&
                  sentences?.map((sentenceSet, index) => (
                    <div
                      key={index}
                      className="border border-amber-200 rounded-lg p-4 bg-amber-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">
                          {sentenceSet.level}
                        </span>
                        <span className="text-xs text-amber-600">
                          {sentenceSet?.sentenceTemplates?.length} items
                        </span>
                      </div>
                      <ScrollArea className="h-40 pr-2">
                        {sentenceSet.sentenceTemplates
                          .slice(0, 3)
                          .map((sentence, idx) => (
                            <div key={idx} className="mb-2">
                              <p className="text-sm font-medium">
                                {sentence.question}
                              </p>
                              <p className="text-xs text-amber-600">
                                Answer: {sentence.correctSentence}
                              </p>
                            </div>
                          ))}
                        {sentenceSet?.sentenceTemplates?.length > 3 && (
                          <p className="text-xs text-amber-500 mt-1">
                            +{sentenceSet?.sentenceTemplates?.length - 3}{" "}
                            more...
                          </p>
                        )}
                      </ScrollArea>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Fill-in Exercises */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <PlusCircle className="text-amber-600" />
              <h3 className="font-medium text-amber-800">Fill in the Blank</h3>
            </div>
            {Array.isArray(fillins) && fillins?.length === 0 ? (
              <p className="text-amber-700 italic">
                No fill-in exercises generated yet
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(fillins) &&
                  fillins?.length > 0 &&
                  fillins?.map((fillinSet, index) => (
                    <div
                      key={index}
                      className="border border-amber-200 rounded-lg p-4 bg-amber-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">
                          {fillinSet?.level}
                        </span>
                        <span className="text-xs text-amber-600">
                          {fillinSet?.sentenceTemplates?.length} items
                        </span>
                      </div>
                      <ScrollArea className="h-40 pr-2">
                        {fillinSet?.sentenceTemplates
                          ?.slice(0, 3)
                          ?.map((fillin, idx) => (
                            <div key={idx} className="mb-2">
                              <p className="text-sm font-medium">
                                {fillin?.question}
                              </p>
                              <p className="text-xs text-amber-600">
                                Correct:{" "}
                                {fillin?.options[fillin?.correctAnswer]}
                              </p>
                            </div>
                          ))}
                        {fillinSet?.vocabs?.length > 3 && (
                          <p className="text-xs text-amber-500 mt-1">
                            +{fillinSet?.vocabs?.length - 3} more...
                          </p>
                        )}
                      </ScrollArea>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generation Sheets */}
      {/* Vocabulary Sheet */}
      <Sheet
        open={openSheet === "vocab"}
        onOpenChange={(open) => !open && setOpenSheet(null)}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-amber-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Generate Vocabulary Exercises
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-4 p-4">
            <Select onValueChange={(value) => setSelectedLevel(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select difficulty level" />
              </SelectTrigger>
              <SelectContent>
                {levels?.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level?.charAt(0).toUpperCase() + level?.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleVocabGenerate}
              disabled={vocabLoading || !selectedLevel}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {vocabLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Vocabulary Exercises"
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sentence Sheet */}
      <Sheet
        open={openSheet === "sentence"}
        onOpenChange={(open) => !open && setOpenSheet(null)}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-amber-900 flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Generate Sentence Exercises
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-4 p-4">
            <Select onValueChange={(value) => setSelectedLevel(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select difficulty level" />
              </SelectTrigger>
              <SelectContent>
                {levels?.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level?.charAt(0).toUpperCase() + level?.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleSentenceGenerate}
              disabled={sentenceLoading || !selectedLevel}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {sentenceLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Sentence Exercises"
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Fill-in Sheet */}
      <Sheet
        open={openSheet === "fillin"}
        onOpenChange={(open) => !open && setOpenSheet(null)}
      >
        <SheetContent>
          <div className="p-4">
            <SheetHeader>
              <SheetTitle className="text-amber-900 flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Generate Fill-in Exercises
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">
              <Select onValueChange={(value) => setSelectedLevel(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  {levels?.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level?.charAt(0).toUpperCase() + level?.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleFillinGenerate}
                disabled={fillInLoading || !selectedLevel}
                className="bg-amber-600 hover:bg-amber-700"
              >
                {fillInLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Fill-in Exercises"
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default UploadExercise;
