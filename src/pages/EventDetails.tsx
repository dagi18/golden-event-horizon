
import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Tag,
  CheckSquare,
  Printer,
  User,
  Share2
} from 'lucide-react';

const EventDetails = () => {
  const { eventId } = useParams();
  
  // This would normally come from an API
  const eventDetails = {
    id: eventId || '1',
    title: 'Annual Tech Conference 2023',
    date: 'October 15-17, 2023',
    location: 'Convention Center, San Francisco, CA',
    startTime: '9:00 AM',
    endTime: '5:00 PM',
    attendees: 1250,
    registered: 1350,
    checkedIn: 950,
    description: 'Join us for our annual technology conference featuring keynote speakers, workshops, and networking opportunities for professionals in the tech industry.',
    organizer: 'TechEvents Inc.',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'
  };

  return (
    <div className="animate-enter space-y-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{eventDetails.title}</h1>
          <div className="flex items-center mt-2 text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-3">{eventDetails.date}</span>
            <MapPin className="h-4 w-4 mr-1" />
            <span>{eventDetails.location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Assign Staff
          </Button>
          <Button size="sm" className="bg-gold hover:bg-gold-dark">
            <Share2 className="h-4 w-4 mr-2" />
            Share Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Attendees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventDetails.attendees}</div>
            <p className="text-xs text-gray-500">Registered: {eventDetails.registered}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Check-Ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventDetails.checkedIn}</div>
            <p className="text-xs text-gray-500">{Math.round((eventDetails.checkedIn / eventDetails.registered) * 100)}% of registered</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Event Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {eventDetails.startTime} - {eventDetails.endTime}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full max-w-xl grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="checkin">Check-in</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{eventDetails.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <h3 className="font-semibold">Event Details</h3>
                  <ul className="space-y-2 mt-2">
                    <li className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-500 w-24">Organizer:</span> 
                      <span>{eventDetails.organizer}</span>
                    </li>
                    <li className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-500 w-24">Status:</span> 
                      <span className="capitalize">{eventDetails.status}</span>
                    </li>
                    <li className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-500 w-24">Event ID:</span> 
                      <span>{eventDetails.id}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold">Actions</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <CheckSquare className="h-4 w-4 mr-2" />
                      Manage Registration
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Printer className="h-4 w-4 mr-2" />
                      Print Event Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Event Image</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={eventDetails.image} 
                alt={eventDetails.title} 
                className="w-full h-48 object-cover rounded-md" 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendees" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendee List</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Attendee management functionality would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="badges" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Badge Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Badge design and printing options would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="checkin" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Check-in Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Check-in processes and QR code scanning would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventDetails;
