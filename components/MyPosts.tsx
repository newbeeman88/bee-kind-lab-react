import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Plus, User, Calendar, Edit, Trash2, X, Heart, MessageCircle, TrendingUp, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CuteBeeIcon } from './CuteIcons';
import { toast } from 'sonner';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  likes: number;
  upvotes: number;
  downvotes: number;
  comments: number;
}

interface MyPostsProps {
  user: { username: string; email: string } | null;
  posts: Post[];
  onCreatePost: () => void;
  onUpdatePost: (postId: string, updates: Partial<Post>) => void;
  onDeletePost: (postId: string) => void;
}

export function MyPosts({ user, posts, onCreatePost, onUpdatePost, onDeletePost }: MyPostsProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({ title: '', content: '' });

  const handleDeletePost = (postId: string, postTitle: string) => {
    if (confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
      onDeletePost(postId);
      toast.success('Post deleted successfully! 🗑️');
      if (selectedPost?.id === postId) {
        setSelectedPost(null);
      }
    }
  };

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setIsEditMode(false);
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setIsEditMode(true);
    setEditFormData({ title: post.title, content: post.content });
  };

  const handleSaveEdit = () => {
    if (!selectedPost) return;
    
    if (!editFormData.title.trim()) {
      toast.error('Please enter a title for your post');
      return;
    }
    
    if (!editFormData.content.trim()) {
      toast.error('Please enter some content for your post');
      return;
    }

    onUpdatePost(selectedPost.id, {
      title: editFormData.title,
      content: editFormData.content
    });
    
    toast.success(`"${editFormData.title}" has been updated! 🎉`);
    setSelectedPost(null);
    setIsEditMode(false);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsEditMode(false);
  };

  const getPostStats = (post: Post) => {
    return [
      { icon: Heart, value: post.likes, label: 'Likes', color: 'text-red-500' },
      { icon: TrendingUp, value: post.upvotes, label: 'Upvotes', color: 'text-green-500' },
      { icon: MessageCircle, value: post.comments, label: 'Comments', color: 'text-blue-500' }
    ];
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <CuteBeeIcon size={40} />
            <h1 className="text-4xl font-bold text-foreground" style={{ fontFamily: 'var(--font-family-heading)' }}>
              My Posts 📝
            </h1>
          </div>
          <p className="text-lg text-muted-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
            Your beekeeping journey documented - {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
        <Button 
          onClick={onCreatePost} 
          className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Post
        </Button>
      </div>

      {/* Empty State */}
      {posts.length === 0 ? (
        <Card className="text-center py-16 border-2 border-dashed border-border/50 bg-card/30 backdrop-blur-sm">
          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <CuteBeeIcon size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  No posts yet! 🌟
                </h3>
                <p className="text-muted-foreground max-w-md" style={{ fontFamily: 'var(--font-family-primary)' }}>
                  Start sharing your beekeeping experiences, tips, and stories with the community. Your insights could help fellow beekeepers!
                </p>
              </div>
              <Button 
                onClick={onCreatePost} 
                className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 px-8 py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Post
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card 
              key={post.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm group"
            >
              {/* Post Image */}
              {post.image && (
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-primary/30">
                    Your Post
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10 border-2 border-primary/20">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
                        {user?.username || 'You'}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => handleEditPost(post)}
                      title="Edit post"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors"
                      onClick={() => handleDeletePost(post.id, post.title)}
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  {post.title}
                </h3>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-foreground/80 text-sm mb-4 line-clamp-3" style={{ fontFamily: 'var(--font-family-primary)' }}>
                  {post.content}
                </p>
                
                {/* Post Stats */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border/50">
                  {getPostStats(post).map((stat, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-sm font-medium text-foreground">{stat.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => handleViewPost(post)}
                  >
                    View Full Post
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                    onClick={() => handleEditPost(post)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* View/Edit Post Modal */}
      <Dialog open={selectedPost !== null} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto modal-scroll">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-2xl" style={{ fontFamily: 'var(--font-family-heading)' }}>
              <span className="flex items-center space-x-2">
                {isEditMode ? (
                  <>
                    <Edit className="w-6 h-6 text-primary" />
                    <span>Edit Post</span>
                  </>
                ) : (
                  <>
                    <CuteBeeIcon size={28} />
                    <span>Your Post</span>
                  </>
                )}
              </span>
              <Button variant="ghost" size="sm" onClick={handleCloseModal} className="hover:bg-destructive/10 hover:text-destructive">
                <X className="w-5 h-5" />
              </Button>
            </DialogTitle>
            <DialogDescription style={{ fontFamily: 'var(--font-family-primary)' }}>
              {isEditMode ? 'Make changes to your post below' : 'View your post details'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPost && (
            <div className="space-y-6 pt-4">
              {!isEditMode ? (
                // View Mode
                <>
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
                        {user?.username || 'You'}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {selectedPost.date}
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-family-heading)' }}>
                    {selectedPost.title}
                  </h2>
                  
                  {selectedPost.image && (
                    <div className="rounded-xl overflow-hidden border-2 border-border/50">
                      <ImageWithFallback
                        src={selectedPost.image}
                        alt={selectedPost.title}
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'var(--font-family-primary)' }}>
                      {selectedPost.content}
                    </p>
                  </div>
                  
                  {/* Post Stats in View Mode */}
                  <div className="flex items-center gap-6 p-4 bg-muted/30 rounded-lg border border-border/50">
                    {getPostStats(selectedPost).map((stat, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-full bg-background flex items-center justify-center`}>
                          <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3 pt-4 border-t border-border/50">
                    <Button 
                      variant="default" 
                      onClick={() => handleEditPost(selectedPost)}
                      className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Post
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleCloseModal}
                      className="border-border/50"
                    >
                      Close
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDeletePost(selectedPost.id, selectedPost.title)}
                      className="ml-auto border-destructive/30 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Post
                    </Button>
                  </div>
                </>
              ) : (
                // Edit Mode
                <>
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="edit-title" className="text-sm font-medium mb-2 flex items-center">
                        Post Title *
                      </Label>
                      <Input
                        id="edit-title"
                        value={editFormData.title}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="mt-1"
                        placeholder="Enter a catchy title for your post..."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="edit-content" className="text-sm font-medium mb-2 flex items-center">
                        Content *
                      </Label>
                      <Textarea
                        id="edit-content"
                        value={editFormData.content}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, content: e.target.value }))}
                        className="mt-1"
                        rows={12}
                        placeholder="Share your beekeeping experience, tips, observations..."
                      />
                    </div>
                    
                    {selectedPost.image && (
                      <div>
                        <Label className="text-sm font-medium mb-2 flex items-center">
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Post Image
                        </Label>
                        <div className="mt-1 rounded-lg overflow-hidden border-2 border-border/50">
                          <ImageWithFallback
                            src={selectedPost.image}
                            alt={selectedPost.title}
                            className="w-full h-64 object-cover"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Image editing not yet available
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-3 pt-6 border-t border-border/50">
                    <Button 
                      variant="default" 
                      onClick={handleSaveEdit}
                      className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditMode(false)}
                      className="border-border/50"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
