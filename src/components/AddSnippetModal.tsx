
import React, { useState } from 'react';
import { X, Code, Tag, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddSnippetModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    language: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');

  const languages = [
    'javascript', 'typescript', 'python', 'java', 'cpp', 'css', 'html', 
    'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'sql'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.code && formData.language) {
      onSubmit(formData);
      setFormData({ title: '', description: '', code: '', language: '', tags: [] });
      onClose();
    }
  };

  const addTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.toLowerCase()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/20">
        <CardHeader className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center space-x-2">
              <Code className="w-5 h-5 text-purple-400" />
              <span>Add New Code Snippet</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Title *</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter snippet title..."
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe what this code snippet does..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 resize-none"
                rows={3}
              />
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label className="text-white">Language *</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select programming language" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang} className="text-white hover:bg-white/10">
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label className="text-white flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>Tags</span>
              </Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a tag..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  size="sm"
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-300 border-purple-500/30 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Code */}
            <div className="space-y-2">
              <Label htmlFor="code" className="text-white flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>Code *</span>
              </Label>
              <Textarea
                id="code"
                placeholder="Paste your code snippet here..."
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 font-mono text-sm resize-none"
                rows={12}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4 border-t border-white/10">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Save Snippet
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSnippetModal;
