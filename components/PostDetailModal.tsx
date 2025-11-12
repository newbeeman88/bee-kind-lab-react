import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';

import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader } from './ui/card';
import { User, Calendar, Heart, ChevronUp, ChevronDown, MessageCircle, Share, Reply, Send } from 'lucide-react';
import { ImageWithFallback } from './fallback/ImageWithFallback';
import { ShareModal } from './ShareModal';
import { useState, useEffect } from 'react';

// Utility function to format timestamps
const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  } else {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }
};

interface Comment {
  id: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

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

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  currentUser: { username: string; email: string } | null;
  onLike: (postId: string) => void;
  onUpvote: (postId: string) => void;
  onDownvote: (postId: string) => void;
  onCommentAdded?: (postId: string) => void;
}

// Mock comments data
const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1',
      content: 'Congratulations on your first harvest! That\'s an amazing yield for your first time. The color you described sounds perfect - that amber gold is exactly what you want to see.',
      author: 'BeeWiseMentor',
      date: '1 day ago',
      likes: 8,
      replies: [
        {
          id: 'c1r1',
          content: 'Thank you! I was so nervous about the extraction process but it went smoothly. Already planning my next steps for next season.',
          author: 'HoneyBeeKeeper42',
          date: '1 day ago',
          likes: 3
        }
      ]
    },
    {
      id: 'c2',
      content: 'Manual extractor is definitely a workout! I upgraded to an electric one after my second season. Worth every penny if you\'re planning to expand.',
      author: 'HoneyHarvester99',
      date: '1 day ago',
      likes: 5
    },
    {
      id: 'c3',
      content: 'Those floral notes sound incredible! What\'s the main nectar source in your area? I\'m getting mostly clover this year.',
      author: 'FloralNectarFan',
      date: '12 hours ago',
      likes: 2
    }
  ],
  '2': [
    {
      id: 'c4',
      content: 'I\'ve had great success with Apiguard. Used it for three seasons now and it really keeps the mite count down. Make sure to time it right though - not during honey flow.',
      author: 'MiteBuster',
      date: '3 days ago',
      likes: 12,
      replies: [
        {
          id: 'c4r1',
          content: 'Thanks for the recommendation! When do you typically apply it? Early spring or late summer?',
          author: 'BuzzingBeeGuru',
          date: '3 days ago',
          likes: 4
        },
        {
          id: 'c4r2',
          content: 'I do late summer treatment, usually August in my area. Gives the colony time to recover before winter.',
          author: 'MiteBuster',
          date: '3 days ago',
          likes: 6
        }
      ]
    },
    {
      id: 'c5',
      content: 'Formic acid strips work well but watch the temperature. Too hot and they can stress the bees. I use them when temps are consistently below 85°F.',
      author: 'TempWatcher',
      date: '2 days ago',
      likes: 7
    }
  ],
  '3': [
    {
      id: 'c6',
      content: 'Great checklist! I\'d add checking for proper ventilation. Moisture buildup in winter can be deadly for colonies.',
      author: 'WinterPrepper',
      date: '6 days ago',
      likes: 15,
      replies: [
        {
          id: 'c6r1',
          content: 'Absolutely! I use moisture boards and top ventilation. Learned that lesson the hard way my first winter.',
          author: 'SeasonedKeeper',
          date: '6 days ago',
          likes: 8
        }
      ]
    }
  ]
};

