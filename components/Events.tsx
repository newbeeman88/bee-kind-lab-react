import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

import {
  SleepyBeeIcon,
  HoneyJarIcon,
  HeartBeatIcon,
  PiuCalendarIcon,

} from './MyIcons';

import { Calendar, MapPin, Clock, Users, ChevronRight, Plus, Edit, Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from './fallback/ImageWithFallback';

interface User {
  username: string;
  email: string;
  bio?: string;
  location?: string;
  experience?: string;
  profilePhoto?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'meetup' | 'harvest' | 'seasonal' | 'online';
  attendees: number;
  maxAttendees?: number;
  organizer: string;
  image?: string;
  tags: string[];
  isPublic: boolean;
  price?: string;
  isAttending?: boolean;
}

interface EventsProps {
  isLoggedIn: boolean;
  user?: User | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

// Mock events data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Spring Hive Inspection Workshop',
    description: 'Learn the essential techniques for conducting thorough spring hive inspections. We\'ll cover what to look for, how to assess colony health, and when to take action. Perfect for beginners and intermediate beekeepers.',
    date: '2024-10-15',
    time: '10:00 AM',
    location: 'Sunny Meadows Apiary, 123 Honey Lane',
    type: 'workshop',
    attendees: 12,
    maxAttendees: 20,
    organizer: 'Master Beekeeper Sarah',
    image: 'https://images.unsplash.com/photo-1504392022767-a8fc0771f239?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1335',
    tags: ['beginner-friendly', 'hands-on', 'inspection'],
    isPublic: true,
    price: '$25',
    isAttending: false
  },
  {
    id: '2',
    title: 'Local Beekeepers Monthly Meetup',
    description: 'Join fellow beekeepers for our monthly gathering! Share experiences, troubleshoot challenges, and enjoy honey tastings from local hives. This month we\'ll discuss winter preparation strategies.',
    date: '2024-10-20',
    time: '2:00 PM',
    location: 'Community Center, Downtown',
    type: 'meetup',
    attendees: 28,
    maxAttendees: 50,
    organizer: 'BeeKind Lab Community',
    tags: ['community', 'networking', 'discussion'],
    isPublic: true,
    isAttending: false
  },
  {
    id: '3',
    title: 'Autumn Honey Harvest Festival',
    description: 'Celebrate the season\'s harvest! Watch honey extraction demonstrations, taste varieties from local hives, and learn about different honey processing techniques. Family-friendly event with activities for kids.',
    date: '2024-10-28',
    time: '11:00 AM',
    location: 'Golden Valley Farm',
    type: 'harvest',
    attendees: 45,
    maxAttendees: 100,
    organizer: 'Golden Valley Beekeepers',
    image: 'https://plus.unsplash.com/premium_photo-1661436218530-7e186ab76c3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGJlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900',
    tags: ['harvest', 'family-friendly', 'tasting'],
    isPublic: true,
    price: '$15',
    isAttending: false
  },
  {
    id: '4',
    title: 'Online: Queen Rearing Masterclass',
    description: 'Advanced techniques for raising healthy queens. This comprehensive online session covers selection, grafting, mating nucs, and colony management. Includes downloadable resources and Q&A session.',
    date: '2024-11-05',
    time: '7:00 PM',
    location: 'Virtual Event (Zoom)',
    type: 'online',
    attendees: 67,
    maxAttendees: 200,
    organizer: 'Dr. Bee Professor',
    tags: ['advanced', 'queen-rearing', 'virtual'],
    isPublic: true,
    price: '$40',
    isAttending: false
  },
  {
    id: '5',
    title: 'Winter Hive Prep Workshop',
    description: 'Essential preparations for overwinter success. Learn about insulation, ventilation, feeding strategies, and pest management for the cold months ahead. Hands-on practice with equipment.',
    date: '2024-11-12',
    time: '9:00 AM',
    location: 'Riverside Apiary',
    type: 'seasonal',
    attendees: 8,
    maxAttendees: 15,
    organizer: 'Winter Prep Experts',
    tags: ['winter', 'preparation', 'seasonal'],
    isPublic: true,
    price: '$35',
    isAttending: false
  },
  {
    id: '6',
    title: 'Beginner Beekeeping Course (3-Day)',
    description: 'Complete introduction to beekeeping over three intensive days. Covers equipment, biology, management, safety, and hands-on practice. Includes starter kit and ongoing support.',
    date: '2024-11-18',
    time: '9:00 AM',
    location: 'Beekeeping Academy',
    type: 'workshop',
    attendees: 6,
    maxAttendees: 12,
    organizer: 'Beekeeping Academy',
    image: 'https://plus.unsplash.com/premium_photo-1700145523692-37b02e57ae71?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGJlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900',
    tags: ['beginner', 'course', 'comprehensive'],
    isPublic: true,
    price: '$150',
    isAttending: false
  }
];

