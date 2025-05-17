
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Chatbot from "./pages/Chatbot";
import FlightFinder from "./pages/FlightFinder";
import MapExplorer from "./pages/MapExplorer";
import SavedTrips from "./pages/SavedTrips";
import Auth from "./pages/Auth";
import CurrencyConverter from "./pages/CurrencyConverter";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="chatbot" element={<Chatbot />} />
                <Route path="flights" element={<FlightFinder />} />
                <Route path="map" element={<MapExplorer />} />
                <Route path="trips" element={<SavedTrips />} />
                <Route path="currency" element={<CurrencyConverter />} />
                <Route path="auth" element={<Auth />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
