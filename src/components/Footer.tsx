
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-md">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">TravelAI</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Your AI-powered travel companion. Discover destinations, find flights, and plan your perfect trip with the help of artificial intelligence.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Features</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/chatbot" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Chatbot
                </Link>
              </li>
              <li>
                <Link to="/flights" className="text-muted-foreground hover:text-foreground transition-colors">
                  Flight Finder
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-muted-foreground hover:text-foreground transition-colors">
                  Map Explorer
                </Link>
              </li>
              <li>
                <Link to="/currency" className="text-muted-foreground hover:text-foreground transition-colors">
                  Currency Converter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TravelAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
