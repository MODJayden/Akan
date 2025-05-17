import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDictionaryEntry,
  getDictionaryEntries,
  updateDictionaryEntry,
} from "@/store/Dictionary";
import {
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const ReviewDictionary = () => {
  const dispatch = useDispatch();
  const { entries, isLoading } = useSelector((state) => state.dictionary);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const pendingEntries = entries.filter((entry) => entry.status === "pending");

  useEffect(() => {
    dispatch(getDictionaryEntries());
  }, [dispatch]);

  const handleStatusChange = async () => {
    if (!selectedEntry || !selectedStatus) return;

    setIsUpdating(true);
    try {
       dispatch(
        updateDictionaryEntry({
          id: selectedEntry._id,
          entryData: selectedEntry,
        })
      ).then(() => {
        toast.success("Entry updated successfully");
        setExpandedCard(null); // Close the card after update
      });
    } catch (error) {
      toast.error("Failed to update entry");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
       dispatch(deleteDictionaryEntry(id)).then(() => {
        toast.success("Entry deleted successfully");
      });
    } catch (error) {
      toast.error("Failed to delete entry");
    } finally {
      setIsDeleting(false);
    }
  };
  

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-amber-900 mb-6">
          Review Dictionary Entries
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
          </div>
        ) : pendingEntries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-800 text-lg">
              No pending entries to review
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingEntries.map((entry) => (
              <div
                key={entry._id}
                className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden transition-all duration-200"
              >
                <div
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-amber-50"
                  onClick={() => toggleExpand(entry._id)}
                >
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="font-bold text-amber-900 text-lg">
                        {entry.twi}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-amber-600 border-amber-300"
                      >
                        {entry.partOfSpeech}
                      </Badge>
                    </div>
                    <p className="text-amber-800 mt-1">{entry.english}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-500 text-sm">
                      {expandedCard === entry._id ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </span>
                  </div>
                </div>

                {expandedCard === entry._id && (
                  <div className="p-4 pt-0 border-t border-amber-100 bg-amber-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-2">
                          Details
                        </h4>
                        <div className="space-y-2">
                          <p>
                            <span className="text-amber-700 font-medium">
                              Fante:
                            </span>{" "}
                            {entry.fante}
                          </p>
                          <p>
                            <span className="text-amber-700 font-medium">
                              Pronunciation:
                            </span>{" "}
                            {entry.pronunciation}
                          </p>
                          {entry.related?.length > 0 && (
                            <div>
                              <p className="text-amber-700 font-medium">
                                Related Terms:
                              </p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {entry.related.map((term, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-amber-600 bg-amber-100"
                                  >
                                    {term}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-amber-900 mb-2">
                          Examples
                        </h4>
                        <div className="space-y-3">
                          {entry.examples?.map((example, index) => (
                            <div
                              key={example._id}
                              className="bg-white p-3 rounded border border-amber-100"
                            >
                              <p className="text-amber-800 italic">
                                "{example.twi}"
                              </p>
                              <p className="text-amber-700 mt-1">
                                "{example.english}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-amber-200">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-amber-600 hover:bg-amber-100 flex items-center space-x-2"
                            onClick={() => {
                              setSelectedEntry(entry);
                              setSelectedStatus(entry);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                            <span>Update Status</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-amber-50">
                          <DialogHeader>
                            <DialogTitle className="text-amber-900">
                              Update Entry Status
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <p className="text-amber-800">
                                Update status for:{" "}
                                <span className="font-semibold">
                                  {entry.twi}
                                </span>
                              </p>
                              <Select
                                value={selectedStatus}
                                onValueChange={setSelectedStatus}
                              >
                                <SelectTrigger className="bg-white">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem
                                    value="approved"
                                    className="hover:bg-amber-50"
                                  >
                                    <div className="flex items-center">
                                      <Check className="h-4 w-4 mr-2 text-green-500" />
                                      Approved
                                    </div>
                                  </SelectItem>
                                  <SelectItem
                                    value="rejected"
                                    className="hover:bg-amber-50"
                                  >
                                    <div className="flex items-center">
                                      <X className="h-4 w-4 mr-2 text-red-500" />
                                      Rejected
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              className="border-amber-300"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleStatusChange}
                              disabled={isUpdating}
                              className="bg-amber-600 hover:bg-amber-700"
                            >
                              {isUpdating ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              ) : null}
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        className="text-red-600 hover:bg-red-100 flex items-center space-x-2"
                        onClick={() => handleDelete(entry._id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        <span>Delete</span>
                      </Button>
                    </div>
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

export default ReviewDictionary;
