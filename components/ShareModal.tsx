import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { CuteShareIcon } from './CuteIcons';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    title: string;
    content: string;
    author: string;
  };
}

export function ShareModal({ isOpen, onClose, post }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  
  const postUrl = `${window.location.origin}/post/${post.id}`;
  const shareText = `Check out this post: "${post.title}" by ${post.author}`;
  const shareContent = post.content.substring(0, 80) + (post.content.length > 80 ? '...' : '');

  const handleCopyClick = () => {
    const tempInput = document.createElement('input');
    tempInput.type = 'text';
    tempInput.value = postUrl;
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.style.top = '-9999px';
    tempInput.style.opacity = '0';
    
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      console.error('Copy command failed:', err);
    }
    
    document.body.removeChild(tempInput);
    
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(postUrl).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
          prompt('Copy this URL:', postUrl);
        });
      } else {
        prompt('Copy this URL:', postUrl);
      }
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      bgColor: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#166FE5]',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}&quote=${encodeURIComponent(shareText)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      bgColor: 'bg-[#000000]',
      hoverColor: 'hover:bg-[#1A1A1A]',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-[#405DE6] via-[#5851DB] via-[#833AB4] via-[#C13584] via-[#E1306C] to-[#FD1D1D]',
      hoverColor: 'hover:opacity-90',
      action: () => {
        handleCopyClick();
        setTimeout(() => {
          alert('Link copied! Open Instagram and paste it in your story or post.');
        }, 100);
      }
    },
    {
      name: 'WeChat',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.900 5.853-1.547-.576-3.583-4.196-6.348-8.596-6.639zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.53-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.53-1.162-1.188 0-.651.52-1.18 1.162-1.18zm2.711 6.158c0-2.859 2.579-5.203 5.854-5.203 3.274 0 5.866 2.344 5.866 5.203 0 2.861-2.592 5.204-5.866 5.204a7.378 7.378 0 0 1-2.032-.288 1.02 1.02 0 0 0-.71.074l-1.362.8a.243.243 0 0 1-.118.04c-.114 0-.207-.093-.207-.208a.25.25 0 0 1 .034-.14l.283-1.058a.505.505 0 0 0-.15-.56c-1.302-1.058-2.158-2.539-2.158-4.15-.434-.004-.434-.009-.434-.009zm1.685-1.978c-.464 0-.84.367-.84.82 0 .452.376.82.84.82.465 0 .84-.368.84-.82 0-.453-.375-.82-.84-.82zm3.704 0c-.464 0-.84.367-.84.82 0 .452.376.82.84.82.464 0 .84-.368.84-.82 0-.453-.376-.82-.84-.82z"/>
        </svg>
      ),
      bgColor: 'bg-[#09B83E]',
      hoverColor: 'hover:bg-[#08A838]',
      action: () => {
        handleCopyClick();
        setTimeout(() => {
          alert('Link copied! Share it in WeChat by pasting the link.');
        }, 100);
      }
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] p-0 overflow-hidden bg-gradient-to-br from-[#FFFBEB] to-[#FFF8E1] border-[#FFB300]/20 shadow-2xl">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-[#FFB300] to-[#FFA000] p-6 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
          
          <DialogHeader className="space-y-3 relative z-10">
            <DialogTitle className="flex items-center gap-3 text-xl font-bold" style={{ fontFamily: 'var(--font-family-heading)' }}>
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:scale-110 transition-transform duration-300">
                <CuteShareIcon size={24} />
              </div>
              Share the Buzz! 🐝
            </DialogTitle>
            <DialogDescription className="text-white/90 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-family-primary)' }}>
              Spread the sweet knowledge about "{post.title.length > 35 ? post.title.substring(0, 35) + '...' : post.title}"
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Social Media Options */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#6D4C41] flex items-center gap-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
              <div className="p-1 bg-gradient-to-r from-[#FFB300]/20 to-[#8BC34A]/20 rounded-lg">
                <ExternalLink className="w-4 h-4" />
              </div>
              Share on Social Platforms ✨
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  onClick={option.action}
                  className={`${option.bgColor} ${option.hoverColor} text-white border-0 h-14 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold rounded-2xl relative overflow-hidden group`}
                  style={{ fontFamily: 'var(--font-family-primary)' }}
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                  <div className="relative z-10 flex items-center gap-3">
                    {option.icon}
                    <span className="text-sm">{option.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Copy Link Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#6D4C41]">
              <div className="p-1 bg-gradient-to-r from-[#8BC34A]/20 to-[#B3E5FC]/20 rounded-lg">
                <Copy className="w-4 h-4" />
              </div>
              <h3 className="font-semibold" style={{ fontFamily: 'var(--font-family-heading)' }}>Copy Sweet Link 🔗</h3>
            </div>
            
            <div className="bg-gradient-to-r from-[#FFFBEB] to-[#FFF8E1] border border-[#FFB300]/20 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/60 backdrop-blur-sm p-3 rounded-lg text-sm font-mono text-[#6D4C41] truncate border border-[#FFB300]/10">
                  {postUrl}
                </div>
                <Button
                  onClick={handleCopyClick}
                  className={`shrink-0 min-w-[90px] h-11 transition-all duration-300 rounded-lg font-medium ${
                    copied 
                      ? 'bg-[#8BC34A] hover:bg-[#7CB342] text-white shadow-md' 
                      : 'bg-[#FFB300] hover:bg-[#FFA000] text-[#6D4C41] shadow-md hover:shadow-lg'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Post Preview */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#6D4C41] flex items-center gap-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
              <div className="p-1 bg-gradient-to-r from-[#B3E5FC]/20 to-[#FFB300]/20 rounded-lg">
                🍯
              </div>
              Sweet Preview
            </h3>
            <div className="bg-white/90 backdrop-blur-sm border border-[#FFB300]/30 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-[#6D4C41] mb-3 line-clamp-2 leading-relaxed" style={{ fontFamily: 'var(--font-family-heading)' }}>
                {post.title}
              </h4>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#FFB300] to-[#FFA000] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-white">{post.author.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#6D4C41]" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    by {post.author}
                  </span>
                  <div className="text-xs text-[#6D4C41]/60">🐝 Community Contributor</div>
                </div>
              </div>
              <p className="text-sm text-[#6D4C41]/70 line-clamp-3 leading-relaxed" style={{ fontFamily: 'var(--font-family-primary)' }}>
                {shareContent}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
