
import { useUserRole } from "@/hooks/useUserRole";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ContributorDashboard from "@/components/dashboards/ContributorDashboard";
import OrganizerDashboard from "@/components/dashboards/OrganizerDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: userRole, isLoading: roleLoading } = useUserRole();

  if (authLoading || profileLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/10 border-white/20 p-8">
          <CardContent className="flex items-center space-x-4">
            <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
            <span className="text-white">Loading dashboard...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If user doesn't have a complete profile, redirect to profile setup
  if (!profile || !profile.username || !profile.full_name) {
    return <Navigate to="/profile-setup" replace />;
  }

  // Default to contributor if no role is found
  const isOrganizer = userRole === 'organizer' || userRole === 'admin';

  return isOrganizer ? <OrganizerDashboard /> : <ContributorDashboard />;
};

export default Dashboard;
