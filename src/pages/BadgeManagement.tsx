
import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tag, Plus, Edit, Trash2, CircuitBoard, CheckCheck } from 'lucide-react';

// Mock data for badge templates
const badgeTemplates = [
  { id: 1, name: 'Standard Guest', color: '#3498db', type: 'guest', active: true },
  { id: 2, name: 'VIP Guest', color: '#9b59b6', type: 'vip', active: true },
  { id: 3, name: 'Staff Badge', color: '#e74c3c', type: 'staff', active: false },
  { id: 4, name: 'Speaker Badge', color: '#27ae60', type: 'speaker', active: true },
];

// Mock data for badge systems
const badgeSystems = [
  { id: 1, name: 'Main Hall System', printer: 'HP LaserJet Pro', status: 'Online', location: 'Main Entrance' },
  { id: 2, name: 'VIP Entrance System', printer: 'Epson WorkForce', status: 'Offline', location: 'VIP Entrance' },
  { id: 3, name: 'Staff Registration', printer: 'Brother QL-800', status: 'Low Ink', location: 'Staff Room' },
];

const BadgeManagement = () => {
  const [activeTab, setActiveTab] = useState('templates');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Badge Management</h1>
        <p className="text-muted-foreground">
          Manage your badge templates and systems for all your events
        </p>
      </div>

      <Tabs defaultValue="templates" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="templates">Badge Templates</TabsTrigger>
          <TabsTrigger value="systems">Badge Systems</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Available Templates</h2>
            <Button>
              <Plus size={18} className="mr-2" />
              New Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badgeTemplates.map(template => (
              <Card key={template.id} className={!template.active ? "opacity-70" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Tag size={16} style={{ color: template.color }} />
                        {template.name}
                      </CardTitle>
                      <CardDescription>Type: {template.type}</CardDescription>
                    </div>
                    {template.active ? (
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Active
                      </div>
                    ) : (
                      <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        Inactive
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-1 mb-3">
                    <AspectRatio ratio={1.78 / 1}>
                      <div className="w-full h-full flex items-center justify-center bg-muted" style={{ borderTop: `5px solid ${template.color}` }}>
                        <div className="text-center">
                          <div className="font-bold">Guest Name</div>
                          <div className="text-sm text-gray-500">Company Name</div>
                          <div className="mt-2 flex justify-center">
                            <div className="border-2 border-black p-1">
                              <div className="bg-black w-12 h-12"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AspectRatio>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    <Edit size={14} className="mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 size={14} className="mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="systems" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Badge Systems</h2>
            <Button>
              <Plus size={18} className="mr-2" />
              Add System
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Badge Printing Systems</CardTitle>
              <CardDescription>Manage your connected badge printing systems</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Printer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {badgeSystems.map(system => (
                    <TableRow key={system.id}>
                      <TableCell className="font-medium">{system.name}</TableCell>
                      <TableCell>{system.printer}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${
                          system.status === 'Online' ? 'bg-green-100 text-green-800' :
                          system.status === 'Offline' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {system.status === 'Online' && <CheckCheck size={12} className="mr-1" />}
                          {system.status === 'Offline' && <CircuitBoard size={12} className="mr-1" />}
                          {system.status}
                        </div>
                      </TableCell>
                      <TableCell>{system.location}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit size={14} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Set up your badge printing system parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Resolution (DPI)</label>
                    <Input type="number" defaultValue="300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Print Mode</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>High Quality</option>
                      <option>Standard</option>
                      <option>Draft</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Badge Socket API Endpoint</label>
                  <Input type="text" defaultValue="wss://badge-api.eventpro.io/print" />
                </div>
                <Button className="mt-4">Save Configuration</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BadgeManagement;