export function PostDetailModal({ 
  post, 
  isOpen, 
  onClose, 
  isLoggedIn, 
  currentUser,
  onLike, 
  onUpvote, 
  onDownvote,
  onCommentAdded
}: PostDetailModalProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [commentLikes, setCommentLikes] = useState<Set<string>>(new Set());
  
  // Sync comments when post changes
  useEffect(() => {
    if (post?.id) {
      setComments(mockComments[post.id] || []);
      setNewComment('');
      setReplyingTo(null);
      setReplyText('');
      setCommentLikes(new Set());
    }
  }, [post?.id]);

  const handleReplyClick = (commentId: string) => {
    if (replyingTo === commentId) {
      // Cancel reply
      setReplyingTo(null);
      setReplyText('');
    } else {
      // Start reply
      setReplyingTo(commentId);
      setReplyText('');
    }
  };
  
  if (!post) return null;

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !isLoggedIn) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      content: newComment,
      author: currentUser?.username || 'Anonymous',
      date: formatTimestamp(new Date()),
      likes: 0,
      replies: []
    };

    setComments([...comments, comment]);
    setNewComment('');
    onCommentAdded?.(post.id);
  };

  const handleAddReply = (parentCommentId: string) => {
    if (!replyText.trim() || !isLoggedIn) return;

    const reply: Comment = {
      id: `r${Date.now()}`,
      content: replyText,
      author: currentUser?.username || 'Anonymous',
      date: formatTimestamp(new Date()),
      likes: 0
    };

    setComments(comments.map(comment => 
      comment.id === parentCommentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));
    setReplyText('');
    setReplyingTo(null);
  };

  const handleLikeComment = (commentId: string) => {
    if (!isLoggedIn) return;
    
    const newLikes = new Set(commentLikes);
    const isLiked = newLikes.has(commentId);
    
    if (isLiked) {
      newLikes.delete(commentId);
    } else {
      newLikes.add(commentId);
    }
    
    setCommentLikes(newLikes);
    
    // Update comment likes count
    const updateCommentLikes = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + (isLiked ? -1 : 1) };
        }
        if (comment.replies) {
          return { ...comment, replies: updateCommentLikes(comment.replies) };
        }
        return comment;
      });
    };
    
    setComments(updateCommentLikes(comments));
  };

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-6 border-l-2 border-primary/30 pl-4 bg-muted/20 rounded-r-lg py-2' : ''} space-y-3`}>
      <div className="flex space-x-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src="" />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-sm text-foreground">{comment.author}</span>
              <span className="text-xs text-muted-foreground">{comment.date}</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{comment.content}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLikeComment(comment.id)}
              disabled={!isLoggedIn}
              className={`flex items-center space-x-1 text-xs hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 ${
                commentLikes.has(comment.id) ? 'text-red-500' : 'text-muted-foreground'
              }`}
            >
              <Heart className="w-3 h-3" />
              <span>{comment.likes}</span>
            </Button>
            
            {!isReply && isLoggedIn && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReplyClick(comment.id)}
                className={`flex items-center space-x-1 text-xs hover:text-primary ${
                  replyingTo === comment.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Reply className="w-3 h-3" />
                <span>{replyingTo === comment.id ? 'Cancel' : 'Reply'}</span>
              </Button>
            )}
          </div>
          
          {replyingTo === comment.id && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg border space-y-3">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${comment.author}...`}
                className="text-sm min-h-[60px] resize-none"
                rows={2}
                autoFocus
                onFocus={(e) => {
                  // Set cursor to end when focused
                  const target = e.target as HTMLTextAreaElement;
                  const length = target.value.length;
                  target.setSelectionRange(length, length);
                }}
              />
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleAddReply(comment.id)}
                  disabled={!replyText.trim()}
                  className="text-xs"
                >
                  <Send className="w-3 h-3 mr-1" />
                  Post Reply
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText('');
                  }}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {comment.replies.map((reply) => (
            <CommentComponent key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto [&>button]:w-10 [&>button]:h-10 sm:[&>button]:w-12 sm:[&>button]:h-12 [&>button]:bg-white/90 [&>button]:hover:bg-white [&>button]:rounded-full [&>button]:shadow-lg [&>button]:border-2 [&>button]:border-primary [&>button]:top-2 [&>button]:right-2 sm:[&>button]:top-4 sm:[&>button]:right-4 [&>button]:opacity-100 [&>button]:z-50 [&>button>svg]:w-5 [&>button>svg]:h-5 sm:[&>button>svg]:w-6 sm:[&>button>svg]:h-6 [&>button>svg]:text-foreground [&>button]:transition-all [&>button]:duration-200 [&>button]:hover:scale-110 [&>button]:active:scale-95">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">
            {post.title}
          </DialogTitle>
          <DialogDescription>
            Read the full post and engage with the community
          </DialogDescription>
        </DialogHeader>
        
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{post.author}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  {post.date}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 space-y-6">
            {post.image && (
              <div className="rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            )}
            
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
            
            {/* Engagement Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                {/* Like Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => isLoggedIn && onLike(post.id)}
                  disabled={!isLoggedIn}
                  className="flex items-center space-x-2 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </Button>
                
                {/* Upvote Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => isLoggedIn && onUpvote(post.id)}
                  disabled={!isLoggedIn}
                  className="flex items-center space-x-2 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-950"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>{post.upvotes}</span>
                </Button>
                
                {/* Downvote Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => isLoggedIn && onDownvote(post.id)}
                  disabled={!isLoggedIn}
                  className="flex items-center space-x-2 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <ChevronDown className="w-4 h-4" />
                  <span>{post.downvotes}</span>
                </Button>
                
                {/* Comments */}
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  className="flex items-center space-x-2 text-muted-foreground"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{comments.length}</span>
                </Button>
              </div>
              
              {/* Share Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center space-x-2 hover:text-primary hover:bg-primary/10"
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
            
            {!isLoggedIn && (
              <div className="text-center py-4 text-sm text-muted-foreground">
                Please log in to like, vote, or comment on posts
              </div>
            )}
            
            {/* Comments Section */}
            <div className="border-t border-border pt-6 space-y-6">
              <h4 className="text-lg font-medium text-foreground">Comments ({comments.length})</h4>
              
              {/* Add Comment */}
              {isLoggedIn && (
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts about this post..."
                        className="bg-input-background border-border"
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Comments List */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <CommentComponent key={comment.id} comment={comment} />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No comments yet</p>
                    <p className="text-sm">Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
      
      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        post={post}
      />
    </Dialog>
  );
}
