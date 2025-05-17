
import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Moon,
  Sun,
  MessageCircle,
  Map,
  Bookmark,
  User,
  Search,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Footer from "./Footer";

const Layout = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "AI Chatbot", path: "/chatbot", icon: <MessageCircle className="w-5 h-5" /> },
    { name: "Flight Finder", path: "/flights", icon: <Search className="w-5 h-5" /> },
    { name: "Map Explorer", path: "/map", icon: <Map className="w-5 h-5" /> },
    { name: "Currency", path: "/currency", icon: <Globe className="w-5 h-5" /> },
    { name: "Saved Trips", path: "/trips", icon: <Bookmark className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">TravelAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-primary/5 text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm">{user?.name}</span>
                <Button variant="outline" onClick={logout}>Sign Out</Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-12">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                  >
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                  
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{user?.name}</span>
                      <Button variant="outline" onClick={() => { logout(); closeMobileMenu(); }}>
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link to="/auth" onClick={closeMobileMenu}>
                      <Button>Sign In</Button>
                    </Link>
                  )}
                </div>
                
                <nav className="flex flex-col space-y-2">
                  {[{ name: "Home", path: "/", icon: <Globe className="w-5 h-5" /> }, ...navItems].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center p-3 text-sm font-medium rounded-md transition-colors ${
                        isActive(item.path)
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-primary/5 text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 container px-4 md:px-6 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
