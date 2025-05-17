
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, Loader2, Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

// Dummy flight data for demonstration
const dummyFlights = [
  {
    id: "fl1",
    airline: "SkyWings",
    airlineCode: "SW",
    departureAirport: "JFK",
    departureCity: "New York",
    arrivalAirport: "CDG",
    arrivalCity: "Paris",
    departureTime: "08:30",
    arrivalTime: "21:45",
    duration: "8h 15m",
    stops: 0,
    price: 649,
    logo: "https://via.placeholder.com/50?text=SW",
  },
  {
    id: "fl2",
    airline: "Global Air",
    airlineCode: "GA",
    departureAirport: "JFK",
    departureCity: "New York",
    arrivalAirport: "CDG",
    arrivalCity: "Paris",
    departureTime: "12:20",
    arrivalTime: "02:15",
    duration: "8h 55m",
    stops: 1,
    stopCity: "London",
    price: 578,
    logo: "https://via.placeholder.com/50?text=GA",
  },
  {
    id: "fl3",
    airline: "Atlantic Lines",
    airlineCode: "AL",
    departureAirport: "JFK",
    departureCity: "New York",
    arrivalAirport: "CDG",
    arrivalCity: "Paris",
    departureTime: "16:45",
    arrivalTime: "06:30",
    duration: "8h 45m",
    stops: 0,
    price: 702,
    logo: "https://via.placeholder.com/50?text=AL",
  },
  {
    id: "fl4",
    airline: "EuroFlights",
    airlineCode: "EF",
    departureAirport: "JFK",
    departureCity: "New York",
    arrivalAirport: "CDG",
    arrivalCity: "Paris",
    departureTime: "21:15",
    arrivalTime: "11:05",
    duration: "8h 50m",
    stops: 1,
    stopCity: "Madrid",
    price: 534,
    logo: "https://via.placeholder.com/50?text=EF",
  },
];

// List of airports for demonstration
const popularCities = [
  { code: "JFK", name: "New York" },
  { code: "LAX", name: "Los Angeles" },
  { code: "ORD", name: "Chicago" },
  { code: "LHR", name: "London" },
  { code: "CDG", name: "Paris" },
  { code: "FRA", name: "Frankfurt" },
  { code: "DXB", name: "Dubai" },
  { code: "HND", name: "Tokyo" },
  { code: "SYD", name: "Sydney" },
];

const FlightFinder = () => {
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    departDate: new Date(),
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    passengers: "1",
    cabin: "Economy",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [flights, setFlights] = useState(dummyFlights);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(750);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
      
      // Filter flights based on price range
      const filteredFlights = dummyFlights.filter(
        (flight) => flight.price >= priceRange[0] && flight.price <= priceRange[1]
      );
      setFlights(filteredFlights);
    }, 1500);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  return (
    <div className="container max-w-5xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Find Your Flight</h1>
      
      <Tabs defaultValue="roundtrip">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="roundtrip">Round Trip</TabsTrigger>
          <TabsTrigger value="oneway">One Way</TabsTrigger>
          <TabsTrigger value="multicity">Multi-City</TabsTrigger>
        </TabsList>

        <Card className="shadow-lg bg-card/50 backdrop-blur-sm mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Search Flights</CardTitle>
            <CardDescription>
              Enter your travel details to find the best flight deals
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">From</label>
                  <Select
                    value={searchParams.from}
                    onValueChange={(value) =>
                      setSearchParams({ ...searchParams, from: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select departure city" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularCities.map((city) => (
                        <SelectItem key={city.code} value={city.code}>
                          {city.name} ({city.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">To</label>
                  <Select
                    value={searchParams.to}
                    onValueChange={(value) =>
                      setSearchParams({ ...searchParams, to: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination city" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularCities.map((city) => (
                        <SelectItem key={city.code} value={city.code}>
                          {city.name} ({city.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Departure Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(searchParams.departDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={searchParams.departDate}
                        onSelect={(date) =>
                          date && setSearchParams({ ...searchParams, departDate: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Return Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(searchParams.returnDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={searchParams.returnDate}
                        onSelect={(date) =>
                          date && setSearchParams({ ...searchParams, returnDate: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Passengers</label>
                  <Select
                    value={searchParams.passengers}
                    onValueChange={(value) =>
                      setSearchParams({ ...searchParams, passengers: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Passenger" : "Passengers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Cabin Class</label>
                  <Select
                    value={searchParams.cabin}
                    onValueChange={(value) =>
                      setSearchParams({ ...searchParams, cabin: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Economy">Economy</SelectItem>
                      <SelectItem value="Premium">Premium Economy</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="First">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  min={400}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-6"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSearching} className="w-full md:w-auto">
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search Flights
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Tabs>

      {showResults && (
        <div className="mt-8 space-y-4 animate-slide-up">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Results - {searchParams.from} to {searchParams.to}
            </h2>
            <p className="text-muted-foreground">
              {flights.length} flights found for {format(searchParams.departDate, "PP")}
            </p>
          </div>

          <div className="space-y-4">
            {flights.map((flight) => (
              <Card
                key={flight.id}
                className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:bg-accent/5"
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-12 gap-4 p-4">
                    <div className="col-span-2 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <span className="font-bold">{flight.airlineCode}</span>
                      </div>
                    </div>
                    
                    <div className="col-span-4 md:col-span-3">
                      <div className="space-y-1">
                        <p className="text-lg font-bold">{flight.departureTime}</p>
                        <p className="text-sm text-muted-foreground">{flight.departureAirport}</p>
                      </div>
                    </div>
                    
                    <div className="col-span-6 md:col-span-4 flex flex-col items-center justify-center">
                      <div className="w-full flex items-center">
                        <div className="h-[1px] flex-1 bg-border"></div>
                        <Plane className="mx-2 h-4 w-4 text-muted-foreground" />
                        <div className="h-[1px] flex-1 bg-border"></div>
                      </div>
                      <div className="flex flex-col items-center mt-1">
                        <span className="text-xs text-muted-foreground">
                          {flight.duration}
                        </span>
                        
                        {flight.stops > 0 && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            {flight.stops === 1 ? "1 stop" : `${flight.stops} stops`}
                            {flight.stopCity && ` (${flight.stopCity})`}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="col-span-8 md:col-span-3 lg:col-span-2 flex justify-between items-start mt-4 md:mt-0">
                      <div className="space-y-1">
                        <p className="text-lg font-bold">{flight.arrivalTime}</p>
                        <p className="text-sm text-muted-foreground">{flight.arrivalAirport}</p>
                      </div>
                      <div className="text-center lg:text-right">
                        <p className="text-lg font-bold">${flight.price}</p>
                        <p className="text-xs text-muted-foreground">per person</p>
                      </div>
                    </div>
                    
                    <div className="col-span-4 md:col-span-12 lg:col-span-1 flex items-center justify-end">
                      <Button size="sm">Select</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightFinder;
