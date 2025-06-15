
import { useState } from "react";
import { motion } from "framer-motion";
import { translateText } from "@/utils/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import DocumentUpload from "@/components/DocumentUpload";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TranslateText = () => {
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("es");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "ja", name: "Japanese" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
  ];

  const handleFileChange = (uploadedFile: File) => {
    setFile(uploadedFile);
    setTranslatedText(""); // Clear previous results
  };

  const handleTranslate = async () => {
    if (!file) {
      toast.error("Please upload a document to translate");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("document_file", file);
      formData.append("target_lang", targetLang);
      
      const response = await fetch("http://localhost:5000/translate", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.error) {
        toast.error(data.error);
      } else {
        setTranslatedText(data.translated_text);
        toast.success("Document translated successfully!");
      }
    } catch (error) {
      toast.error("An error occurred during translation");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setFile(null);
    setTranslatedText("");
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
          <h2 className="text-3xl font-bold mb-4">Translate Document</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Translate your document into multiple languages with our powerful translation engine.
          </p>
        </motion.div>

        <div className="glass rounded-xl p-6 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Target Language</label>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setTargetLang(lang.code)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    targetLang === lang.code
                      ? "bg-primary text-white"
                      : "bg-secondary hover:bg-primary/20"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Upload Document</label>
            <DocumentUpload 
              onFileChange={handleFileChange} 
              accept=".txt,.json,.xml,.html,.csv,.md"
              label={file ? file.name : "Upload document to translate"}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">
              Translated Result
            </label>
            <textarea
              value={translatedText}
              readOnly
              className="w-full h-48 p-3 bg-secondary/30 border border-border rounded-lg focus:outline-none"
              placeholder="Translated text will appear here..."
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button 
              onClick={handleTranslate}
              disabled={isLoading || !file}
              className="px-6"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Translating...
                </>
              ) : "Translate Document"}
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

        {translatedText && (
          <div className="text-center">
            <Button 
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(translatedText);
                toast.success("Copied to clipboard!");
              }}
              className="text-primary hover:text-primary/80"
            >
              Copy translation to clipboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslateText;
