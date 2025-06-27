
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, ExternalLink, Users, Star, Calendar } from "lucide-react";

interface ProjectManagementProps {
  projects: any[];
  isLoading: boolean;
}

const ProjectManagement = ({ projects, isLoading }: ProjectManagementProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-white/10 border-white/20 animate-pulse">
            <CardHeader>
              <div className="h-6 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-white/20 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                    <CardDescription className="text-gray-300 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Created {new Date(project.created_at).toLocaleDateString()}
                      </div>
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(project.status)} text-white`}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="bg-white/20 text-gray-200 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="text-center">
                    <div className="text-white font-semibold">{project.total_contributors || 0}</div>
                    <div className="text-gray-400">Contributors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">{project.open_issues || 0}</div>
                    <div className="text-gray-400">Open Issues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">{project.merged_prs || 0}</div>
                    <div className="text-gray-400">Merged PRs</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-purple-400 text-purple-300 hover:bg-purple-500/10"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {project.repository_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-400 text-gray-300 hover:bg-gray-500/10"
                      onClick={() => window.open(project.repository_url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white/10 border-white/20">
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <p className="text-gray-300">No projects yet.</p>
            <p className="text-gray-400 text-sm mt-2">Create your first project to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectManagement;