export function Events({ isLoggedIn, user, onLoginClick, onRegisterClick }: EventsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  
  // Create Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'workshop' as Event['type'],
    maxAttendees: '',
    price: '',
    tags: '',
    image: ''
  });

  // Edit Event Form State
  const [editEvent, setEditEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'workshop' as Event['type'],
    maxAttendees: '',
    price: '',
    tags: '',
    image: ''
  });

  // Image preview states
  const [newEventImagePreview, setNewEventImagePreview] = useState<string>('');
  const [editEventImagePreview, setEditEventImagePreview] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Events', count: events.length },
    { id: 'workshop', label: 'Workshops', count: events.filter(e => e.type === 'workshop').length },
    { id: 'meetup', label: 'Meetups', count: events.filter(e => e.type === 'meetup').length },
    { id: 'harvest', label: 'Harvest Events', count: events.filter(e => e.type === 'harvest').length },
    { id: 'online', label: 'Online Events', count: events.filter(e => e.type === 'online').length },
    { id: 'seasonal', label: 'Seasonal', count: events.filter(e => e.type === 'seasonal').length }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.type === selectedCategory);

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop':
        return <SleepyBeeIcon size={16} />;
      case 'harvest':
        return <HoneyJarIcon size={16} />;
      case 'meetup':
        return <HeartBeatIcon size={16} />;
      default:
        return <PiuCalendarIcon size={16} />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'harvest':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'meetup':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'online':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'seasonal':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDefaultEventImage = (type: Event['type']) => {
    switch (type) {
      case 'workshop':
        return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop';
      case 'harvest':
        return 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=600&h=300&fit=crop';
      case 'meetup':
        return 'https://images.unsplash.com/photo-1568526381923-caf3fd520382?w=600&h=300&fit=crop';
      case 'online':
        return 'https://plus.unsplash.com/premium_photo-1664299186917-641bf58ff5b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjEyfHxiZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900';
      case 'seasonal':
        return 'https://images.unsplash.com/photo-1522921575-9d14e748e6da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI1fHxiZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900';
      default:
        return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop';
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      if (isEdit) {
        setEditEvent(prev => ({ ...prev, image: imageUrl }));
        setEditEventImagePreview(imageUrl);
      } else {
        setNewEvent(prev => ({ ...prev, image: imageUrl }));
        setNewEventImagePreview(imageUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (isEdit: boolean = false) => {
    if (isEdit) {
      setEditEvent(prev => ({ ...prev, image: '' }));
      setEditEventImagePreview('');
    } else {
      setNewEvent(prev => ({ ...prev, image: '' }));
      setNewEventImagePreview('');
    }
  };

  const handleJoinEvent = (eventId: string) => {
    if (!isLoggedIn || !user) return;

    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? {
              ...event,
              isAttending: !event.isAttending,
              attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1
            }
          : event
      )
    );

    const event = events.find(e => e.id === eventId);
    if (event) {
      toast.success(
        event.isAttending 
          ? `You've left "${event.title}". Sorry to see you go! 🐝` 
          : `You've joined "${event.title}"! See you there! 🎉`
      );
    }
  };

  const handleCreateEvent = () => {
    if (!isLoggedIn || !user) return;

    const event: Event = {
      id: `event-${Date.now()}`,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      type: newEvent.type,
      organizer: user.username,
      attendees: 1,
      maxAttendees: newEvent.maxAttendees ? parseInt(newEvent.maxAttendees) : undefined,
      price: newEvent.price || undefined,
      tags: newEvent.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      isPublic: true,
      isAttending: true,
      image: newEvent.image || getDefaultEventImage(newEvent.type)
    };

    setEvents(prevEvents => [event, ...prevEvents]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'workshop',
      maxAttendees: '',
      price: '',
      tags: '',
      image: ''
    });
    setNewEventImagePreview('');
    setShowCreateEvent(false);
    
    toast.success(`"${event.title}" has been created successfully! 🎉`);
  };

  const handleCreateEventClick = () => {
    if (!isLoggedIn) {
      onLoginClick();
      return;
    }
    setShowCreateEvent(true);
  };

  const handleEditEventClick = (event: Event) => {
    setEditingEventId(event.id);
    setEditEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      maxAttendees: event.maxAttendees?.toString() || '',
      price: event.price || '',
      tags: event.tags.join(', '),
      image: event.image || ''
    });
    setEditEventImagePreview(event.image || '');
    setShowEditEvent(true);
  };

  const handleUpdateEvent = () => {
    if (!isLoggedIn || !user || !editingEventId) return;

    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === editingEventId
          ? {
              ...event,
              title: editEvent.title,
              description: editEvent.description,
              date: editEvent.date,
              time: editEvent.time,
              location: editEvent.location,
              type: editEvent.type,
              maxAttendees: editEvent.maxAttendees ? parseInt(editEvent.maxAttendees) : undefined,
              price: editEvent.price || undefined,
              tags: editEvent.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
              image: editEvent.image || event.image || getDefaultEventImage(editEvent.type)
            }
          : event
      )
    );

    const updatedEvent = events.find(e => e.id === editingEventId);
    setEditEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'workshop',
      maxAttendees: '',
      price: '',
      tags: '',
      image: ''
    });
    setEditEventImagePreview('');
    setShowEditEvent(false);
    setEditingEventId(null);
    
    toast.success(`\"${updatedEvent?.title}\" has been updated successfully! ✨`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <PiuCalendarIcon size={48} className="mr-3" />
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Community Events 🗓️
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join fellow beekeepers for workshops, meetups, and seasonal celebrations. Learn, share, and grow together in our buzzing community!
            </p>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 border ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-background hover:bg-primary/5 text-foreground border-border hover:border-primary/30'
            }`}
          >
            {getEventTypeIcon(category.id)}
            <span style={{ fontFamily: 'var(--font-family-primary)' }}>
              {category.label} ({category.count})
            </span>
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback 
                src={event.image || getDefaultEventImage(event.type)} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <Badge className={`${getEventTypeColor(event.type)} border`}>
                  <div className="flex items-center space-x-1">
                    {getEventTypeIcon(event.type)}
                    <span className="capitalize">{event.type}</span>
                  </div>
                </Badge>
              </div>
              {event.price && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary text-primary-foreground border-primary/30">
                    {event.price}
                  </Badge>
                </div>
              )}
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  {event.title}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {event.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-foreground">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <Users className="w-4 h-4 mr-2 text-primary" />
                  <span>
                    {event.attendees} attending
                    {event.maxAttendees && ` / ${event.maxAttendees} max`}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {event.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {event.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{event.tags.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="pt-2">
                {isLoggedIn ? (
                  event.organizer === user?.username ? (
                    <div className="space-y-2">
                      <Button 
                        onClick={() => handleEditEventClick(event)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Edit className="w-4 h-4" />
                          <span>Edit Event</span>
                        </div>
                      </Button>
                      <Button 
                        onClick={() => handleJoinEvent(event.id)}
                        variant="outline"
                        className="w-full"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <span>
                            {event.isAttending ? 'Leave Event' : 'Join Event'}
                          </span>
                        </div>
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => handleJoinEvent(event.id)}
                      className={`w-full transition-all duration-300 ${
                        event.isAttending
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90'
                      }`}
                      disabled={Boolean(!event.isAttending && event.maxAttendees && event.attendees >= event.maxAttendees)}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>
                          {event.isAttending ? 'Leave Event' : 
                           (event.maxAttendees && event.attendees >= event.maxAttendees ? 'Event Full' : 'Join Event')}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Button>
                  )
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground text-center">
                      Join our lab to register for events!
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={onLoginClick}
                        className="flex-1"
                      >
                        Log In
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={onRegisterClick}
                        className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <PiuCalendarIcon size={64} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-foreground mb-2">
            No events found
          </h3>
          <p className="text-muted-foreground">
            Try selecting a different category or check back later for new events!
          </p>
        </div>
      )}

      {/* Call to Action for Event Organizers */}
      <div className="mt-16">
        <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
          <CardContent className="text-center py-8">
            <SleepyBeeIcon size={48} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Organize Your Own Event! 🎉
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have a workshop idea or want to host a meetup? Share your beekeeping knowledge with the community and help fellow apiarists learn and grow together.
            </p>
            {isLoggedIn ? (
              <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 px-8 py-3">
                    <div className="flex items-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>Create Event</span>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto modal-scroll">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <PiuCalendarIcon size={24} />
                      <span>Create New Event</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    {/* Event Image Upload */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Cover Photo</label>
                      <div className="space-y-3">
                        {newEventImagePreview ? (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-border">
                            <img 
                              src={newEventImagePreview} 
                              alt="Event preview"
                              className="w-full h-full object-cover"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              className="absolute top-2 right-2"
                              onClick={() => handleRemoveImage(false)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                            <label htmlFor="new-event-image" className="cursor-pointer">
                              <div className="flex flex-col items-center space-y-2">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Upload className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground">Upload event photo</p>
                                  <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                                </div>
                              </div>
                              <input
                                id="new-event-image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, false)}
                              />
                            </label>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                          <ImageIcon className="w-3 h-3 inline mr-1" />
                          A default image will be used if none is uploaded
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Event Title *</label>
                        <Input
                          placeholder="e.g., Spring Hive Inspection Workshop"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Description *</label>
                        <Textarea
                          placeholder="Describe your event, what attendees will learn or experience..."
                          value={newEvent.description}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                          rows={4}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Date *</label>
                        <Input
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Time *</label>
                        <Input
                          type="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Location *</label>
                        <Input
                          placeholder="e.g., Sunny Meadows Apiary, 123 Honey Lane or Virtual (Zoom)"
                          value={newEvent.location}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Event Type *</label>
                        <Select value={newEvent.type} onValueChange={(value: Event['type']) => setNewEvent(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="meetup">Meetup</SelectItem>
                            <SelectItem value="harvest">Harvest Event</SelectItem>
                            <SelectItem value="seasonal">Seasonal</SelectItem>
                            <SelectItem value="online">Online Event</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Max Attendees</label>
                        <Input
                          type="number"
                          placeholder="Leave empty for unlimited"
                          value={newEvent.maxAttendees}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, maxAttendees: e.target.value }))}
                          min="1"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Price</label>
                        <Input
                          placeholder="e.g., $25 or Free"
                          value={newEvent.price}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, price: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Tags</label>
                        <Input
                          placeholder="e.g., beginner-friendly, hands-on, inspection"
                          value={newEvent.tags}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, tags: e.target.value }))}
                        />
                        <p className="text-xs text-muted-foreground mt-1">Separate multiple tags with commas</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        onClick={handleCreateEvent}
                        disabled={!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.location}
                        className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
                      >
                        Create Event
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowCreateEvent(false)}
                        className="flex-shrink-0"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Join our community to start organizing events
                </p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" onClick={onLoginClick}>
                    Log In
                  </Button>
                  <Button 
                    onClick={handleCreateEventClick}
                    className="bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    Join our sweet lab!
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={showEditEvent} onOpenChange={setShowEditEvent}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto modal-scroll">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="w-5 h-5" />
              <span>Edit Event</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {/* Event Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Event Cover Photo</label>
              <div className="space-y-3">
                {editEventImagePreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-border">
                    <img 
                      src={editEventImagePreview} 
                      alt="Event preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => handleRemoveImage(true)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <label htmlFor="edit-event-image" className="cursor-pointer">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Upload event photo</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                        </div>
                      </div>
                      <input
                        id="edit-event-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, true)}
                      />
                    </label>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  <ImageIcon className="w-3 h-3 inline mr-1" />
                  A default image will be used if none is uploaded
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Event Title *</label>
                <Input
                  placeholder="e.g., Spring Hive Inspection Workshop"
                  value={editEvent.title}
                  onChange={(e) => setEditEvent(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description *</label>
                <Textarea
                  placeholder="Describe your event, what attendees will learn or experience..."
                  value={editEvent.description}
                  onChange={(e) => setEditEvent(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Date *</label>
                <Input
                  type="date"
                  value={editEvent.date}
                  onChange={(e) => setEditEvent(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Time *</label>
                <Input
                  type="time"
                  value={editEvent.time}
                  onChange={(e) => setEditEvent(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Location *</label>
                <Input
                  placeholder="e.g., Sunny Meadows Apiary, 123 Honey Lane or Virtual (Zoom)"
                  value={editEvent.location}
                  onChange={(e) => setEditEvent(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Event Type *</label>
                <Select value={editEvent.type} onValueChange={(value: Event['type']) => setEditEvent(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="meetup">Meetup</SelectItem>
                    <SelectItem value="harvest">Harvest Event</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                    <SelectItem value="online">Online Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Attendees</label>
                <Input
                  type="number"
                  placeholder="Leave empty for unlimited"
                  value={editEvent.maxAttendees}
                  onChange={(e) => setEditEvent(prev => ({ ...prev, maxAttendees: e.target.value }))}
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <Input
                  placeholder="e.g., $25 or Free"
                  value={editEvent.price}
                  onChange={(e) => setEditEvent(prev => ({ ...prev, price: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <Input
                  placeholder="e.g., beginner-friendly, hands-on, inspection"
                  value={editEvent.tags}
                  onChange={(e) => setEditEvent(prev => ({ ...prev, tags: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground mt-1">Separate multiple tags with commas</p>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                onClick={handleUpdateEvent}
                disabled={!editEvent.title || !editEvent.description || !editEvent.date || !editEvent.time || !editEvent.location}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
              >
                Update Event
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowEditEvent(false);
                  setEditingEventId(null);
                }}
                className="flex-shrink-0"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}