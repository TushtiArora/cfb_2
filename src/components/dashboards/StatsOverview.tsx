
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Bookmark, Code } from "lucide-react";

interface StatsOverviewProps {
  stats: any;
}

const StatsOverview = ({ stats }: StatsOverviewProps) => {
  const statCards = [
    {
      title: "Total Contributions",
      value: stats?.totalContributions || 0,
      icon: Code,
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Badges Earned",
      value: stats?.totalBadges || 0,
      icon: Trophy,
      color: "from-yellow-500 to-orange-400"
    },
    {
      title: "Bookmarked Projects",
      value: stats?.totalBookmarks || 0,
      icon: Bookmark,
      color: "from-purple-500 to-pink-400"
    },
    {
      title: "Pull Requests",
      value: stats?.contributionsByType?.pr || 0,
      icon: Star,
      color: "from-green-500 to-emerald-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              {stat.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
