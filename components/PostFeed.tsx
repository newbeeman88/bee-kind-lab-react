import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Calendar, ChevronUp, ChevronDown, MessageCircle, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PostDetailModal } from './PostDetailModal';
import { ShareModal } from './ShareModal';
import { CutePlusIcon, CuteHeartIcon, CuteShareIcon } from './CuteIcons';

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

interface PostFeedProps {
  isLoggedIn: boolean;
  currentUser: { username: string; email: string } | null;
  posts: Post[];
  onCreatePost: () => void;
  onUpdatePost: (postId: string, updates: Partial<Post>) => void;
  onLoadMore: () => void;
  hasMorePosts: boolean;
  isLoadingMore: boolean;
}

export function PostFeed({ isLoggedIn, currentUser, posts, onCreatePost, onUpdatePost, onLoadMore, hasMorePosts, isLoadingMore }: PostFeedProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sharePost, setSharePost] = useState<Post | null>(null);
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down' | null>>({});
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());

  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  const handleLike = (postId: string) => {
    if (!isLoggedIn) return;
    
    const newLikes = new Set(userLikes);
    const isLiked = newLikes.has(postId);
    
    if (isLiked) {
      newLikes.delete(postId);
    } else {
      newLikes.add(postId);
    }
    
    setUserLikes(newLikes);
    onUpdatePost(postId, { likes: posts.find(p => p.id === postId)!.likes + (isLiked ? -1 : 1) });
  };

  const handleUpvote = (postId: string) => {
    if (!isLoggedIn) return;
    
    const currentVote = userVotes[postId];
    const newVote = currentVote === 'up' ? null : 'up';
    
    setUserVotes({ ...userVotes, [postId]: newVote });
    
    const post = posts.find(p => p.id === postId)!;
    let upvotes = post.upvotes;
    let downvotes = post.downvotes;
    
    if (currentVote === 'up') {
      upvotes -= 1;
    } else if (currentVote === 'down') {
      downvotes -= 1;
      upvotes += 1;
    } else {
      upvotes += 1;
    }
    
    onUpdatePost(postId, { upvotes, downvotes });
  };

  const handleDownvote = (postId: string) => {
    if (!isLoggedIn) return;
    
    const currentVote = userVotes[postId];
    const newVote = currentVote === 'down' ? null : 'down';
    
    setUserVotes({ ...userVotes, [postId]: newVote });
    
    const post = posts.find(p => p.id === postId)!;
    let upvotes = post.upvotes;
    let downvotes = post.downvotes;
    
    if (currentVote === 'down') {
      downvotes -= 1;
    } else if (currentVote === 'up') {
      upvotes -= 1;
      downvotes += 1;
    } else {
      downvotes += 1;
    }
    
    onUpdatePost(postId, { upvotes, downvotes });
  };

  const handleReadMore = (post: Post) => {
    setSelectedPost(post);
  };

  const handleShare = (post: Post) => {
    setSharePost(post);
  };

  const handleCommentAdded = (postId: string) => {
    const post = posts.find(p => p.id === postId)!;
    onUpdatePost(postId, { comments: post.comments + 1 });
  };

  const handleCommentClick = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Latest from the Community</h2>
        {isLoggedIn && (
          <Button 
            onClick={onCreatePost} 
            className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 font-semibold rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{ fontFamily: 'var(--font-family-primary)' }}
          >
            <CutePlusIcon size={20} className="mr-2" />
            Share Your Buzz! 🍯
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-200 border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm text-foreground">{post.author}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-foreground">{post.title}</h3>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {post.image && (
                <div className="rounded-md overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
              
              <p className="text-foreground text-sm">
                {truncateContent(post.content)}
              </p>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  {/* Like Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    disabled={!isLoggedIn}
                    className={`flex items-center space-x-1 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 ${
                      userLikes.has(post.id) ? 'text-red-500' : 'text-muted-foreground'
                    }`}
                  >
                    <CuteHeartIcon size={16} className={userLikes.has(post.id) ? 'animate-pulse' : ''} />
                    <span className="text-xs font-medium">{post.likes}</span>
                  </Button>
                  
                  {/* Upvote Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(post.id)}
                    disabled={!isLoggedIn}
                    className={`flex items-center space-x-1 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-950 ${
                      userVotes[post.id] === 'up' ? 'text-green-500' : 'text-muted-foreground'
                    }`}
                  >
                    <ChevronUp className="w-4 h-4" />
                    <span className="text-xs">{post.upvotes}</span>
                  </Button>
                  
                  {/* Downvote Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownvote(post.id)}
                    disabled={!isLoggedIn}
                    className={`flex items-center space-x-1 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 ${
                      userVotes[post.id] === 'down' ? 'text-red-500' : 'text-muted-foreground'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                    <span className="text-xs">{post.downvotes}</span>
                  </Button>
                  
                  {/* Comments */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCommentClick(post)}
                    className="flex items-center space-x-1 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 text-muted-foreground"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>
                  
                  {/* Share Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(post)}
                    className="flex items-center space-x-1 hover:text-primary hover:bg-primary/10 text-muted-foreground"
                  >
                    <CuteShareIcon size={16} />
                  </Button>
                </div>
                
                {/* Read More Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleReadMore(post)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Read More
                </Button>
              </div>
              
              {!isLoggedIn && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  Log in to like and vote on posts
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Post Detail Modal */}
      <PostDetailModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLike={handleLike}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
        onCommentAdded={handleCommentAdded}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={!!sharePost}
        onClose={() => setSharePost(null)}
        post={sharePost || posts[0]}
      />

      <div className="flex justify-center mt-8">
        {hasMorePosts ? (
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={onLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                Loading...
              </>
            ) : (
              'Load More Posts'
            )}
          </Button>
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-2">🍯 That's all for now! 🍯</p>
            <p className="text-muted-foreground text-xs">No more posts can be displayed</p>
          </div>
        )}
      </div>
    </div>
  );
}
