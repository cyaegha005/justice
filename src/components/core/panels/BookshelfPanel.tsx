"use client";

import { useState } from "react";
import { Search, FileText, Video, Headphones, MoreVertical } from "lucide-react";

const resources = [
  { id: 1, title: "Machine Learning Basics", type: "pdf", size: "2.5 MB", date: "2024-01-15" },
  { id: 2, title: "Deep Learning Advanced", type: "video", size: "45 MB", date: "2024-01-14" },
  { id: 3, title: "Neural Networks Explained", type: "audio", size: "12 MB", date: "2024-01-13" },
  { id: 4, title: "Transformer Paper", type: "pdf", size: "1.8 MB", date: "2024-01-12" },
];

const filters = ["All", "PDF", "Video", "Audio"];

export function BookshelfPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const getIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="w-5 h-5 text-red-400" />;
      case "video": return <Video className="w-5 h-5 text-blue-400" />;
      case "audio": return <Headphones className="w-5 h-5 text-green-400" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || 
      (activeFilter === "PDF" && r.type === "pdf") ||
      (activeFilter === "Video" && r.type === "video") ||
      (activeFilter === "Audio" && r.type === "audio");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/40"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: activeFilter === filter 
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : 'rgba(255, 255, 255, 0.05)',
              color: activeFilter === filter ? 'white' : 'rgba(255, 255, 255, 0.7)',
              border: `1px solid ${activeFilter === filter ? 'transparent' : 'rgba(255, 255, 255, 0.1)'}`
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Resource List */}
      <div className="space-y-2">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="p-3 rounded-xl cursor-pointer transition-all hover:bg-white/5"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              >
                {getIcon(resource.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white text-sm font-medium truncate">{resource.title}</h4>
                <p className="text-white/40 text-xs">{resource.size} · {resource.date}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <MoreVertical className="w-4 h-4 text-white/40" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div 
        className="p-4 rounded-xl"
        style={{
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Total Resources</span>
          <span className="text-white font-medium">{resources.length} files</span>
        </div>
      </div>
    </div>
  );
}
