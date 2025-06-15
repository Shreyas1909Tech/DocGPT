
import { useState } from "react";
import DocumentUpload from "./DocumentUpload";
import { motion } from "framer-motion";
import { searchWithVoice } from "@/utils/api";
import { toast } from "sonner";

const SearchDocument = () => {
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState<{
    transcribed_keyword?: string;
    search_result?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartRecording = () => {
    // In a real implementation, this would use the Web Audio API
    // For demo purposes, we'll just toggle the state
    setIsRecording(true);
    
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      // In a real implementation, this would be a blob from the recording
      toast.success("Audio recording completed");
    }, 3000);
  };

  const handleSearch = async () => {
    if (!documentFile || !audioFile) {
      toast.error("Please upload both document and audio files");
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchWithVoice(audioFile, documentFile);
      
      if (response.error) {
        toast.error(response.error);
      } else {
        setResult({
          transcribed_keyword: response.transcribed_keyword,
          search_result: response.search_result
        });
        toast.success("Search completed successfully!");
      }
    } catch (error) {
      toast.error("An error occurred during search");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Voice Search in Documents</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Upload a document and record a voice query or upload an audio file to search for keywords within your document.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Upload Document</h3>
            <DocumentUpload 
              onFileChange={(file) => setDocumentFile(file)} 
              label="Upload document to search"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Voice Query</h3>
            <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-xl p-8 transition-all flex flex-col items-center justify-center h-full">
              {audioFile ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium mb-2">{audioFile.name}</p>
                  <p className="text-sm text-foreground/60">Audio file ready</p>
                  <button 
                    onClick={() => setAudioFile(null)}
                    className="mt-4 text-sm text-primary underline hover:text-primary/80"
                  >
                    Remove audio
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-center text-lg font-medium mb-2">
                    Record or Upload Audio
                  </p>
                  <p className="text-center text-sm text-foreground/60 mb-6">
                    Speak your query or upload an audio file
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={handleStartRecording}
                      className={`px-4 py-2 rounded-full ${
                        isRecording
                          ? "bg-red-500 text-white animate-pulse"
                          : "bg-secondary text-foreground"
                      } hover:bg-primary/20 transition-colors`}
                    >
                      {isRecording ? "Recording..." : "Record Voice"}
                    </button>
                    <label className="px-4 py-2 rounded-full bg-secondary text-foreground hover:bg-primary/20 transition-colors cursor-pointer">
                      Upload Audio
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setAudioFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center my-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            disabled={isLoading || !documentFile || !audioFile}
            className={`px-8 py-3 rounded-full font-medium flex items-center gap-2 button-shine ${
              isLoading || !documentFile || !audioFile
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-white hover:shadow-lg hover:shadow-primary/20"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              <>Search Document</>
            )}
          </motion.button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 glass p-6 rounded-xl"
          >
            <h3 className="text-lg font-medium mb-4">Search Results</h3>
            {result.transcribed_keyword && (
              <div className="mb-4">
                <p className="text-sm text-foreground/70 mb-1">Transcribed query:</p>
                <div className="bg-secondary p-3 rounded-lg text-foreground font-medium">
                  "{result.transcribed_keyword}"
                </div>
              </div>
            )}
            {result.search_result && (
              <div>
                <p className="text-sm text-foreground/70 mb-1">Result:</p>
                <div className="bg-secondary p-3 rounded-lg">
                  {result.search_result}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchDocument;
