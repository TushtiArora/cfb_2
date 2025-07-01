
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import SimpleDashboard from "@/components/SimpleDashboard";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
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

  return <SimpleDashboard />;
};

export default Dashboard;