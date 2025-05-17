
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('travel-user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('travel-user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to verify credentials
      // For this demo, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Mock user data
      const userData: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email: email,
      };

      setUser(userData);
      localStorage.setItem('travel-user', JSON.stringify(userData));
      
      toast({
        title: "Login successful!",
        description: `Welcome back, ${userData.name}!`,
      });
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would make an API call to create a new user
      // For this demo, we'll simulate a successful signup
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
      };

      setUser(userData);
      localStorage.setItem('travel-user', JSON.stringify(userData));
      
      toast({
        title: "Account created!",
        description: `Welcome to TravelAI, ${name}!`,
      });
    } catch (error) {
      console.error('Signup failed:', error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Could not create your account. Please try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travel-user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      signup,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
