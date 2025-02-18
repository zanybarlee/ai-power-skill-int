
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import PostJob from "./pages/PostJob";
import Candidates from "./pages/Candidates";
import Shortlists from "./pages/Shortlists";
import Settings from "./pages/Settings";
import About from "./pages/About";
import ITSolutions from "./pages/ITSolutions";
import EADivision from "./pages/EADivision";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/shortlists" element={<Shortlists />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/it-solutions" element={<ITSolutions />} />
          <Route path="/ea" element={<EADivision />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
