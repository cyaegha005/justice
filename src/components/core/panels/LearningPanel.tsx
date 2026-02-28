"use client";

import { useState } from "react";
import { BookOpen, Video, Headphones, FileText, ChevronRight } from "lucide-react";

const learningModes = [
  { id: "text", label: "Text", icon: FileText, color: "#6366f1" },
  { id: "visual", label: "Visual", icon: Video, color: "#10b981" },
  { id: "audio", label: "Audio", icon: Headphones, color: "#f472b6" },
];

const sampleContent = [
  { title: "Chapter 1: Basic Concepts", duration: "15 min", type: "text" },
  { title: "Chapter 2: Core Principles", duration: "20 min", type: "visual" },
  { title: "Chapter 3: Practical Application", duration: "25 min", type: "audio" },
];

export function LearningPanel() {
  const [activeMode, setActiveMode] = useState("text");

  return (
    <div className="space-y-4">
      {/* Learning Modes */}
      <div className="grid grid-cols-3 gap-2">
        {learningModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className="p-3 rounded-xl text-center transition-all"
              style={{
                background: activeMode === mode.id 
                  ? `linear-gradient(135deg, ${mode.color} 0%, ${mode.color}dd 100%)`
                  : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${activeMode === mode.id ? mode.color : 'rgba(255, 255, 255, 0.1)'}`,
              }}
            >
              <Icon 
                className="w-5 h-5 mx-auto mb-1" 
                style={{ color: activeMode === mode.id ? 'white' : mode.color }}
              />
              <span 
                className="text-xs font-medium"
                style={{ color: activeMode === mode.id ? 'white' : 'rgba(255, 255, 255, 0.7)' }}
              >
                {mode.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content List */}
      <div className="space-y-2">
        {sampleContent.map((content, index) => (
          <div
            key={index}
            className="p-4 rounded-xl cursor-pointer transition-all hover:bg-white/5"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
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
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">{content.title}</h4>
                  <p className="text-white/40 text-xs">{content.duration}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/30" />
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div 
        className="p-4 rounded-xl"
        style={{
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-sm font-medium">Learning Progress</span>
          <span className="text-indigo-400 text-sm">35%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: '35%',
              background: 'linear-gradient(90deg, #6366f1, #ec4899)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
