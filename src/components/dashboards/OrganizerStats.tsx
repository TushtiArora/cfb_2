
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Star, GitPullRequest } from "lucide-react";

interface OrganizerStatsProps {
  projects: any[];
}

const OrganizerStats = ({ projects }: OrganizerStatsProps) => {
  const totalProjects = projects?.length || 0;
  const totalContributors = projects?.reduce((sum, project) => sum + (project.total_contributors || 0), 0) || 0;
  const totalIssues = projects?.reduce((sum, project) => sum + (project.open_issues || 0), 0) || 0;
  const totalMergedPRs = projects?.reduce((sum, project) => sum + (project.merged_prs || 0), 0) || 0;

  const statCards = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: BarChart3,
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Total Contributors",
      value: totalContributors,
      icon: Users,
      color: "from-green-500 to-emerald-400"
    },
    {
      title: "Open Issues",
      value: totalIssues,
      icon: Star,
      color: "from-yellow-500 to-orange-400"
    },
    {
      title: "Merged PRs",
      value: totalMergedPRs,
      icon: GitPullRequest,
      color: "from-purple-500 to-pink-400"
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

export default OrganizerStats;
