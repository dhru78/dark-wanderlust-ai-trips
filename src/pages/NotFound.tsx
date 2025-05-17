
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <MapPin className="h-16 w-16 text-primary" />
          </div>
        </div>
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl mb-6">Destination Not Found</p>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you're looking for seems to be off the map. Let's get you back on track to your travel adventures!
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
