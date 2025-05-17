
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Plane,
  Plus,
  Trash2,
  Star,
  Edit,
  FilePlus,
  FolderPlus,
  Search,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Sample saved trips data
const sampleTrips = [
  {
    id: "trip1",
    title: "Week in Paris",
    destination: "Paris, France",
    startDate: "2023-06-15",
    endDate: "2023-06-22",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3",
    notes: "Visit Eiffel Tower, Louvre Museum, and Notre Dame. Try croissants at Café de Flore.",
    savedLocations: ["Eiffel Tower", "Louvre Museum", "Notre Dame", "Montmartre"],
    isFavorite: true,
  },
  {
    id: "trip2",
    title: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    startDate: "2023-09-10",
    endDate: "2023-09-20",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3",
    notes: "Explore Shibuya, Shinjuku, and Tokyo Tower. Try authentic ramen and sushi.",
    savedLocations: ["Tokyo Tower", "Shibuya Crossing", "Senso-ji Temple"],
    isFavorite: false,
  },
  {
    id: "trip3",
    title: "Greek Islands Hopping",
    destination: "Santorini & Mykonos, Greece",
    startDate: "2024-07-05",
    endDate: "2024-07-15",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3",
    notes: "Visit the blue domes of Santorini and the windmills of Mykonos.",
    savedLocations: ["Oia", "Paradise Beach", "Little Venice"],
    isFavorite: true,
  },
];

type Trip = typeof sampleTrips[0];

const SavedTrips = () => {
  const { isAuthenticated, user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showTripForm, setShowTripForm] = useState(false);
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      // In a real app, we would fetch from an API
      const savedTrips = localStorage.getItem('saved-trips');
      if (savedTrips) {
        try {
          setTrips(JSON.parse(savedTrips));
        } catch (e) {
          console.error("Failed to parse saved trips");
          setTrips(sampleTrips);
        }
      } else {
        setTrips(sampleTrips);
      }
      setLoading(false);
    }, 1000);
  }, []);
  
  // Save trips to localStorage when changed
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('saved-trips', JSON.stringify(trips));
    }
  }, [trips, loading]);

  const handleToggleFavorite = (tripId: string) => {
    setTrips(
      trips.map((trip) =>
        trip.id === tripId ? { ...trip, isFavorite: !trip.isFavorite } : trip
      )
    );
  };

  const handleDeleteTrip = (tripId: string) => {
    setTrips(trips.filter((trip) => trip.id !== tripId));
    toast({
      description: "Trip deleted successfully",
    });
  };

  const addNewTrip = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save trips.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would save this to an API
    const newTrip: Trip = {
      id: `trip${Date.now()}`,
      title: "New Trip",
      destination: "Choose Destination",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
      image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3",
      notes: "Add your notes here...",
      savedLocations: [],
      isFavorite: false,
    };
    
    setTrips([newTrip, ...trips]);
    setSelectedTrip(newTrip);
    
    toast({
      title: "Trip Created",
      description: "New trip has been added to your list.",
    });
  };

  const filteredTrips = trips.filter((trip) => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    const tripText = `${trip.title} ${trip.destination} ${trip.notes}`.toLowerCase();
    
    return searchTerms.every((term) => tripText.includes(term));
  });
  
  if (!isAuthenticated) {
    return (
      <div className="container max-w-4xl animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Saved Trips</h1>
        
        <Card className="text-center shadow-lg py-12 bg-card/50 backdrop-blur-sm">
          <CardContent>
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FolderPlus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Sign in to save trips</h2>
            <p className="text-muted-foreground mb-6">
              Create an account to save your favorite destinations and travel plans.
            </p>
            <Button asChild size="lg">
              <Link to="/auth">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Helper functions for date formatting
  function format(date: Date | string, formatStr: string): string {
    if (typeof date === 'string') return date;
    return new Date(date).toISOString().split('T')[0];
  }
  
  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  function formatDisplayDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  return (
    <div className="container max-w-6xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Saved Trips</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search your trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Tabs value={viewType} onValueChange={(value) => setViewType(value as "grid" | "list")} className="hidden md:block">
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={addNewTrip}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Trip
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden shadow-lg">
              <div className="h-48 bg-muted animate-pulse" />
              <CardContent className="p-4 space-y-2">
                <div className="h-6 bg-muted rounded-md animate-pulse" />
                <div className="h-4 bg-muted rounded-md animate-pulse w-1/2" />
                <div className="h-4 bg-muted rounded-md animate-pulse w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredTrips.length === 0 ? (
        <Card className="text-center shadow-lg py-12 bg-card/50 backdrop-blur-sm">
          <CardContent>
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FilePlus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No trips found</h2>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Try adjusting your search query"
                : "Start planning your first adventure"}
            </p>
            <Button onClick={addNewTrip}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Trip
            </Button>
          </CardContent>
        </Card>
      ) : viewType === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <Card
              key={trip.id}
              className="overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card/60 backdrop-blur-sm"
            >
              <div className="relative h-48">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-xl">{trip.title}</h3>
                    <p className="text-white/80 text-sm flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {trip.destination}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white hover:bg-black/20"
                    onClick={() => handleToggleFavorite(trip.id)}
                  >
                    <Star
                      className={`h-5 w-5 ${
                        trip.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-white"
                      }`}
                    />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {formatDisplayDate(trip.startDate)} - {formatDisplayDate(trip.endDate)}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm line-clamp-2 text-muted-foreground mb-2">
                  {trip.notes}
                </p>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {trip.savedLocations.slice(0, 2).map((location, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {location}
                    </Badge>
                  ))}
                  {trip.savedLocations.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{trip.savedLocations.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="px-4 py-3 border-t flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTrip(trip)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Trip</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{trip.title}"? This action cannot be
                        undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteTrip(trip.id)}
                        className="bg-destructive text-destructive-foreground"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-lg bg-card/60 backdrop-blur-sm">
          <ScrollArea className="h-[70vh]">
            <div className="divide-y">
              {filteredTrips.map((trip) => (
                <div key={trip.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                      {trip.isFavorite && (
                        <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg">{trip.title}</h3>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setSelectedTrip(trip)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleToggleFavorite(trip.id)}
                          >
                            <Star
                              className={`h-4 w-4 ${
                                trip.isFavorite ? "fill-yellow-400 text-yellow-400" : ""
                              }`}
                            />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Trip</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{trip.title}"?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteTrip(trip.id)}
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-1 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {trip.destination}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDisplayDate(trip.startDate)} - {formatDisplayDate(trip.endDate)}
                        </div>
                      </div>
                      
                      <p className="text-sm line-clamp-1 mt-1">{trip.notes}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {trip.savedLocations.map((location, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {location}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
};

export default SavedTrips;
