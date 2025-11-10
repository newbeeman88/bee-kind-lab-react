import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { MapPin, Users, Plus, Eye, Clock } from 'lucide-react';

// Importing SVGs as components
import {
  SleepyBeeIcon,
  ThreeHivesIcon,


} from './MyIcons';


interface User {
  username: string;
  email: string;
  bio?: string;
  location?: string;
  experience?: string;
  profilePhoto?: string;
}

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  location: string;
  category: string;
  image?: string;
  admin: string;
  createdDate: string;
}



const mockCommunities: Community[] = [
  {
    id: 'c1',
    name: 'Urban Beekeepers Alliance',
    description: 'A community for beekeepers in urban environments sharing tips, tricks, and experiences about maintaining hives in the city.',
    memberCount: 127,
    isJoined: true,
    location: 'New York City',
    category: 'Urban Beekeeping',
    admin: 'CityBeeKeeper',
    createdDate: '2 months ago'
  },
  {
    id: 'c2',
    name: 'Beginner Beekeepers Support',
    description: 'Perfect for those just starting their beekeeping journey. Get mentorship and guidance from experienced beekeepers.',
    memberCount: 89,
    isJoined: false,
    location: 'Global',
    category: 'Education',
    admin: 'BeeMentor',
    createdDate: '3 months ago'
  },
  {
    id: 'c3',
    name: 'Queen Breeding Specialists',
    description: 'Advanced community focused on queen breeding techniques, genetics, and improving bee stock quality.',
    memberCount: 45,
    isJoined: false,
    location: 'Pacific Northwest',
    category: 'Breeding',
    admin: 'QueenBreeder',
    createdDate: '1 month ago'
  },
  {
    id: 'c4',
    name: 'Natural Beekeeping Circle',
    description: 'For those interested in treatment-free and natural beekeeping methods. Focus on sustainable practices.',
    memberCount: 203,
    isJoined: true,
    location: 'California',
    category: 'Natural Methods',
    admin: 'NaturalBeeGuru',
    createdDate: '6 months ago'
  }
];



interface CommunityProps {
  isLoggedIn: boolean;
  user?: User | null;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export function Community({ isLoggedIn, user, onLoginClick, onRegisterClick }: CommunityProps) {
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);

  // Create Community Form State
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    location: '',
    category: ''
  });



  const handleJoinCommunity = (communityId: string) => {
    if (!isLoggedIn) return;
    
    setCommunities(prev => 
      prev.map(community => 
        community.id === communityId 
          ? { 
              ...community, 
              isJoined: !community.isJoined,
              memberCount: community.isJoined ? community.memberCount - 1 : community.memberCount + 1
            }
          : community
      )
    );
  };

  const handleCreateCommunity = () => {
    if (!isLoggedIn || !user) return;

    const community: Community = {
      id: `c${Date.now()}`,
      name: newCommunity.name,
      description: newCommunity.description,
      memberCount: 1,
      isJoined: true,
      location: newCommunity.location,
      category: newCommunity.category,
      admin: user.username,
      createdDate: 'Just now'
    };

    setCommunities(prev => [community, ...prev]);
    setNewCommunity({ name: '', description: '', location: '', category: '' });
    setShowCreateCommunity(false);
  };



  const handleJoinCommunityClick = (communityId: string) => {
    if (!isLoggedIn) {
      if (onLoginClick) {
        onLoginClick();
      } else {
        alert('Please sign in to join communities');
      }
      return;
    }
    handleJoinCommunity(communityId);
  };

  const handleCreateCommunityClick = () => {
    if (!isLoggedIn) {
      if (onLoginClick) {
        onLoginClick();
      } else {
        alert('Please sign in to create communities');
      }
      return;
    }
    setShowCreateCommunity(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Non-logged user banner */}
      {!isLoggedIn && (
        <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SleepyBeeIcon size={32} className="text-primary" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Join The BeeKind Lab!</h3>
                <p className="text-sm text-muted-foreground">
                  Sign in to join communities, attend events, and connect with fellow beekeepers.
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={onLoginClick}>
                Sign In
              </Button>
              <Button size="sm" onClick={onRegisterClick}>
                Join Lab
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <ThreeHivesIcon size={32} />
          <div>
            <h1 className="text-foreground">Our Community</h1>
            <p className="text-muted-foreground">
              {isLoggedIn 
                ? "Connect, learn, and grow together 🐝" 
                : "Discover beekeeping communities and events near you 🐝"
              }
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          {isLoggedIn ? (
            <Dialog open={showCreateCommunity} onOpenChange={setShowCreateCommunity}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Community</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <ThreeHivesIcon size={20} />
                  <span>Create New Community</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  placeholder="Community name"
                  value={newCommunity.name}
                  onChange={(e) => setNewCommunity(prev => ({ ...prev, name: e.target.value }))}
                />
                <Textarea
                  placeholder="Describe your community..."
                  value={newCommunity.description}
                  onChange={(e) => setNewCommunity(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
                <Input
                  placeholder="Location"
                  value={newCommunity.location}
                  onChange={(e) => setNewCommunity(prev => ({ ...prev, location: e.target.value }))}
                />
                <Input
                  placeholder="Category (e.g., Urban Beekeeping, Education)"
                  value={newCommunity.category}
                  onChange={(e) => setNewCommunity(prev => ({ ...prev, category: e.target.value }))}
                />
                <div className="flex space-x-2 pt-2">
                  <Button 
                    onClick={handleCreateCommunity}
                    disabled={!newCommunity.name || !newCommunity.description}
                    className="flex-1"
                  >
                    Create Community
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateCommunity(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
            </Dialog>
          ) : (
            <Button onClick={handleCreateCommunityClick} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Community</span>
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      {!isLoggedIn && (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-primary mb-1">{communities.length}</div>
              <p className="text-xs text-muted-foreground">Active Communities</p>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-secondary mb-1">
                {communities.reduce((sum, c) => sum + c.memberCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Total Members</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Community Section Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 p-3 bg-primary/10 rounded-lg">
          <ThreeHivesIcon size={20} />
          <h2 className="font-semibold text-foreground">
            {isLoggedIn ? 'Your Communities' : 'Discover Communities'}
          </h2>
        </div>
      </div>

      {/* Communities Section */}
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {communities.map((community) => (
            <Card key={community.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center space-x-2 mb-2">
                      <ThreeHivesIcon size={20} />
                      <span className="text-lg">{community.name}</span>
                    </CardTitle>
                    <Badge variant="secondary" className="mb-2">
                      {community.category}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleJoinCommunityClick(community.id)}
                    variant={isLoggedIn && community.isJoined ? "outline" : "default"}
                    size="sm"
                    className="ml-2"
                  >
                    {!isLoggedIn ? 'Sign in to Join' : community.isJoined ? 'Leave' : 'Join'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {community.description}
                </p>
                {!isLoggedIn && (
                  <div className="mb-3 p-2 bg-primary/5 border border-primary/20 rounded text-xs text-primary">
                    <Eye className="w-3 h-3 inline mr-1" />
                    Sign in to join and participate
                  </div>
                )}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{community.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{community.memberCount} members</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <SleepyBeeIcon size={16} />
                    <span>Admin: {community.admin}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Created {community.createdDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}