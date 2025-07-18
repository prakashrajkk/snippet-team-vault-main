
import React, { useState } from 'react';
import { Copy, Trash2, User, Calendar, Tag, Share2, Code2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SnippetCard = ({ snippet, onCopy, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLanguageColor = (language) => {
    const colors = {
      javascript: 'bg-yellow-500',
      python: 'bg-blue-500',
      css: 'bg-purple-500',
      html: 'bg-orange-500',
      typescript: 'bg-blue-600',
      java: 'bg-red-500',
      cpp: 'bg-green-500',
      default: 'bg-gray-500'
    };
    return colors[language.toLowerCase()] || colors.default;
  };

  const formatCode = (code) => {
    // Simple syntax highlighting for display
    return code
      .split('\n')
      .map((line, index) => (
        <div key={index} className="flex">
          <span className="text-gray-500 text-sm mr-4 select-none w-8 text-right">
            {index + 1}
          </span>
          <span className="text-gray-200">{line}</span>
        </div>
      ));
  };

  const previewLines = snippet.code.split('\n').slice(0, 6);
  const hasMoreLines = snippet.code.split('\n').length > 6;

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${getLanguageColor(snippet.language)}`} />
              <h3 className="text-xl font-semibold text-white">{snippet.title}</h3>
              <Badge variant="secondary" className="bg-white/10 text-purple-200 border-white/20">
                {snippet.language}
              </Badge>
            </div>
            <p className="text-gray-300 text-sm mb-3">{snippet.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {snippet.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-purple-400/30 text-purple-300">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{snippet.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{snippet.createdAt}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onCopy(snippet.code)}
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(snippet.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Separator className="mb-4 bg-white/10" />
        
        {/* Code Display */}
        <div className="bg-black/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">{snippet.language}</span>
            </div>
            {hasMoreLines && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </div>
          
          <div className="space-y-1">
            {isExpanded 
              ? formatCode(snippet.code)
              : formatCode(previewLines.join('\n'))
            }
            {!isExpanded && hasMoreLines && (
              <div className="text-gray-500 text-center py-2">
                ... {snippet.code.split('\n').length - 6} more lines
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4">
          <Button
            size="sm"
            onClick={() => onCopy(snippet.code)}
            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border-purple-500/30"
            variant="outline"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Code
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share with Team
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SnippetCard;
