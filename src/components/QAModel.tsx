
import { useState } from "react";
import DocumentUpload from "./DocumentUpload";
import { motion } from "framer-motion";
import { askQuestions } from "@/utils/api";
import { toast } from "sonner";

const QAModel = () => {
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{question: string; answer: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddQuestion = () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    setQuestions([...questions, question]);
    setQuestion("");
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleAskQuestions = async () => {
    if (!documentFile) {
      toast.error("Please upload a document");
      return;
    }

    if (questions.length === 0) {
      toast.error("Please add at least one question");
      return;
    }

    setIsLoading(true);
    try {
      const response = await askQuestions(documentFile, questions);
      
      if (response.error) {
        toast.error(response.error);
      } else {
        setAnswers(response.answers);
        toast.success("Questions answered successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while processing your questions");
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
          <h2 className="text-3xl font-bold mb-4">Document Q&A</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Upload a document and ask questions to get AI-powered answers directly from the content of your document.
          </p>
        </motion.div>

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Upload Document</h3>
          <DocumentUpload 
            onFileChange={(file) => setDocumentFile(file)} 
            label="Upload document for Q&A"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Ask Questions</h3>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="flex-grow px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddQuestion();
                }
              }}
            />
            <button
              onClick={handleAddQuestion}
              className="px-4 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors button-shine"
            >
              Add
            </button>
          </div>

          {questions.length > 0 && (
            <div className="bg-secondary p-4 rounded-lg mb-6">
              <h4 className="font-medium mb-3">Your Questions:</h4>
              <ul className="space-y-2">
                {questions.map((q, index) => (
                  <li key={index} className="flex justify-between items-center bg-white/50 p-3 rounded-md">
                    <span>{q}</span>
                    <button
                      onClick={() => handleRemoveQuestion(index)}
                      className="text-foreground/50 hover:text-destructive transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-center my-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAskQuestions}
            disabled={isLoading || !documentFile || questions.length === 0}
            className={`px-8 py-3 rounded-full font-medium flex items-center gap-2 button-shine ${
              isLoading || !documentFile || questions.length === 0
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
                Processing...
              </>
            ) : (
              <>Get Answers</>
            )}
          </motion.button>
        </div>

        {answers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h3 className="text-lg font-medium mb-4">Answers</h3>
            <div className="space-y-4">
              {answers.map((item, index) => (
                <div key={index} className="glass p-6 rounded-xl">
                  <div className="mb-2">
                    <p className="text-sm text-foreground/70">Question:</p>
                    <p className="text-lg font-medium">{item.question}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Answer:</p>
                    <p className="bg-secondary p-3 rounded-lg">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QAModel;
