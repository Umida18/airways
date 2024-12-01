import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Calendar, Clock, CheckCircle2 } from "lucide-react";

const upcomingFlights = [
  {
    id: 1,
    from: "Tashkent",
    to: "Moscow",
    date: "2023-12-15",
    time: "14:30",
    flightNumber: "HY 601",
  },
  {
    id: 2,
    from: "Samarkand",
    to: "St. Petersburg",
    date: "2023-12-20",
    time: "10:15",
    flightNumber: "HY 632",
  },
  {
    id: 3,
    from: "Bukhara",
    to: "Kazan",
    date: "2024-01-05",
    time: "08:45",
    flightNumber: "HY 650",
  },
];

const pastFlights = [
  {
    id: 4,
    from: "Tashkent",
    to: "Dubai",
    date: "2023-11-10",
    time: "23:45",
    flightNumber: "HY 333",
  },
  {
    id: 5,
    from: "Nukus",
    to: "Moscow",
    date: "2023-10-25",
    time: "06:20",
    flightNumber: "HY 602",
  },
  {
    id: 6,
    from: "Urgench",
    to: "St. Petersburg",
    date: "2023-09-30",
    time: "12:00",
    flightNumber: "HY 633",
  },
];

export function Tickets() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const renderFlightTable = (
    flights: typeof upcomingFlights,
    showStatus: boolean = false
  ) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Flight</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          {showStatus && <TableHead>Status</TableHead>}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flights.map((flight) => (
          <TableRow key={flight.id}>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Plane className="h-4 w-4 text-blue-500" />
                <span>
                  {flight.from} - {flight.to}
                </span>
              </div>
              <div className="text-sm text-gray-500">{flight.flightNumber}</div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{flight.date}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>{flight.time}</span>
              </div>
            </TableCell>
            {showStatus && (
              <TableCell>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">Completed</span>
                </div>
              </TableCell>
            )}
            <TableCell>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">My Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Flights</TabsTrigger>
            <TabsTrigger value="past">Flight History</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {renderFlightTable(upcomingFlights)}
          </TabsContent>
          <TabsContent value="past">
            {renderFlightTable(pastFlights, true)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
