
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PropertyDetails from "./pages/PropertyDetails";
import HostDashboard from "./pages/HostDashboard";
import UserProfile from "./pages/UserProfile";
import SearchResults from "./pages/SearchResults";
import MarketTrends from "./pages/MarketTrends";
import MortgageCalculator from "./pages/MortgageCalculator";
import Neighborhoods from "./pages/Neighborhoods";
import Agents from "./pages/Agents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/host" element={<HostDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/market-trends" element={<MarketTrends />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/neighborhoods" element={<Neighborhoods />} />
          <Route path="/agents" element={<Agents />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
