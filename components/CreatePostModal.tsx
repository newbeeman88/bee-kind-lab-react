import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageIcon, Search, Upload, Camera, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './fallback/ImageWithFallback';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (title: string, content: string, image?: string) => void;
}

// Pre-curated beekeeping images
const beekeepingGallery = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop', 
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1568526381923-caf3fd520382?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1586985564150-c2b4136ae5a7?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1589643622537-badf86f49e08?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1601901068765-64dfc4ad3400?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400&h=300&fit=crop'
];

export function CreatePostModal({ isOpen, onClose, onCreatePost }: CreatePostModalProps) {
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    image: ''
  });
  
  const [imageTab, setImageTab] = useState('url');
  const [unsplashQuery, setUnsplashQuery] = useState('');
  const [unsplashResults, setUnsplashResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUnsplashSearch = async () => {
    if (!unsplashQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // In a real implementation, you'd call the Unsplash API
      // For now, we'll simulate a search with relevant beekeeping terms
      const searchResults = [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop', 
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1568526381923-caf3fd520382?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1586985564150-c2b4136ae5a7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1589643622537-badf86f49e08?w=400&h=300&fit=crop'
      ];
      
      setUnsplashResults(searchResults);
    } catch (error) {
      console.error('Failed to search images:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // In a real implementation, you'd upload the file and get a URL
      const mockFileUrl = URL.createObjectURL(file);
      setPostForm({ ...postForm, image: mockFileUrl });
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setPostForm({ ...postForm, image: imageUrl });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title.trim() || !postForm.content.trim()) {
      return;
    }
    
    onCreatePost(postForm.title, postForm.content, postForm.image || undefined);
    setPostForm({ title: '', content: '', image: '' });
    setUnsplashQuery('');
    setUnsplashResults([]);
    setSelectedFile(null);
    onClose();
  };

  const handleClose = () => {
    setPostForm({ title: '', content: '', image: '' });
    setUnsplashQuery('');
    setUnsplashResults([]);
    setSelectedFile(null);
    setImageTab('url');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
    }}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto [&>button]:w-10 [&>button]:h-10 sm:[&>button]:w-12 sm:[&>button]:h-12 [&>button]:bg-white/90 [&>button]:hover:bg-white [&>button]:rounded-full [&>button]:shadow-lg [&>button]:border-2 [&>button]:border-primary [&>button]:top-2 [&>button]:right-2 sm:[&>button]:top-4 sm:[&>button]:right-4 [&>button]:opacity-100 [&>button]:z-50 [&>button>svg]:w-5 [&>button>svg]:h-5 sm:[&>button>svg]:w-6 sm:[&>button>svg]:h-6 [&>button>svg]:text-foreground [&>button]:transition-all [&>button]:duration-200 [&>button]:hover:scale-110 [&>button]:active:scale-95">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">
            Share with the Community
          </DialogTitle>
          <DialogDescription>
            Create a new post to share your beekeeping experiences, ask questions, or offer advice to fellow beekeepers.
          </DialogDescription>
        </DialogHeader>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="post-title">Post Title</Label>
                <Input
                  id="post-title"
                  type="text"
                  placeholder="What's happening in your hive?"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  required
                  className="rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="post-content">Content</Label>
                <Textarea
                  id="post-content"
                  placeholder="Share your beekeeping experience, ask questions, or offer advice..."
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  required
                  className="min-h-32 rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <Label>Add Image (optional)</Label>
                
                {/* Image Preview */}
                {postForm.image && (
                  <div className="relative">
                    <ImageWithFallback
                      src={postForm.image}
                      alt="Selected image"
                      className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-primary/20"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPostForm({ ...postForm, image: '' })}
                      className="absolute top-2 right-2"
                    >
                      Remove
                    </Button>
                  </div>
                )}
                
                <Tabs value={imageTab} onValueChange={setImageTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="url" className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="search" className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Search
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="gallery" className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Gallery
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="url" className="space-y-3">
                    <div className="flex space-x-2">
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={postForm.image}
                        onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                        className="rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enter a direct URL to an image you'd like to use
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="search" className="space-y-3">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Search for beekeeping images..."
                        value={unsplashQuery}
                        onChange={(e) => setUnsplashQuery(e.target.value)}
                        className="rounded-lg"
                        onKeyPress={(e) => e.key === 'Enter' && handleUnsplashSearch()}
                      />
                      <Button
                        type="button"
                        onClick={handleUnsplashSearch}
                        disabled={isSearching || !unsplashQuery.trim()}
                        className="shrink-0"
                      >
                        {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    {unsplashResults.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                        {unsplashResults.map((imageUrl, index) => (
                          <div key={index} className="relative group cursor-pointer" onClick={() => handleImageSelect(imageUrl)}>
                            <ImageWithFallback
                              src={imageUrl}
                              alt={`Search result ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border-2 border-transparent group-hover:border-primary transition-colors"
                            />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <Button size="sm" variant="secondary">Select</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Search for stock photos related to beekeeping and select one
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="upload" className="space-y-3">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-primary hover:text-primary/80">Choose a file</span> or drag and drop
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      {selectedFile && (
                        <p className="text-sm text-primary mt-2">
                          Selected: {selectedFile.name}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gallery" className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
                      {beekeepingGallery.map((imageUrl, index) => (
                        <div key={index} className="relative group cursor-pointer" onClick={() => handleImageSelect(imageUrl)}>
                          <ImageWithFallback
                            src={imageUrl}
                            alt={`Beekeeping image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-transparent group-hover:border-primary transition-colors"
                          />
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button size="sm" variant="secondary">Select</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Choose from our curated collection of beekeeping images
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Share Post
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
