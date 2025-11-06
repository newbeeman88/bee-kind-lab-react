import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Plus, User, Calendar, Edit, Trash2, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

// Mock data for user's posts (expanded set)
const allMockUserPosts: Post[] = [
  {
    id: 'user-1',
    title: 'My First Season with Italian Bees',
    content: 'This year I decided to try Italian bees for the first time, and what a difference! They\'ve been incredibly gentle and productive. The queen has been laying consistently, and I\'ve noticed they\'re excellent foragers...',
    author: 'You',
    date: '3 days ago',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop'
  },
  {
    id: 'user-2',
    title: 'Hive Inspection Notes - Week 12',
    content: 'Weekly inspection went smoothly today. Found the queen in the bottom deep, lots of brood pattern looks good. Added another super as the nectar flow is still strong. Noticed some drone cells being built...',
    author: 'You',
    date: '1 week ago'
  },
  {
    id: 'user-3',
    title: 'Honey Extraction Day!',
    content: 'Finally got around to extracting honey from my two hives. Ended up with about 85 pounds of beautiful golden honey! The taste is incredible this year - lots of wildflower and clover notes...',
    author: 'You',
    date: '2 weeks ago',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=200&fit=crop'
  },
  {
    id: 'user-4',
    title: 'Building New Hive Boxes',
    content: 'Spent the weekend building 6 new deep hive boxes for next season. Used cedar this time instead of pine - hoping it will last longer. The bees seem to like the smell of fresh cedar...',
    author: 'You',
    date: '3 weeks ago'
  },
  {
    id: 'user-5',
    title: 'Queen Rearing Experiment Success!',
    content: 'My queen rearing project has been incredibly successful this season. Started with 12 queen cells and had a 90% success rate. The new queens are all laying well and their colonies are thriving...',
    author: 'You',
    date: '1 month ago',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop'
  },
  {
    id: 'user-6',
    title: 'Dealing with Varroa Mites',
    content: 'Had to treat for varroa mites this month. Used formic acid strips and saw a significant drop in mite counts. Important to monitor closely and treat when necessary to keep colonies healthy...',
    author: 'You',
    date: '1 month ago'
  },
  {
    id: 'user-7',
    title: 'Spring Splits and Colony Growth',
    content: 'Made splits from my strongest hives this spring. All four splits have accepted their new queens and are building up nicely. Planning to overwinter 8 colonies this year instead of just 4...',
    author: 'You',
    date: '2 months ago',
    image: 'https://images.unsplash.com/photo-1568526381923-caf3fd520382?w=400&h=200&fit=crop'
  },
  {
    id: 'user-8',
    title: 'Installing Package Bees',
    content: 'Got two 3-pound packages installed today. The bees seem to be settling in well and have already started drawing comb. Weather has been perfect for the installation - warm and sunny...',
    author: 'You',
    date: '3 months ago'
  },
  {
    id: 'user-9',
    title: 'Winter Hive Prep Complete',
    content: 'Finished preparing all hives for winter. Added mouse guards, reduced entrances, and made sure each hive has adequate honey stores. Also wrapped hives with tar paper for insulation...',
    author: 'You',
    date: '4 months ago'
  },
  {
    id: 'user-10',
    title: 'First Year Beekeeping Reflections',
    content: 'Looking back on my first year as a beekeeper, I\'ve learned so much! Made plenty of mistakes but the bees were forgiving. Harvested 40 pounds of honey and successfully overwintered one hive...',
    author: 'You',
    date: '6 months ago',
    image: 'https://images.unsplash.com/photo-1586985564150-c2b4136ae5a7?w=400&h=200&fit=crop'
  }
];

export function MyPosts({ user, posts, onCreatePost, onUpdatePost, onDeletePost }: MyPostsProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({ title: '', content: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const postsPerPage = 4;

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
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
    if (selectedPost) {
      const updatedPost = {
        ...selectedPost,
        title: editFormData.title,
        content: editFormData.content
      };
      setPosts(posts.map(post => post.id === selectedPost.id ? updatedPost : post));
      setSelectedPost(null);
      setIsEditMode(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsEditMode(false);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = 0;
      const endIndex = nextPage * postsPerPage;
      
      setPosts(allMockUserPosts.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
      setIsLoading(false);
    }, 800);
  };

  const hasMorePosts = posts.length < allMockUserPosts.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Posts</h1>
          <p className="text-muted-foreground mt-2">
            Your beekeeping journey documented
          </p>
        </div>
        <Button onClick={onCreatePost} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Edit className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">No posts yet</h3>
                <p className="text-muted-foreground">Start sharing your beekeeping experiences with the community!</p>
              </div>
              <Button onClick={onCreatePost} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Post
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-200 border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm text-foreground">{user?.username || 'You'}</p>
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
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditPost(post)}
                    >
                      <Edit className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-bold text-foreground">{post.title}</h3>
              </CardHeader>
              <CardContent className="pt-0">
                {post.image && (
                  <div className="mb-4 rounded-md overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
                <p className="text-foreground text-sm mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleViewPost(post)}
                  >
                    View Post
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
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

      {hasMorePosts && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More Posts'}
          </Button>
        </div>
      )}

      {/* View/Edit Post Modal */}
      <Dialog open={selectedPost !== null} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {isEditMode ? 'Edit Post' : 'View Post'}
              <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Make changes to your post' : 'View your post details'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPost && (
            <div className="space-y-4">
              {!isEditMode ? (
                // View Mode
                <>
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{user?.username || 'You'}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {selectedPost.date}
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-foreground">{selectedPost.title}</h2>
                  
                  {selectedPost.image && (
                    <div className="rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={selectedPost.image}
                        alt={selectedPost.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap">{selectedPost.content}</p>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button 
                      variant="default" 
                      onClick={() => handleEditPost(selectedPost)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Post
                    </Button>
                    <Button variant="outline" onClick={handleCloseModal}>
                      Close
                    </Button>
                  </div>
                </>
              ) : (
                // Edit Mode
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-title">Title</Label>
                      <Input
                        id="edit-title"
                        value={editFormData.title}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="mt-1"
                        placeholder="Enter post title..."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="edit-content">Content</Label>
                      <Textarea
                        id="edit-content"
                        value={editFormData.content}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, content: e.target.value }))}
                        className="mt-1"
                        rows={8}
                        placeholder="Share your beekeeping experience..."
                      />
                    </div>
                    
                    {selectedPost.image && (
                      <div>
                        <Label>Current Image</Label>
                        <div className="mt-1 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={selectedPost.image}
                            alt={selectedPost.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button 
                      variant="default" 
                      onClick={handleSaveEdit}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditMode(false)}>
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
