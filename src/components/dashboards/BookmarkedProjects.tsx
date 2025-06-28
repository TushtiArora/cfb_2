import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Bookmark, Star, GitFork, ExternalLink, Users } from "lucide-react";

const githubKey = import.meta.env.VITE_GITHUB_API_KEY;


const BookmarkedProjects = () => {
  const { user } = useAuth();

  const { data: bookmarkedProjects, isLoading } = useQuery({
    queryKey: ['bookmarked-projects', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data: bookmarks, error } = await supabase
        .from('bookmarks')
        .select('project_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // For now, we'll map the project_id to GitHub repository names
      // This is a simplified approach - in production you'd store more metadata
      const repoMap: { [key: string]: string } = {
        '1': 'vercel/next.js',
        '2': 'facebook/react',
        '3': 'microsoft/vscode',
        '4': 'nodejs/node',
        '5': 'tailwindlabs/tailwindcss',
        '6': 'supabase/supabase',
        '7': 'microsoft/TypeScript',
        '8': 'vuejs/vue'
      };

      // Fetch GitHub data for bookmarked projects
      const projectPromises = bookmarks.map(async (bookmark) => {
        const repoName = repoMap[bookmark.project_id];
        if (!repoName) return null;

        try {
          const response = await fetch(`https://api.github.com/repos/${repoName}`, {
            headers: {
              'Authorization': `token ${githubKey}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          
          if (!response.ok) throw new Error('Failed to fetch');
          const data = await response.json();
          
          return {
            id: bookmark.project_id,
            title: data.name,
            description: data.description,
            repository_url: data.html_url,
            stargazers_count: data.stargazers_count,
            forks_count: data.forks_count,
            language: data.language,
            open_issues_count: data.open_issues_count,
            owner: {
              login: data.owner.login,
              avatar_url: data.owner.avatar_url
            },
            tags: [data.language, 'open-source'].filter(Boolean),
            mentor_available: Math.random() > 0.7,
            bookmarked_at: bookmark.created_at
          };
        } catch (error) {
          console.error(`Failed to fetch ${repoName}:`, error);
          return null;
        }
      });

      const projects = await Promise.all(projectPromises);
      return projects.filter(Boolean);
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
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
      {bookmarkedProjects && bookmarkedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedProjects.map((project) => (
            <Card key={project.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg group-hover:text-purple-200 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 mt-1">
                      by {project.owner.login}
                    </CardDescription>
                  </div>
                  <Bookmark className="w-4 h-4 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* GitHub Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {project.stargazers_count?.toLocaleString() || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {project.forks_count?.toLocaleString() || 0}
                  </span>
                  <span>{project.open_issues_count || 0} issues</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.mentor_available && (
                    <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      Mentor Available
                    </Badge>
                  )}
                  {project.tags?.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="bg-white/20 text-gray-200 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-purple-400 text-purple-300 hover:bg-purple-500/10"
                    onClick={() => window.open(project.repository_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Contribute
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white/10 border-white/20">
          <CardContent className="text-center py-12">
            <Bookmark className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <p className="text-gray-300">No bookmarked projects yet.</p>
            <p className="text-gray-400 text-sm mt-2">Bookmark projects you're interested in to see them here!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookmarkedProjects;
