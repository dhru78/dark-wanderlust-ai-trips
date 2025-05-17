
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  MapPin,
  Navigation,
  Clock,
  ChevronRight,
  X,
  Route,
  Globe,
  Loader2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample points of interest data
const pointsOfInterest = [
  {
    id: "p1",
    name: "Eiffel Tower",
    city: "Paris",
    country: "France",
    type: "Landmark",
    lat: 48.8584,
    lng: 2.2945,
    description: "Iconic iron tower built in 1889 that defines the Paris skyline",
    image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=1401&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "p2",
    name: "Louvre Museum",
    city: "Paris",
    country: "France",
    type: "Museum",
    lat: 48.8606,
    lng: 2.3376,
    description: "World's largest art museum and historic monument in Paris",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "p3",
    name: "Notre-Dame Cathedral",
    city: "Paris",
    country: "France",
    type: "Religious",
    lat: 48.8529,
    lng: 2.3499,
    description: "Medieval Catholic cathedral on the Île de la Cité",
    image: "https://images.unsplash.com/photo-1562470213-39340a4ea348?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "p4",
    name: "Arc de Triomphe",
    city: "Paris",
    country: "France",
    type: "Monument",
    lat: 48.8738,
    lng: 2.295,
    description: "Iconic monument honoring those who fought for France",
    image: "https://images.unsplash.com/photo-1564670838882-cc10bda70930?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "p5",
    name: "Montmartre",
    city: "Paris",
    country: "France",
    type: "District",
    lat: 48.8865,
    lng: 2.3431,
    description: "Bohemian district with artistic history and the Sacré-Cœur basilica",
    image: "https://images.unsplash.com/photo-1605183353364-92873c7cba01?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

const MapExplorer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<typeof pointsOfInterest[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [calculatingRoute, setCalculatingRoute] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
  } | null>(null);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setMapLoaded(true);
      
      // Notify user that the map has loaded
      toast({
        title: "Map Loaded",
        description: "The interactive map is now ready to use.",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // Simulate searching for a location
    const foundLocation = pointsOfInterest.find(
      (poi) => poi.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (foundLocation) {
      setSelectedLocation(foundLocation);
      toast({
        title: "Location Found",
        description: `Found ${foundLocation.name} on the map.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Location Not Found",
        description: "No matching locations found. Try another search term.",
      });
    }
  };

  const calculateRoute = () => {
    if (!selectedLocation) return;
    
    setCalculatingRoute(true);
    
    // Simulate route calculation
    setTimeout(() => {
      setRouteInfo({
        distance: "5.7 km",
        duration: "25 min",
      });
      setCalculatingRoute(false);
      
      toast({
        title: "Route Calculated",
        description: `Distance to ${selectedLocation.name}: 5.7 km (25 min)`,
      });
    }, 1500);
  };

  const clearSelection = () => {
    setSelectedLocation(null);
    setRouteInfo(null);
  };

  return (
    <div className="container max-w-6xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Map Explorer</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 shadow-lg bg-card/50 backdrop-blur-sm">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location-search">Search Locations</Label>
                <div className="flex gap-2">
                  <Input
                    id="location-search"
                    placeholder="Search for a place..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>

            <Separator className="my-4" />
            
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Popular Places</h3>
              <ScrollArea className="h-[250px] pr-4">
                <div className="space-y-2">
                  {pointsOfInterest.map((poi) => (
                    <div
                      key={poi.id}
                      className={`p-2 rounded-md cursor-pointer transition-colors flex items-center gap-2 ${
                        selectedLocation?.id === poi.id
                          ? "bg-primary text-white"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => setSelectedLocation(poi)}
                    >
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{poi.name}</p>
                        <p className="text-xs opacity-80">{poi.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>
          
          {selectedLocation && (
            <Card className="p-4 shadow-lg bg-card/50 backdrop-blur-sm animate-scale-in">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
                <Button variant="ghost" size="icon" onClick={clearSelection}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                {selectedLocation.city}, {selectedLocation.country}
              </p>
              
              <div className="relative h-40 rounded-md overflow-hidden mb-3">
                <img
                  src={selectedLocation.image}
                  alt={selectedLocation.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <p className="text-sm mb-4">{selectedLocation.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Button
                    onClick={calculateRoute}
                    disabled={calculatingRoute}
                    className="w-full"
                  >
                    {calculatingRoute ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Route className="mr-2 h-4 w-4" />
                        Calculate Route
                      </>
                    )}
                  </Button>
                </div>
                
                {routeInfo && (
                  <div className="rounded-md bg-secondary p-2 mt-2 grid grid-cols-2 gap-2 animate-fade-in">
                    <div className="flex items-center gap-1">
                      <Navigation className="h-4 w-4 text-primary" />
                      <span className="text-sm">{routeInfo.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">{routeInfo.duration}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <Card className="shadow-lg h-[600px] overflow-hidden bg-card/50 backdrop-blur-sm relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
                  <p>Loading map...</p>
                </div>
              </div>
            ) : (
              <>
                {/* This would be replaced by an actual map library in production */}
                <div ref={mapRef} className="w-full h-full bg-secondary/50">
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <div className="glass-dark p-6 rounded-xl max-w-md">
                      <Globe className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse-light" />
                      <h3 className="text-xl font-bold mb-2">Interactive Map Placeholder</h3>
                      <p className="text-muted-foreground mb-4">
                        In a production environment, this would be an interactive map using 
                        libraries like Mapbox, Google Maps, or Leaflet.
                      </p>
                      {selectedLocation && (
                        <div className="p-3 bg-secondary/80 rounded-lg animate-fade-in text-left">
                          <p className="font-bold">Selected: {selectedLocation.name}</p>
                          <div className="flex justify-between text-sm mt-1">
                            <span>Lat: {selectedLocation.lat.toFixed(4)}</span>
                            <span>Long: {selectedLocation.lng.toFixed(4)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-md shadow-lg text-xs">
                  <p>© TravelAI Map Data</p>
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="secondary">
                    <span className="text-lg">+</span>
                  </Button>
                  <Button size="icon" variant="secondary">
                    <span className="text-lg">−</span>
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapExplorer;
