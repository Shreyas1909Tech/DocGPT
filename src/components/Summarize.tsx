
import { useState } from "react";
import DocumentUpload from "./DocumentUpload";
import { motion } from "framer-motion";
import { summarizeDocument } from "@/utils/api";
import { toast } from "sonner";

const Summarize = () => {
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [sentences, setSentences] = useState<number>(5);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!documentFile) {
      toast.error("Please upload a document");
      return;
    }

    setIsLoading(true);
    try {
      const response = await summarizeDocument(documentFile, sentences);
      
      if (response.error) {
        toast.error(response.error);
      } else if (response.summary) {
        setSummary(response.summary);
        toast.success("Document summarized successfully!");
      } else {
        toast.error("Unexpected response format from server");
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      toast.error("An error occurred during summarization");
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
          <h2 className="text-3xl font-bold mb-4">Document Summarization</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Upload a document to generate a concise, accurate summary of its contents using our advanced AI summarization engine.
          </p>
        </motion.div>

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Upload Document</h3>
          <DocumentUpload 
            onFileChange={(file) => setDocumentFile(file)} 
            label="Upload document to summarize"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Summary Length</h3>
          <div className="flex items-center gap-4">
            <p className="text-sm text-foreground/70 min-w-24">Number of sentences:</p>
            <input
              type="range"
              min="1"
              max="10"
              value={sentences}
              onChange={(e) => setSentences(Number(e.target.value))}
              className="flex-grow h-2 appearance-none bg-secondary rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
            <span className="bg-secondary px-3 py-1 rounded-full text-sm font-medium min-w-8 text-center">
              {sentences}
            </span>
          </div>
        </div>

        <div className="flex justify-center my-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSummarize}
            disabled={isLoading || !documentFile}
            className={`px-8 py-3 rounded-full font-medium flex items-center gap-2 button-shine ${
              isLoading || !documentFile
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
                Summarizing...
              </>
            ) : (
              <>Summarize Document</>
            )}
          </motion.button>
        </div>

        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 glass p-6 rounded-xl"
          >
            <h3 className="text-lg font-medium mb-4">Summary</h3>
            <div className="bg-secondary p-4 rounded-lg whitespace-pre-wrap">
              {summary}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Summarize;
