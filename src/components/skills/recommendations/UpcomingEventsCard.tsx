
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  host: string;
}

interface UpcomingEventsCardProps {
  events: Event[];
}

export const UpcomingEventsCard = ({ events }: UpcomingEventsCardProps) => {
  return (
    <Card className="p-6 bg-white border-aptiv/10">
      <h3 className="text-lg font-medium text-aptiv-gray-700 mb-4">Upcoming Learning Events</h3>
      
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="flex border-b border-aptiv/10 pb-3 last:border-0">
            <div className="bg-aptiv/10 text-aptiv p-2 rounded-lg mr-4 h-fit">
              <Calendar className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-aptiv-gray-700">{event.title}</h4>
              <p className="text-xs text-aptiv-gray-500">{event.type} | {event.host}</p>
              
              <div className="flex items-center mt-1 text-xs text-aptiv-gray-500">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {event.date}, {event.time}
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="h-fit">
              Register
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
