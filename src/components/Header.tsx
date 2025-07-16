
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Search, Users, Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-500/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent hover:from-purple-300 hover:via-pink-300 hover:to-purple-300 transition-all duration-300">
            OpenPR
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/explore" 
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
            >
              <Search className="w-4 h-4" />
              Explore
            </Link>
            <Link 
              to="/mentors" 
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
            >
              <Users className="w-4 h-4" />
              Mentors
            </Link>
            <Link 
              to="/pro" 
              className="text-yellow-300 hover:text-yellow-200 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-500/10"
            >
              <Crown className="w-4 h-4" />
              Pro
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-purple-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-purple-500/20 pt-4 space-y-2">
            <Link 
              to="/explore" 
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="w-4 h-4" />
              Explore
            </Link>
            <Link 
              to="/mentors" 
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="w-4 h-4" />
              Mentors
            </Link>
            <Link 
              to="/pro" 
              className="text-yellow-300 hover:text-yellow-200 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-500/10 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Crown className="w-4 h-4" />
              Pro
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 text-left px-3 py-2 rounded-lg hover:bg-white/10 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="text-gray-300 hover:text-white transition-colors block px-3 py-2 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <div className="px-3">
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full shadow-lg shadow-purple-500/25"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/auth">Get Started</Link>
                  </Button>
                </div>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
