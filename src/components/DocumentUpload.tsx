
import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface DocumentUploadProps {
  onFileChange: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
}

const DocumentUpload = ({
  onFileChange,
  accept = ".pdf,.txt",
  multiple = false,
  label = "Upload Document"
}: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (multiple) {
      // Handle multiple files if needed
      Array.from(files).forEach(file => {
        onFileChange(file);
      });
      setFileName(`${files.length} files selected`);
    } else {
      onFileChange(files[0]);
      setFileName(files[0].name);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/50"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          accept={accept}
          multiple={multiple}
        />

        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        <div className="text-center">
          <p className="text-lg font-medium mb-2">
            {fileName || label}
          </p>
          <p className="text-sm text-foreground/60">
            {fileName ? "Click to change file" : `Drag & drop or click to upload`}
          </p>
          <p className="text-xs text-foreground/40 mt-2">
            Supported formats: PDF, TXT
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentUpload;
