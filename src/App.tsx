import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { HeroCarousel } from '../components/HeroCarousel';
import { PostFeed } from '../components/PostFeed';
import { MyPosts } from '../components/MyPosts';
import { AccountSettings } from '../components/AccountSettings';
import { Community } from '../components/Community';
import { Events } from '../components/Events';
import { AuthModal } from '../components/AuthModal';
import { AIChatBox } from '../components/AIChatBox';
import { CreatePostModal } from '../components/CreatePostModal';
import { Toaster } from '../components/ui/sonner';

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

interface User {
  username: string;
  email: string;
  bio?: string;
  location?: string;
  experience?: string;
  profilePhoto?: string;
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

// Extended mock data for community posts
const allMockPosts: Post[] = [
  {
    id: '1',
    title: 'First Honey Harvest Success!',
    content: 'Just completed my first honey harvest after two years of beekeeping. The bees were incredibly productive this season, and I managed to extract about 40 pounds of golden honey from my two hives. The color is absolutely gorgeous - a beautiful amber gold that catches the light perfectly.',
    author: 'HoneyBeeKeeper42',
    date: '2 days ago',
    image: 'https://images.unsplash.com/photo-1586779161164-d89795b07b71?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGJlZXxlbnwwfHwwfHx8MA%3D%3D',
    likes: 24,
    upvotes: 18,
    downvotes: 1,
    comments: 12
  },
  {
    id: '2',
    title: 'Dealing with Varroa Mites - What Works?',
    content: 'I noticed some signs of varroa mites in my hive last week during my regular inspection. Has anyone had success with formic acid strips? Looking for advice on the most effective treatment methods.',
    author: 'BuzzingBeeGuru',
    date: '4 days ago',
    image: 'https://images.unsplash.com/photo-1522325636832-5dbc1440f793?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWl0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900',
    likes: 15,
    upvotes: 12,
    downvotes: 0,
    comments: 8
  },
  {
    id: '3',
    title: 'Winter Prep Checklist',
    content: 'As we head into the colder months, I wanted to share my winter preparation checklist for fellow beekeepers. Making sure our colonies are ready is crucial for their survival.',
    author: 'SeasonedKeeper',
    date: '1 week ago',
    image: 'https://images.unsplash.com/photo-1420585269105-d908ec316eb3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ludGVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900',
    likes: 31,
    upvotes: 25,
    downvotes: 2,
    comments: 16
  },
  {
    id: '4',
    title: 'Beautiful Queen Cell Development',
    content: 'Found these gorgeous queen cells during my latest inspection. The bees are preparing to swarm, so I\'m getting ready to split the hive. Nature is truly amazing! The cells are perfectly formed and the bees have been feeding the developing queens with royal jelly.',
    author: 'QueenBeeWatcher',
    date: '1 week ago',
    image: 'https://images.unsplash.com/photo-1750582467171-c4e6b6fa482c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVlZW4lMjBjZWxsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900',
    likes: 19,
    upvotes: 14,
    downvotes: 0,
    comments: 7
  },
  {
    id: '5',
    title: 'Beginner\'s Guide to Hive Inspections',
    content: 'For those just starting out, here\'s what I wish I knew about hive inspections when I began. Regular inspections are key to maintaining healthy colonies, but knowing what to look for takes practice. Check for queen presence, adequate food stores, signs of disease, and overall colony strength.',
    author: 'NewBeeHelper',
    date: '2 weeks ago',
    image: 'https://images.unsplash.com/photo-1556316830-8fce5824a0f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlZWtlZXBlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900',
    likes: 42,
    upvotes: 35,
    downvotes: 1,
    comments: 23
  },
  {
    id: '6',
    title: 'Amazing Propolis Collection This Year',
    content: 'My bees have been incredibly busy collecting propolis this season. I\'ve harvested quite a bit and am experimenting with different uses. Anyone else working with propolis? The antimicrobial properties are fascinating and I\'ve found it helpful for minor cuts and skin irritations.',
    author: 'PropolisExpert',
    date: '2 weeks ago',
    image: 'https://plus.unsplash.com/premium_photo-1663099574519-6f50b512cc69?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFByb3BvbGlzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900',
    likes: 17,
    upvotes: 13,
    downvotes: 0,
    comments: 9
  },
  {
    id: '7',
    title: 'Spring Splits and Colony Growth',
    content: 'Made splits from my strongest hives this spring. All four splits have accepted their new queens and are building up nicely. Planning to overwinter 8 colonies this year instead of just 4. The key is timing and making sure the parent colony is strong enough.',
    author: 'SplitMaster',
    date: '3 weeks ago',
    image: 'https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hlcnJ5JTIwYmxvc3NvbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900',
    likes: 28,
    upvotes: 22,
    downvotes: 1,
    comments: 14
  },
  {
    id: '8',
    title: 'Installing Package Bees Success!',
    content: 'Got two 3-pound packages installed today. The bees seem to be settling in well and have already started drawing comb. Weather has been perfect for the installation - warm and sunny. Made sure to feed them sugar syrup to help with comb building.',
    author: 'PackagePro',
    date: '3 weeks ago',
    image: 'https://plus.unsplash.com/premium_photo-1753866919717-39379e689744?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGJlZSUyMHBhY2thZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900',
    likes: 21,
    upvotes: 18,
    downvotes: 0,
    comments: 11
  },
  {
    id: '9',
    title: 'Swarm Season Management Tips',
    content: 'Busy time of year managing swarm preparations. Added supers, did some splits, and still caught two swarms in my bait hives. Nothing quite like the excitement of capturing a swarm! Here are my top tips for swarm prevention and capture.',
    author: 'SwarmCatcher',
    date: '1 month ago',
    image: 'https://images.unsplash.com/photo-1675110577141-19572eb35624?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFN3YXJtfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900',
    likes: 33,
    upvotes: 27,
    downvotes: 2,
    comments: 18
  },
  {
    id: '10',
    title: 'DIY Hive Beetle Traps That Actually Work',
    content: 'After dealing with small hive beetles for years, I finally found a DIY trap design that works consistently. Using simple materials and this design, I\'ve dramatically reduced beetle populations in my hives. Happy to share the plans!',
    author: 'BeetleBuster',
    date: '1 month ago',
    image: 'https://images.unsplash.com/photo-1516434464077-12b1b87bb716?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVldGxlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900',
    likes: 39,
    upvotes: 31,
    downvotes: 1,
    comments: 25
  }
];

// Initial posts to display (first 6 posts)
const initialMockPosts: Post[] = allMockPosts.slice(0, 6);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialMockPosts);
  const [displayedPostsCount, setDisplayedPostsCount] = useState(6); // How many posts to show
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('honey-gold');

  // Initialize theme on load
  useEffect(() => {
    // Load saved preferences from localStorage if available
    const savedTheme = localStorage.getItem('hive-hub-theme') || 'honey-gold';
    const savedDarkMode = localStorage.getItem('hive-hub-dark-mode') === 'true';
    
    setCurrentTheme(savedTheme);
    setIsDarkMode(savedDarkMode);
    handleThemeChange(savedTheme, savedDarkMode);
  }, []);

  const handleLogin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // In a real app, this would make an API call to validate credentials
      // For now, we'll simulate a brief delay and some basic validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, this would be done by the backend
      if (email === 'test@example.com' && password === 'wrongpassword') {
        return { success: false, error: 'Invalid email or password' };
      }
      
      // Simulate successful login
      const username = email.split('@')[0];
      setUser({ username, email });
      setIsLoggedIn(true);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const handleRegister = async (username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // In a real app, this would make an API call to create the account
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock validation - check if user already exists
      if (email === 'existing@example.com') {
        return { success: false, error: 'An account with this email already exists' };
      }
      
      if (username.toLowerCase() === 'existinguser') {
        return { success: false, error: 'This username is already taken' };
      }
      
      // Simulate successful registration
      setUser({ username, email });
      setIsLoggedIn(true);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPage('home'); // Redirect to home page when logging out
  };

  const handleCreatePost = (title: string, content: string, image?: string) => {
    if (!user) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title,
      content,
      author: user.username,
      date: formatTimestamp(new Date()),
      image,
      likes: 0,
      upvotes: 0,
      downvotes: 0,
      comments: 0
    };

    // Add post to the beginning of the posts array
    setPosts(prevPosts => [newPost, ...prevPosts]);
    
    // Increase displayed count to show the new post
    setDisplayedPostsCount(prev => prev + 1);
    
    setShowCreatePost(false);
    
    // Show success message
    console.log('Post created successfully:', newPost);
  };

  const handleUpdatePost = (postId: string, updates: Partial<Post>) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      )
    );
    
    // Also update the allMockPosts if the post exists there
    const mockPostIndex = allMockPosts.findIndex(post => post.id === postId);
    if (mockPostIndex !== -1) {
      allMockPosts[mockPostIndex] = { ...allMockPosts[mockPostIndex], ...updates };
    }
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  // Get user's own posts
  const getUserPosts = () => {
    if (!user) return [];
    return posts.filter(post => post.author === user.username);
  };

  // Get all available posts (including new user posts + remaining mock posts)
  const getAllAvailablePosts = () => {
    const userPosts = posts.filter(post => !allMockPosts.some(mockPost => mockPost.id === post.id));
    return [...userPosts, ...allMockPosts];
  };

  // Get currently displayed posts
  const getDisplayedPosts = () => {
    const allAvailable = getAllAvailablePosts();
    return allAvailable.slice(0, displayedPostsCount);
  };

  // Check if there are more posts to load
  const hasMorePosts = () => {
    const allAvailable = getAllAvailablePosts();
    return displayedPostsCount < allAvailable.length;
  };

  // Load more posts
  const handleLoadMorePosts = async () => {
    if (isLoadingMore || !hasMorePosts()) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setDisplayedPostsCount(prev => Math.min(prev + 4, getAllAvailablePosts().length));
    setIsLoadingMore(false);
  };

  const openLoginModal = () => {
    setAuthModalTab('login');
    setShowAuthModal(true);
  };

  const openRegisterModal = () => {
    setAuthModalTab('register');
    setShowAuthModal(true);
  };

  const handleChatClick = () => {
    setShowChat(true);
  };

  const handleChatToggle = (isOpen: boolean) => {
    setShowChat(isOpen);
  };

  const handleNavigate = (page: string) => {
    console.log('handleNavigate called with page:', page);
    console.log('Current page before:', currentPage);
    setCurrentPage(page);
    console.log('Current page after setCurrentPage:', page);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleThemeChange = (theme: string, darkMode: boolean) => {
    setCurrentTheme(theme);
    setIsDarkMode(darkMode);
    
    // Save preferences to localStorage
    localStorage.setItem('hive-hub-theme', theme);
    localStorage.setItem('hive-hub-dark-mode', darkMode.toString());
    
    // Apply theme to document
    const root = document.documentElement;
    
    // Apply dark/light mode
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Apply theme-specific CSS variables
    const themes = {
      'honey-gold': {
        '--primary': '#FFB300',
        '--secondary': '#8BC34A',
        '--accent': '#8BC34A',
        '--muted': '#B3E5FC',
        '--ring': '#FFB300',
        '--sidebar-primary': '#FFB300',
        '--sidebar-accent': '#8BC34A',
        '--sidebar-ring': '#FFB300',
      },
      'ocean-breeze': {
        '--primary': '#0077BE',
        '--secondary': '#00A86B', 
        '--accent': '#20B2AA',
        '--muted': '#87CEEB',
        '--ring': '#0077BE',
        '--sidebar-primary': '#0077BE',
        '--sidebar-accent': '#20B2AA',
        '--sidebar-ring': '#0077BE',
      },
      'lavender-dream': {
        '--primary': '#9C27B0',
        '--secondary': '#E91E63',
        '--accent': '#FF4081',
        '--muted': '#DDA0DD',
        '--ring': '#9C27B0',
        '--sidebar-primary': '#9C27B0',
        '--sidebar-accent': '#FF4081',
        '--sidebar-ring': '#9C27B0',
      },
      'forest-green': {
        '--primary': '#2E7D32',
        '--secondary': '#66BB6A',
        '--accent': '#4CAF50',
        '--muted': '#A5D6A7',
        '--ring': '#2E7D32',
        '--sidebar-primary': '#2E7D32',
        '--sidebar-accent': '#4CAF50',
        '--sidebar-ring': '#2E7D32',
      },
      'sunset-orange': {
        '--primary': '#FF6F00',
        '--secondary': '#FF8F00',
        '--accent': '#FFA726',
        '--muted': '#FFCC02',
        '--ring': '#FF6F00',
        '--sidebar-primary': '#FF6F00',
        '--sidebar-accent': '#FFA726',
        '--sidebar-ring': '#FF6F00',
      },
      'deep-purple': {
        '--primary': '#512DA8',
        '--secondary': '#7C4DFF',
        '--accent': '#9C27B0',
        '--muted': '#BA68C8',
        '--ring': '#512DA8',
        '--sidebar-primary': '#512DA8',
        '--sidebar-accent': '#9C27B0',
        '--sidebar-ring': '#512DA8',
      }
    };
    
    const selectedTheme = themes[theme as keyof typeof themes];
    if (selectedTheme) {
      Object.entries(selectedTheme).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'events':
        return (
          <section className="relative">
            <Events 
              isLoggedIn={isLoggedIn}
              user={user}
              onLoginClick={openLoginModal}
              onRegisterClick={openRegisterModal}
            />
          </section>
        );
      case 'community':
        return (
          <section className="relative">
            <Community 
              isLoggedIn={isLoggedIn}
              user={user}
              onLoginClick={openLoginModal}
              onRegisterClick={openRegisterModal}
            />
          </section>
        );
      case 'my-posts':
        return (
          <section className="relative">
            <MyPosts 
              user={user}
              posts={getUserPosts()}
              onCreatePost={() => setShowCreatePost(true)}
              onUpdatePost={handleUpdatePost}
              onDeletePost={handleDeletePost}
            />
          </section>
        );
      case 'account-settings':
        return (
          <section className="relative">
            <AccountSettings 
              user={user}
              onUpdateUser={handleUpdateUser}
              isDarkMode={isDarkMode}
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
            />
          </section>
        );
      case 'about':
        return (
          <section className="relative">
            <div className="max-w-4xl mx-auto px-4 py-12">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  About The Hive Hub 🐝
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Welcome to the sweetest community for beekeepers! Learn, share, and grow together in our buzzing ecosystem.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                  <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
                    Our Mission 🍯
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Hive Hub is dedicated to bringing together beekeepers of all experience levels to share knowledge, 
                    celebrate successes, and support each other through challenges. From first-time hive inspections to 
                    advanced queen rearing techniques, we're here to help you succeed.
                  </p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                  <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
                    Community Features 🌻
                  </h2>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Share your beekeeping experiences and photos</li>
                    <li>• Join local events and workshops</li>
                    <li>• Get help from experienced beekeepers</li>
                    <li>• Learn from our AI beekeeping assistant</li>
                    <li>• Connect with fellow apiarists in your area</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-primary/20 border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  Join Our Sweet Community! 🏡
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Whether you're a seasoned beekeeper or just getting started, The Hive Hub is your home for all things beekeeping. 
                  Join thousands of passionate apiarists sharing their knowledge and experiences.
                </p>
                {!isLoggedIn && (
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={openLoginModal}
                      className="px-6 py-3 border border-primary text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                      style={{ fontFamily: 'var(--font-family-primary)' }}
                    >
                      Log In
                    </button>
                    <button 
                      onClick={openRegisterModal}
                      className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{ fontFamily: 'var(--font-family-primary)' }}
                    >
                      Join the Hive! 🍯
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="px-4 py-8">
              <div className="max-w-7xl mx-auto">
                <HeroCarousel />
              </div>
            </section>

            {/* Post Feed Section */}
            <section className="relative">
              <PostFeed 
                isLoggedIn={isLoggedIn}
                currentUser={user}
                posts={getDisplayedPosts()}
                onCreatePost={() => setShowCreatePost(true)}
                onUpdatePost={handleUpdatePost}
                onLoadMore={handleLoadMorePosts}
                hasMorePosts={hasMorePosts()}
                isLoadingMore={isLoadingMore}
              />
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Dynamic Gradient Background - Green Nature Theme */}
      <div className="fixed inset-0 -z-10">
        {/* Base green gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F1F8E9] via-[#E8F5E8] to-[#C8E6C8] opacity-95"></div>
        {/* Secondary green overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#66BB6A]/20 via-[#8BC34A]/15 to-[#A5D6A7]/25"></div>
        {/* Honey accent spots */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFB300]/12 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#4CAF50]/18 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/6 w-64 h-64 bg-[#81C784]/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        {/* Additional nature spots */}
        <div className="absolute top-1/2 left-1/6 w-72 h-72 bg-[#66BB6A]/12 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-[#A5D6A7]/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <Navigation
        isLoggedIn={isLoggedIn}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLoginClick={openLoginModal}
        onLogout={handleLogout}
        onRegisterClick={openRegisterModal}
        onChatClick={handleChatClick}
        user={user}
      />
      
      <main>
        {renderCurrentPage()}
      </main>

      {/* Modals and Floating Components */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        defaultTab={authModalTab}
      />

      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onCreatePost={handleCreatePost}
      />

      <AIChatBox 
        isLoggedIn={isLoggedIn} 
        showChat={showChat}
        onChatToggle={handleChatToggle}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}