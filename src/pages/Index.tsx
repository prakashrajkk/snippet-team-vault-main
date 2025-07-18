
import React, { useState, useEffect } from 'react';
import { Plus, Search, Tag, Users, Code, Copy, Trash2, Edit3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import AddSnippetModal from '@/components/AddSnippetModal';
import SnippetCard from '@/components/SnippetCard';
import TagFilter from '@/components/TagFilter';

// Mock data for snippets
const initialSnippets = [
  {
    id: '1',
    title: 'React useState Hook',
    code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    language: 'javascript',
    tags: ['react', 'hooks', 'state'],
    author: 'John Doe',
    createdAt: '2024-01-15',
    description: 'Basic example of React useState hook for managing component state'
  },
  {
    id: '2',
    title: 'CSS Flexbox Center',
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.content {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}`,
    language: 'css',
    tags: ['css', 'flexbox', 'layout'],
    author: 'Jane Smith',
    createdAt: '2024-01-14',
    description: 'Perfect centering with CSS Flexbox'
  },
  {
    id: '3',
    title: 'Python List Comprehension',
    code: `# Basic list comprehension
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# Nested loops
matrix = [[i*j for j in range(3)] for i in range(3)]
print(matrix)  # [[0, 0, 0], [0, 1, 2], [0, 2, 4]]`,
    language: 'python',
    tags: ['python', 'list-comprehension', 'loops'],
    author: 'Mike Johnson',
    createdAt: '2024-01-13',
    description: 'Efficient way to create lists in Python'
  }
];

const Index = () => {
  const [snippets, setSnippets] = useState(initialSnippets);
  const [filteredSnippets, setFilteredSnippets] = useState(initialSnippets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Get all unique tags
  const allTags = [...new Set(snippets.flatMap(snippet => snippet.tags))];

  // Filter snippets based on search and tags
  useEffect(() => {
    let filtered = snippets;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(snippet =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(snippet =>
        selectedTags.every(tag => snippet.tags.includes(tag))
      );
    }

    setFilteredSnippets(filtered);
  }, [snippets, searchTerm, selectedTags]);

  const handleAddSnippet = (newSnippet) => {
    const snippet = {
      ...newSnippet,
      id: Date.now().toString(),
      author: 'Current User',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSnippets([snippet, ...snippets]);
    toast({
      title: "Snippet Added!",
      description: "Your code snippet has been saved successfully.",
    });
  };

  const handleDeleteSnippet = (id) => {
    setSnippets(snippets.filter(snippet => snippet.id !== id));
    toast({
      title: "Snippet Deleted",
      description: "The code snippet has been removed.",
    });
  };

  const handleCopySnippet = (code) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard!",
      description: "Code snippet has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Code Snippet Manager</h1>
                <p className="text-purple-200">Save, organize, and share your code snippets</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Snippet
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search snippets by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <TagFilter 
            allTags={allTags}
            selectedTags={selectedTags}
            onTagToggle={(tag) => {
              setSelectedTags(prev => 
                prev.includes(tag) 
                  ? prev.filter(t => t !== tag)
                  : [...prev, tag]
              );
            }}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Code className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-300">Total Snippets</p>
                  <p className="text-2xl font-bold text-white">{snippets.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Tag className="h-8 w-8 text-pink-400" />
                <div>
                  <p className="text-sm text-gray-300">Total Tags</p>
                  <p className="text-2xl font-bold text-white">{allTags.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-300">Team Members</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Snippets Grid */}
        <div className="space-y-6">
          {filteredSnippets.length === 0 ? (
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No snippets found</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm || selectedTags.length > 0 
                    ? "Try adjusting your search or filters" 
                    : "Get started by adding your first code snippet"
                  }
                </p>
                <Button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Snippet
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onCopy={handleCopySnippet}
                onDelete={handleDeleteSnippet}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Snippet Modal */}
      <AddSnippetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSnippet}
      />
    </div>
  );
};

export default Index;
