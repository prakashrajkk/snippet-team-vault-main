
import React from 'react';
import { Tag, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TagFilter = ({ allTags, selectedTags, onTagToggle }) => {
  if (allTags.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Tag className="w-4 h-4 text-purple-400" />
        <span className="text-white font-medium">Filter by Tags:</span>
        {selectedTags.length > 0 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => selectedTags.forEach(onTagToggle)}
            className="text-gray-400 hover:text-white text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "bg-purple-500 text-white border-purple-500 hover:bg-purple-600"
                  : "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 hover:text-white"
              }`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
              {isSelected && <X className="w-3 h-3 ml-1" />}
            </Badge>
          );
        })}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="text-sm text-gray-400">
          Showing snippets with {selectedTags.length === 1 ? 'tag' : 'all tags'}: {selectedTags.join(', ')}
        </div>
      )}
    </div>
  );
};

export default TagFilter;
