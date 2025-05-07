
import { generateLesson } from "@/store/Lesson";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLesson } from "@/store/Lesson";
import { BookOpen, ChevronDown, ChevronUp, Volume2 } from "lucide-react";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const UploadLessons = () => {
  const [formData, setFormData] = useState({
    topic: "",
    level: "Beginner",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const { lessons } = useSelector((state) => state.lesson);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLesson()).then((res) => {
      if (res?.payload?.success) {
        setIsLoading(false);
        console.log(res);
      }
    });
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    dispatch(generateLesson(formData)).then((res) => {
      if (res?.payload?.success) {
        setIsGenerating(false);
        setSheetOpen(false);
      } else {
        console.log("something went wrong");
      }
    });
  };

  const toggleLesson = (lessonId) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const playPronunciation = (word) => {
    // This would call a text-to-speech API in a real implementation
    console.log("Playing pronunciation for:", word);
    setPlayingAudio(word);
    setTimeout(() => setPlayingAudio(null), 1500);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );

  return (
    <div className="max-w-2xl min-w-full p-6">
      <div className="w-full flex justify-center items-center">
        <Button variant={"outline"} onClick={() => setSheetOpen(true)}>
          Upload New Lesson
        </Button>
      </div>
      <Sheet open={sheetOpen} onOpenChange={(open) => setSheetOpen(open)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <h2 className="text-2xl font-bold mb-4">Upload New Lesson</h2>
            </SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 p-8">
            <div>
              <label className="block mb-1">Lesson Topic</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Difficulty Level</label>
              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className={`px-4 py-2 rounded text-white ${
                isGenerating ? "bg-gray-400" : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {isGenerating ? "Generating..." : "Generate Lesson"}
            </button>
          </form>
        </SheetContent>
      </Sheet>
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-amber-800 mb-2">
            Akan Language Lessons
          </h1>
          <p className="text-lg text-amber-600">
            Discover the beauty of Twi pronunciation and grammar
          </p>
        </div>

        <div className="space-y-4">
          {Array.isArray(lessons) &&
            lessons?.length > 0 &&
            lessons?.map((lesson) => (
              <div
                key={lesson._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100"
              >
                <div
                  className="p-6 cursor-pointer flex justify-between items-center hover:bg-amber-50 transition-colors"
                  onClick={() => toggleLesson(lesson._id)}
                >
                  <div className="flex items-center space-x-4 flex-wrap">
                    <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {lesson.title}
                      </h2>
                      <div className="flex space-x-3 mt-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            lesson.level === "Beginner"
                              ? "bg-blue-100 text-blue-800"
                              : lesson.level === "Intermediate"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {lesson.level}
                        </span>
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                          Lesson {lesson.order}
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedLesson === lesson._id ? (
                    <ChevronUp className="text-amber-500" />
                  ) : (
                    <ChevronDown className="text-amber-500" />
                  )}
                </div>

                {expandedLesson === lesson._id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 mb-6">{lesson.description}</p>

                    <div className="prose max-w-none">
                      {lesson?.content?.split("\n").map((paragraph, i) => (
                        <p key={i} className="mb-4 text-gray-700">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {lesson.exercises && lesson?.exercises?.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                          <span className="w-4 h-4 bg-amber-500 rounded-full mr-2"></span>
                          Practice Exercises
                        </h3>
                        <div className="space-y-4">
                          {lesson.exercises.map((exercise, index) => (
                            <div
                              key={index}
                              className="p-4 bg-gray-50 rounded-lg"
                            >
                              <p className="font-medium mb-3">
                                {exercise.question}
                              </p>
                              <ul className="space-y-2">
                                {exercise.options.map((option, i) => (
                                  <li key={i} className="flex items-center">
                                    <span
                                      className={`inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full border ${
                                        exercise.correctAnswer === i
                                          ? "border-green-500 bg-green-50"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {String.fromCharCode(65 + i)}
                                    </span>
                                    <span
                                      className={`${
                                        exercise.correctAnswer === i
                                          ? "font-medium text-green-700"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {option}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>

        <style jsx>{`
          .prose a {
            color: #d97706;
            text-decoration: underline;
          }
          .prose strong {
            color: #92400e;
          }
          .prose ul {
            list-style-type: disc;
            padding-left: 1.5rem;
            margin-bottom: 1rem;
          }
        `}</style>
      </div>
    </div>
  );
};
export default UploadLessons;
