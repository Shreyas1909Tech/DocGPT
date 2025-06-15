
import { useState } from "react";
import { motion } from "framer-motion";
import { encodeText, decodeText } from "@/utils/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentUpload from "@/components/DocumentUpload";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EncodeDecode = () => {
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encode");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (uploadedFile: File) => {
    setFile(uploadedFile);
    setResult(""); // Clear previous results
  };

  const handleProcess = async () => {
    if (!file) {
      toast.error("Please upload a document to process");
      return;
    }

    setIsLoading(true);
    try {
      // Read file as text
      const text = await readFileAsText(file);
      
      const response = mode === "encode" 
        ? await encodeText(text, "base64")
        : await decodeText(text, "base64");
      
      if (response.error) {
        toast.error(response.error);
      } else {
        setResult(response.result);
        toast.success(`Document ${mode === "encode" ? "encoded" : "decoded"} successfully!`);
      }
    } catch (error) {
      toast.error(`An error occurred while ${mode === "encode" ? "encoding" : "decoding"} the document`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const clearAll = () => {
    setFile(null);
    setResult("");
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
          <Link to="/" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Home
          </Link>
          <h2 className="text-3xl font-bold mb-4">Base64 Encode & Decode Document</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Convert your document to and from Base64 format for secure communication or storage.
          </p>
        </motion.div>

        <Tabs value={mode} onValueChange={setMode} className="mb-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="glass rounded-xl p-6 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Upload Document</label>
            <DocumentUpload 
              onFileChange={handleFileChange} 
              accept=".txt,.json,.xml,.html,.csv,.md"
              label={file ? file.name : mode === "encode" ? "Upload document to encode" : "Upload document to decode"}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">
              {mode === "encode" ? "Encoded Result" : "Decoded Result"}
            </label>
            <textarea
              value={result}
              readOnly
              className="w-full h-48 p-3 bg-secondary/30 border border-border rounded-lg focus:outline-none"
              placeholder={mode === "encode" ? "Encoded text will appear here..." : "Decoded text will appear here..."}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button 
              onClick={handleProcess}
              disabled={isLoading || !file}
              className="px-6"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                mode === "encode" ? "Encode Document" : "Decode Document"
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={clearAll}
              className="px-6"
            >
              Clear
            </Button>
          </div>
        </div>

        {result && (
          <div className="text-center">
            <Button 
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(result);
                toast.success("Copied to clipboard!");
              }}
              className="text-primary hover:text-primary/80"
            >
              Copy result to clipboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncodeDecode;
