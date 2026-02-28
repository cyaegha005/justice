"use client";

import { useState } from "react";
import { Upload, FileText, Book, Brain, CloudUpload, X } from "lucide-react";

export function UploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setFile(null);
      setFileName("");
    }, 2000);
  };

  const clearFile = () => {
    setFile(null);
    setFileName("");
  };

  return (
    <div className="space-y-4">
      {/* Upload Area - Reference style */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-indigo-500 bg-indigo-500/10' 
            : 'border-white/20 hover:border-white/40 bg-white/5'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx,.txt,.md"
        />
        
        <div 
          className="w-16 h-16 rounded-xl mx-auto mb-3 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'
          }}
        >
          <CloudUpload className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-base font-semibold text-white mb-1">
          Drag and drop files here
        </h3>
        <p className="text-white/50 text-sm mb-2">
          Or click to select files
        </p>
        <p className="text-white/30 text-xs">
          Supports PDF, Word, TXT, Markdown formats
        </p>
      </div>

      {/* File Preview */}
      {fileName && (
        <div 
          className="p-4 rounded-xl"
          style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                }}
              >
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{fileName}</p>
                <p className="text-white/40 text-xs">
                  {(file?.size ? (file.size / 1024 / 1024).toFixed(2) : 0)} MB
                </p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {fileName && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50"
          style={{
            background: uploading 
              ? 'rgba(99, 102, 241, 0.5)' 
              : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'
          }}
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Converting...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Start Conversion
            </span>
          )}
        </button>
      )}

      {/* Features */}
      <div className="grid grid-cols-2 gap-3">
        <div 
          className="p-3 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Book className="w-6 h-6 text-indigo-400 mb-2" />
          <h4 className="text-white text-sm font-medium mb-1">Smart Parsing</h4>
          <p className="text-white/40 text-xs">Auto extract document structure</p>
        </div>
        <div 
          className="p-3 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Brain className="w-6 h-6 text-pink-400 mb-2" />
          <h4 className="text-white text-sm font-medium mb-1">3D Conversion</h4>
          <p className="text-white/40 text-xs">Generate immersive scenes</p>
        </div>
      </div>
    </div>
  );
}
