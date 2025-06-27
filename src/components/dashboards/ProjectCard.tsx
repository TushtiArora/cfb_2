
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Users, BookmarkPlus, Bookmark } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProjectCardProps {
  project: any; // Replace with proper type from database
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleBookmark = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to bookmark projects",
        variant: "destructive"
      });
      return;
    }

    try {
      if (isBookmarked) {
        await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('project_id', project.id);
        setIsBookmarked(false);
        toast({ title: "Bookmark removed" });
      } else {
        await supabase
          .from('bookmarks')
          .insert({ user_id: user.id, project_id: project.id });
        setIsBookmarked(true);
        toast({ title: "Project bookmarked!" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive"
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white text-lg group-hover:text-purple-200 transition-colors">
              {project.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-1">
              by {project.profiles?.full_name || project.profiles?.username || 'Anonymous'}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className="text-gray-400 hover:text-purple-400"
          >
            {isBookmarked ? <Bookmark className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.difficulty_level && (
            <Badge className={`${getDifficultyColor(project.difficulty_level)} text-white text-xs`}>
              {project.difficulty_level}
            </Badge>
          )}
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

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {project.total_contributors || 0} contributors
          </span>
          <span>{project.open_issues || 0} open issues</span>
        </div>

        <div className="flex gap-2">
          {project.repository_url && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-purple-400 text-purple-300 hover:bg-purple-500/10"
              onClick={() => window.open(project.repository_url, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Code
            </Button>
          )}
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
  );
};

export default ProjectCard;
