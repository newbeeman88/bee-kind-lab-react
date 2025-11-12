import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { SharingIcon } from './MyIcons';

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
      name: 'Line',
      icon: (
        <svg width="800px" height="800px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 14.4979C30 8.15792 23.7199 3 15.9999 3C8.28094 3 2 8.15792 2 14.4979C2 20.1817 6.98063 24.9417 13.7084 25.8418C14.1644 25.9412 14.7849 26.146 14.9419 26.5404C15.0831 26.8986 15.0342 27.4598 14.987 27.8216C14.987 27.8216 14.8227 28.8214 14.7873 29.0343C14.7264 29.3926 14.5061 30.4353 15.9999 29.7981C17.4942 29.1609 24.0626 24.9935 26.9998 21.572C29.0287 19.3204 30 17.0353 30 14.4979Z" fill="#2CCF54"/>
        <path d="M13.1553 11.4244H12.1733C12.0228 11.4244 11.9004 11.5478 11.9004 11.6995V17.866C11.9004 18.0179 12.0228 18.1411 12.1733 18.1411H13.1553C13.3059 18.1411 13.428 18.0179 13.428 17.866V11.6995C13.428 11.5478 13.3059 11.4244 13.1553 11.4244Z" fill="white"/>
        <path d="M19.9147 11.4244H18.9327C18.7821 11.4244 18.66 11.5478 18.66 11.6995V15.3631L15.8645 11.5467C15.8128 11.4683 15.729 11.4295 15.6375 11.4244H14.6558C14.5052 11.4244 14.3828 11.5478 14.3828 11.6995V17.866C14.3828 18.0179 14.5052 18.1411 14.6558 18.1411H15.6375C15.7883 18.1411 15.9104 18.0179 15.9104 17.866V14.2035L18.7094 18.0247C18.7597 18.0967 18.845 18.1411 18.9327 18.1411H19.9147C20.0655 18.1411 20.1874 18.0179 20.1874 17.866V11.6995C20.1874 11.5478 20.0655 11.4244 19.9147 11.4244Z" fill="white"/>
        <path d="M10.7884 16.5969H8.12013V11.6998C8.12013 11.5476 7.99802 11.4241 7.84773 11.4241H6.86545C6.71489 11.4241 6.59277 11.5476 6.59277 11.6998V17.8652C6.59277 18.0149 6.71435 18.1411 6.86518 18.1411H10.7884C10.9389 18.1411 11.0605 18.0174 11.0605 17.8652V16.8725C11.0605 16.7203 10.9389 16.5969 10.7884 16.5969Z" fill="white"/>
        <path d="M25.3372 12.9683C25.4878 12.9683 25.6094 12.8452 25.6094 12.6927V11.7C25.6094 11.5478 25.4878 11.4241 25.3372 11.4241H21.4143C21.2636 11.4241 21.1416 11.5501 21.1416 11.6998V17.8655C21.1416 18.0147 21.2633 18.1411 21.4137 18.1411H25.3372C25.4878 18.1411 25.6094 18.0174 25.6094 17.8655V16.8725C25.6094 16.7206 25.4878 16.5969 25.3372 16.5969H22.6692V15.5546H25.3372C25.4878 15.5546 25.6094 15.4311 25.6094 15.2789V14.2863C25.6094 14.1341 25.4878 14.0104 25.3372 14.0104H22.6692V12.9683H25.3372Z" fill="white"/>
        </svg>
      ),
      bgColor: 'bg-green-300',
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[600px] lg:max-w-[700px] max-h-[85vh] sm:max-h-[90vh] p-0 overflow-y-auto bg-gradient-to-br from-[#FFFBEB] to-[#FFF8E1] border-[#FFB300]/20 shadow-2xl gap-0">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-[#FFB300] to-[#FFA000] p-3 sm:p-4 md:p-6 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/10 rounded-full -mr-8 sm:-mr-12 -mt-8 sm:-mt-12"></div>
          <div className="absolute bottom-0 left-0 w-12 sm:w-16 h-12 sm:h-16 bg-white/5 rounded-full -ml-6 sm:-ml-8 -mb-6 sm:-mb-8"></div>
          
          <DialogHeader className="space-y-1 sm:space-y-2 md:space-y-3 relative z-10">
            <DialogTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold" style={{ fontFamily: 'var(--font-family-heading)' }}>
              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm flex-shrink-0">
                <SharingIcon size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <span className="truncate">Share the Buzz! 🐝</span>
            </DialogTitle>
            <DialogDescription className="text-white/90 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: 'var(--font-family-primary)' }}>
              Spread the sweet knowledge about "{post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title}"
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Social Media Options */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-[#6D4C41] flex items-center gap-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
              <div className="p-1 bg-gradient-to-r from-[#FFB300]/20 to-[#8BC34A]/20 rounded-lg">
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="truncate">Share on Social Platforms ✨</span>
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  onClick={option.action}
                  className={`${option.bgColor} ${option.hoverColor} text-white border-0 h-11 sm:h-12 md:h-14 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold rounded-lg sm:rounded-xl md:rounded-2xl relative overflow-hidden group`}
                  style={{ fontFamily: 'var(--font-family-primary)' }}
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                  <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0">{option.icon}</div>
                    <span className="text-xs sm:text-sm truncate">{option.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Copy Link Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-[#6D4C41]">
              <div className="p-1 bg-gradient-to-r from-[#8BC34A]/20 to-[#B3E5FC]/20 rounded-lg">
                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold truncate" style={{ fontFamily: 'var(--font-family-heading)' }}>Copy Sweet Link 🔗</h3>
            </div>
            
            <div className="bg-gradient-to-r from-[#FFFBEB] to-[#FFF8E1] border border-[#FFB300]/20 rounded-xl p-3 sm:p-4 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <div className="flex-1 bg-white/60 backdrop-blur-sm p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm font-mono text-[#6D4C41] truncate border border-[#FFB300]/10 min-w-0">
                  {postUrl}
                </div>
                <Button
                  onClick={handleCopyClick}
                  className={`shrink-0 w-full sm:w-auto sm:min-w-[90px] h-10 sm:h-11 transition-all duration-300 rounded-lg font-medium ${
                    copied 
                      ? 'bg-[#8BC34A] hover:bg-[#7CB342] text-white shadow-md' 
                      : 'bg-[#FFB300] hover:bg-[#FFA000] text-[#6D4C41] shadow-md hover:shadow-lg'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      <span className="text-xs sm:text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      <span className="text-xs sm:text-sm">Copy</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Post Preview */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-sm sm:text-base font-semibold text-[#6D4C41] flex items-center gap-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
              <div className="p-1 bg-gradient-to-r from-[#B3E5FC]/20 to-[#FFB300]/20 rounded-lg">
                🍯
              </div>
              <span className="truncate">Sweet Preview</span>
            </h3>
            <div className="bg-white/90 backdrop-blur-sm border border-[#FFB300]/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300">
              <h4 className="text-sm sm:text-base font-bold text-[#6D4C41] mb-2 sm:mb-3 line-clamp-2 leading-relaxed" style={{ fontFamily: 'var(--font-family-heading)' }}>
                {post.title}
              </h4>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-[#FFB300] to-[#FFA000] rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-white">{post.author.charAt(0).toUpperCase()}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs sm:text-sm font-medium text-[#6D4C41] truncate block" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    by {post.author}
                  </span>
                  <div className="text-xs text-[#6D4C41]/60 truncate">🐝 Community Contributor</div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#6D4C41]/70 line-clamp-2 sm:line-clamp-3 leading-relaxed" style={{ fontFamily: 'var(--font-family-primary)' }}>
                {shareContent}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}