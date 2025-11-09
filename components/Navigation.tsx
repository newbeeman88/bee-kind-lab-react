import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { User, LogOut, Menu } from 'lucide-react';
import { CuteBeeIcon, CuteSettingsIcon, CuteHoneyIcon } from './CuteIcons';

import {
  WritePostsIcon,
  RobotHeartIcon,
  EventsBeeIcon,
  EarthCommunityIcon,
  ContactCowIcon,
  BeeHiveIcon,
} from './MyIcons';


interface User {
  username: string;
  email: string;
  bio?: string;
  location?: string;
  experience?: string;
  profilePhoto?: string;
}

interface NavigationProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  onRegisterClick: () => void;
  onChatClick: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
  user?: User | null;
}

export function Navigation({ isLoggedIn, onLoginClick, onLogout, onRegisterClick, onChatClick, currentPage = 'home', onNavigate, user }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavigation = (page: string) => {
    console.log('Mobile navigation clicked:', page); // Debug log
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false);
  };

  const handleMobileAction = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate?.('home')}>
            <div className="relative">
              <CuteBeeIcon size={32} className="group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1">
                <CuteHoneyIcon size={14} className="animate-bounce [animationDelay: '1s']" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground tracking-tight" style={{ fontFamily: 'var(--font-family-heading)' }}>
                BeeKind Lab
              </span>
              <span className="text-xs text-muted-foreground font-medium -mt-1">BeeKind & BeeNice 🍯</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onNavigate?.('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                currentPage === 'home' 
                  ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                  : 'text-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <BeeHiveIcon size={18} className="fill-current" />
              <span style={{ fontFamily: 'var(--font-family-primary)' }}>Home</span>
            </button>
            
            {/* Events - Always visible to all users */}
            <button 
              onClick={() => onNavigate?.('events')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                currentPage === 'events' 
                  ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                  : 'text-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <EventsBeeIcon size={18} className="fill-current" />
              <span style={{ fontFamily: 'var(--font-family-primary)' }}>Events</span>
            </button>
            
            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => onNavigate?.('community')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                    currentPage === 'community' 
                      ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <EarthCommunityIcon size={18} className="fill-current" />
                  <span style={{ fontFamily: 'var(--font-family-primary)' }}>Community</span>
                </button>
                <button 
                  onClick={() => onNavigate?.('my-posts')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                    currentPage === 'my-posts' 
                      ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <WritePostsIcon size={18} className="fill-current" />
                  <span style={{ fontFamily: 'var(--font-family-primary)' }}>My Posts</span>
                </button>
                <button 
                  onClick={onChatClick}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300"
                >
                  
                  <RobotHeartIcon size={18} className="fill-current" />
                  <span style={{ fontFamily: 'var(--font-family-primary)' }}>Ask AI</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate?.('about')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                    currentPage === 'about' 
                      ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <ContactCowIcon size={18} className="fill-current" />
                  <span style={{ fontFamily: 'var(--font-family-primary)' }}>About Us</span>
                </button>
                <button 
                  onClick={() => onNavigate?.('community')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                    currentPage === 'community' 
                      ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <EarthCommunityIcon size={18} className="fill-current" />
                  <span style={{ fontFamily: 'var(--font-family-primary)' }}>Community</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Navigation and Auth */}
          <div className="flex items-center space-x-2">
            {/* Mobile User Avatar (only show on mobile when logged in) */}
            {isLoggedIn && (
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-0 border-0 bg-transparent cursor-pointer group">
                      <div className="relative">
                        <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all duration-300 group-hover:scale-105 w-8 h-8">
                          <AvatarImage src={user?.profilePhoto || ""} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-medium text-sm">
                            {user?.username?.charAt(0).toUpperCase() || '🐝'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary rounded-full border border-background animate-pulse"></div>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52 z-50 p-2">
                    <div className="px-3 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg mb-2">
                      <div className="flex items-center space-x-2">
                        <CuteBeeIcon size={16} />
                        <div>
                          <p className="font-medium text-sm" style={{ fontFamily: 'var(--font-family-heading)' }}>
                            {user?.username || 'Busy Bee'} 🐝
                          </p>
                          <p className="text-xs text-muted-foreground">Community Member</p>
                        </div>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleMobileNavigation('account-settings')} className="cursor-pointer">
                      <CuteSettingsIcon size={16} className="mr-2" />
                      <span style={{ fontFamily: 'var(--font-family-primary)' }}>Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <CuteHoneyIcon size={16} className="mr-2" />
                      <span style={{ fontFamily: 'var(--font-family-primary)' }}>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleMobileAction(onLogout)} className="cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      <span style={{ fontFamily: 'var(--font-family-primary)' }}>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden p-2 hover:bg-primary/10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <SheetHeader className="p-6 border-b border-border">
                  <SheetTitle className="flex items-center space-x-3">
                    <div className="relative">
                      <CuteBeeIcon size={28} />
                      <div className="absolute -top-1 -right-1">
                        <CuteHoneyIcon size={12} className="animate-bounce" />
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-bold text-foreground tracking-tight" style={{ fontFamily: 'var(--font-family-heading)' }}>
                        BeeKind Lab
                      </span>
                      <span className="text-xs text-muted-foreground font-medium -mt-1">Sweet Community 🍯</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col p-4 space-y-2">
                  {/* Home */}
                  <button 
                    onClick={() => {
                      console.log('Home clicked');
                      handleMobileNavigation('home');
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left w-full ${
                      currentPage === 'home' 
                        ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <BeeHiveIcon size={18} className="fill-current" />
                    <span style={{ fontFamily: 'var(--font-family-primary)' }}>Home</span>
                  </button>
                  
                  {/* Events - Always visible */}
                  <button 
                    onClick={() => {
                      console.log('Events clicked');
                      handleMobileNavigation('events');
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left w-full ${
                      currentPage === 'events' 
                        ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <EventsBeeIcon size={20} className="fill-current" />
                    <span style={{ fontFamily: 'var(--font-family-primary)' }}>Events</span>
                  </button>
                  
                  {isLoggedIn ? (
                    <>
                      {/* Community */}
                      <button 
                        onClick={() => {
                          console.log('Community clicked');
                          handleMobileNavigation('community');
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left w-full ${
                          currentPage === 'community' 
                            ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                            : 'text-foreground hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <EarthCommunityIcon size={20} className="fill-current" />
                        <span style={{ fontFamily: 'var(--font-family-primary)' }}>Community</span>
                      </button>
                      
                      {/* My Posts */}
                      <button 
                        onClick={() => {
                          console.log('My Posts clicked');
                          handleMobileNavigation('my-posts');
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left w-full ${
                          currentPage === 'my-posts' 
                            ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                            : 'text-foreground hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <WritePostsIcon size={20} className="fill-current" />
                        <span style={{ fontFamily: 'var(--font-family-primary)' }}>My Posts</span>
                      </button>
                      
                      {/* AI Chat */}
                      <button 
                        onClick={() => {
                          console.log('AI Chat clicked');
                          handleMobileAction(onChatClick);
                        }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left w-full text-foreground hover:text-primary hover:bg-primary/5"
                      >
                        <RobotHeartIcon size={20} className="fill-current" />
                        <span style={{ fontFamily: 'var(--font-family-primary)' }}>Ask AI</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* About Us */}
                      <button 
                        onClick={() => {
                          console.log('About clicked');
                          handleMobileNavigation('about');
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left w-full ${
                          currentPage === 'about' 
                            ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                            : 'text-foreground hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <ContactCowIcon size={20} className="fill-current" />
                        <span style={{ fontFamily: 'var(--font-family-primary)' }}>About Us</span>
                      </button>
                      
                      {/* Community */}
                      <button 
                        onClick={() => {
                          console.log('Community (not logged in) clicked');
                          handleMobileNavigation('community');
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left w-full ${
                          currentPage === 'community' 
                            ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                            : 'text-foreground hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <EarthCommunityIcon size={20} className="fill-current" />
                        <span style={{ fontFamily: 'var(--font-family-primary)' }}>Community</span>
                      </button>
                      
                      {/* Authentication Buttons */}
                      <div className="pt-4 border-t border-border mt-4 space-y-3">
                        <Button 
                          variant="outline" 
                          onClick={() => handleMobileAction(onLoginClick)}
                          className="w-full font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-lg h-12"
                          style={{ fontFamily: 'var(--font-family-primary)' }}
                        >
                          Log In
                        </Button>
                        <Button 
                          onClick={() => handleMobileAction(onRegisterClick)}
                          className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-12"
                          style={{ fontFamily: 'var(--font-family-primary)' }}
                        >
                          Join the Hive! 🍯
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Auth Buttons / User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-0 border-0 bg-transparent cursor-pointer group">
                      <div className="relative">
                        <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all duration-300 group-hover:scale-105">
                          <AvatarImage src={user?.profilePhoto || ""} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-medium">
                            {user?.username?.charAt(0).toUpperCase() || '🐝'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-background animate-pulse"></div>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52 z-50 p-2">
                    <div className="px-3 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg mb-2">
                      <div className="flex items-center space-x-2">
                        <CuteBeeIcon size={16} />
                        <div>
                          <p className="font-medium text-sm" style={{ fontFamily: 'var(--font-family-heading)' }}>
                            {user?.username || 'Busy Bee'} 🐝
                          </p>
                          <p className="text-xs text-muted-foreground">Community Member</p>
                        </div>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onNavigate?.('account-settings')} className="cursor-pointer">
                      <CuteSettingsIcon size={16} className="mr-2" />
                      <span style={{ fontFamily: 'var(--font-family-primary)' }}>Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <CuteHoneyIcon size={16} className="mr-2" />
                      <span style={{ fontFamily: 'var(--font-family-primary)' }}>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      <span style={{ fontFamily: 'var(--font-family-primary)' }}>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={onLoginClick}
                    className="font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-full px-6"
                    style={{ fontFamily: 'var(--font-family-primary)' }}
                  >
                    Log In
                  </Button>
                  <Button 
                    onClick={onRegisterClick} 
                    className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 font-medium rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    style={{ fontFamily: 'var(--font-family-primary)' }}
                  >
                    Join the Hive! 🍯
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}