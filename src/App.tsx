// import FingerRating from "@/components/dashboards/FingerRating";

// function App() {
//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold mb-4">Test Finger Rating</h1>
//       <FingerRating />
//     </div>
//   );
// }

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Mentors from "./pages/Mentors";
import Pro from "./pages/Pro";
import NotFound from "./pages/NotFound";
import ProfileSetup from "./pages/ProfileSetup";
import FingerRating from "@/components/dashboards/FingerRating";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/pro" element={<Pro />} />
            <Route path="/pricing" element={<Pro />} />
            <Route path="/review" element={<FingerRating />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
