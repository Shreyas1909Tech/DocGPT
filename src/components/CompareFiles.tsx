
import { useState } from "react";
import DocumentUpload from "./DocumentUpload";
import { motion } from "framer-motion";
import { compareFiles } from "@/utils/api";
import { toast } from "sonner";

const CompareFiles = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async () => {
    if (!file1 || !file2) {
      toast.error("Please upload both files to compare");
      return;
    }

    setIsLoading(true);
    try {
      const response = await compareFiles(file1, file2);
      
      if (response.error) {
        toast.error(response.error);
      } else {
        setResult(response.comparison_result);
        toast.success("Documents compared successfully!");
      }
    } catch (error) {
      toast.error("An error occurred during comparison");
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
          <h2 className="text-3xl font-bold mb-4">Compare Documents</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Upload two documents to identify the differences between them. Our intelligent comparison engine highlights additions, deletions, and modifications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Document 1</h3>
            <DocumentUpload 
              onFileChange={(file) => setFile1(file)} 
              label="Upload first document"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Document 2</h3>
            <DocumentUpload 
              onFileChange={(file) => setFile2(file)} 
              label="Upload second document"
            />
          </div>
        </div>

        <div className="flex justify-center my-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCompare}
            disabled={isLoading || !file1 || !file2}
            className={`px-8 py-3 rounded-full font-medium flex items-center gap-2 button-shine ${
              isLoading || !file1 || !file2
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
                Comparing...
              </>
            ) : (
              <>Compare Documents</>
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
            <h3 className="text-lg font-medium mb-4">Comparison Results</h3>
            <div className="bg-secondary p-4 rounded-lg overflow-auto max-h-96 font-mono text-sm whitespace-pre">
              {result}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CompareFiles;
