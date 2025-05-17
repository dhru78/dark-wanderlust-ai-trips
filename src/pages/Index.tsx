
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MessageCircle, 
  Search, 
  Map, 
  Globe, 
  Bookmark,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Destination images and data would typically come from an API
const topDestinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1499856871958-5b9357976b82?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "City of Lights",
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "A blend of tradition and innovation",
  },
  {
    id: 3,
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "The city that never sleeps",
  },
  {
    id: 4,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "Tropical paradise",
  },
  {
    id: 5,
    name: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "Eternal city with ancient history",
  },
];

const features = [
  {
    title: "AI Travel Assistant",
    description: "Chat with our AI to get personalized trip recommendations and itineraries.",
    icon: <MessageCircle className="h-10 w-10 text-primary" />,
    link: "/chatbot"
  },
  {
    title: "Flight Finder",
    description: "Search for the best flight deals to your dream destinations.",
    icon: <Search className="h-10 w-10 text-primary" />,
    link: "/flights"
  },
  {
    title: "Interactive Maps",
    description: "Explore destinations and calculate distances between points of interest.",
    icon: <Map className="h-10 w-10 text-primary" />,
    link: "/map"
  },
  {
    title: "Currency Converter",
    description: "Get real-time exchange rates for your travel budget planning.",
    icon: <Globe className="h-10 w-10 text-primary" />,
    link: "/currency"
  },
  {
    title: "Saved Trips",
    description: "Save and organize your favorite trip plans for future reference.",
    icon: <Bookmark className="h-10 w-10 text-primary" />,
    link: "/trips"
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would redirect to search results
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="relative -mt-16 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-travel-dark via-travel-dark/90 to-background"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Explore the World with AI-Powered Travel Planning
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
            Discover destinations, find flights, and create perfect itineraries with the help of artificial intelligence.
          </p>
          
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex flex-col sm:flex-row items-center max-w-2xl mx-auto gap-2 animate-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            <Input
              type="text"
              placeholder="Where do you want to go?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-12 text-base"
            />
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
          </form>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-slide-up" style={{ animationDelay: "600ms" }}>
            {features.map((feature, index) => (
              <Link 
                key={feature.title} 
                to={feature.link} 
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-3 p-4 bg-primary/10 rounded-full transition-all duration-300 group-hover:bg-primary/20">
                  {feature.icon}
                </div>
                <h3 className="font-medium">{feature.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Destinations</h2>
            <Link to="/map" className="flex items-center text-primary hover:underline">
              Explore all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <Carousel>
            <CarouselContent>
              {topDestinations.map((destination) => (
                <CarouselItem key={destination.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-0 shadow-lg h-[340px] card-hover">
                    <div className="relative h-full">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                        <p className="text-gray-200 text-sm">{destination.description}</p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">How TravelAI Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.slice(0, 3).map((feature, index) => (
              <Card key={feature.title} className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Link to={feature.link}>
                    <Button variant="outline">Try it now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/5">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Start Planning Your Dream Trip Today</h2>
          <p className="text-muted-foreground mb-8">
            Let our AI-powered tools help you create the perfect travel experience, 
            from finding flights to generating custom itineraries.
          </p>
          <Button asChild size="lg">
            <Link to="/chatbot">
              Chat with Travel AI <MessageCircle className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
