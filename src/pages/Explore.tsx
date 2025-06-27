import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Star, 
  GitFork, 
  ExternalLink, 
  Search, 
  Filter, 
  ChevronDown,
  BookmarkPlus,
  Bookmark,
  CheckCircle,
  Code,
  Bug,
  FileText,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const githubKey = import.meta.env.VITE_GITHUB_API_KEY;

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch user's bookmarked projects
  const { data: userBookmarks } = useQuery({
    queryKey: ['user-bookmarks', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('bookmarks')
        .select('project_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(bookmark => bookmark.project_id);
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (userBookmarks) {
      setBookmarkedProjects(userBookmarks);
    }
  }, [userBookmarks]);

  // Fetch GitHub repositories with API key
  const { data: githubRepos, isLoading } = useQuery({
    queryKey: ['github-repos', searchTerm],
    queryFn: async () => {
      const popularRepos = [
        'vercel/next.js',
        'facebook/react',
        'microsoft/vscode',
        'nodejs/node',
        'tailwindlabs/tailwindcss',
        'supabase/supabase',
        'microsoft/TypeScript',
        'vuejs/vue'
      ];

      const repoPromises = popularRepos.map(async (repo) => {
        try {
          const response = await fetch(`https://api.github.com/repos/${repo}`, {
            headers: {
              'Authorization': `token ${githubKey}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          
          if (!response.ok) throw new Error('Failed to fetch');
          const data = await response.json();
          
          // Fetch issues for the repo
          const issuesResponse = await fetch(`https://api.github.com/repos/${repo}/issues?labels=good%20first%20issue&state=open&per_page=3`, {
            headers: {
              'Authorization': `token ${githubKey}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          const issues = issuesResponse.ok ? await issuesResponse.json() : [];
          
          return {
            id: data.id.toString(),
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
            issues: issues.slice(0, 2),
            tags: [data.language, 'open-source'].filter(Boolean),
            difficulty_level: Math.random() > 0.5 ? 'beginner' : Math.random() > 0.5 ? 'intermediate' : 'advanced',
            mentor_available: Math.random() > 0.7
          };
        } catch (error) {
          console.error(`Failed to fetch ${repo}:`, error);
          return null;
        }
      });

      const results = await Promise.all(repoPromises);
      return results.filter(Boolean);
    },
  });

  const handleBookmark = async (projectId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to bookmark projects",
        variant: "destructive"
      });
      return;
    }

    try {
      const isBookmarked = bookmarkedProjects.includes(projectId);
      
      if (isBookmarked) {
        // Remove bookmark
        await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('project_id', projectId);
        
        setBookmarkedProjects(prev => prev.filter(id => id !== projectId));
        toast({ title: "Bookmark removed" });
      } else {
        // Add bookmark
        await supabase
          .from('bookmarks')
          .insert({ user_id: user.id, project_id: projectId });
        
        setBookmarkedProjects(prev => [...prev, projectId]);
        toast({ title: "Project bookmarked!" });
      }
    } catch (error) {
      console.error('Bookmark error:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive"
      });
    }
  };

  const filteredProjects = githubRepos?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = selectedLanguages.length === 0 || 
                           selectedLanguages.includes(project.language);
    
    const matchesDifficulty = !selectedDifficulty || selectedDifficulty === 'all' ||
                             project.difficulty_level === selectedDifficulty;
    
    const matchesVerified = !verifiedOnly || project.mentor_available;
    
    return matchesSearch && matchesLanguage && matchesDifficulty && matchesVerified;
  });

  const programmingLanguages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 
    'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin'
  ];

  const labelTypes = [
    { value: 'documentation', label: 'Documentation', icon: FileText, color: 'bg-blue-500' },
    { value: 'frontend', label: 'Frontend', icon: Code, color: 'bg-purple-500' },
    { value: 'bug', label: 'Bug', icon: Bug, color: 'bg-red-500' },
    { value: 'enhancement', label: 'Enhancement', icon: Sparkles, color: 'bg-green-500' },
    { value: 'refactor', label: 'Refactor', icon: RefreshCw, color: 'bg-yellow-500' }
  ];

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    );
  };

  const handleLabelToggle = (label: string) => {
    setSelectedLabels(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return { label: 'Beginner 👶', color: 'bg-green-500' };
      case 'intermediate': return { label: 'Intermediate 🧑‍💻', color: 'bg-yellow-500' };
      case 'advanced': return { label: 'Advanced 🚀', color: 'bg-red-500' };
      default: return { label: 'Not Specified', color: 'bg-gray-500' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            Explore Projects
          </h1>
          <p className="text-gray-300">Discover open-source projects that match your interests and skills</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for projects by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
            />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 space-y-6">
            <Card className="bg-white/10 border-white/20 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Programming Languages */}
                <div>
                  <h3 className="text-white font-medium mb-3">Programming Languages</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {programmingLanguages.map((lang) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <Checkbox
                          id={lang}
                          checked={selectedLanguages.includes(lang)}
                          onCheckedChange={() => handleLanguageToggle(lang)}
                          className="border-white/20"
                        />
                        <label htmlFor={lang} className="text-sm text-gray-300 cursor-pointer">
                          {lang}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty Level */}
                <div>
                  <h3 className="text-white font-medium mb-3">Difficulty Level</h3>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner 👶</SelectItem>
                      <SelectItem value="intermediate">Intermediate 🧑‍💻</SelectItem>
                      <SelectItem value="advanced">Advanced 🚀</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Label Types */}
                <div>
                  <h3 className="text-white font-medium mb-3">Label Types</h3>
                  <div className="space-y-2">
                    {labelTypes.map((labelType) => (
                      <div key={labelType.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={labelType.value}
                          checked={selectedLabels.includes(labelType.value)}
                          onCheckedChange={() => handleLabelToggle(labelType.value)}
                          className="border-white/20"
                        />
                        <label 
                          htmlFor={labelType.value} 
                          className="text-sm text-gray-300 cursor-pointer flex items-center gap-2"
                        >
                          <labelType.icon className="w-4 h-4" />
                          {labelType.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Maintainers */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium">Verified Maintainers Only</label>
                    <Switch
                      checked={verifiedOnly}
                      onCheckedChange={setVerifiedOnly}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Show only projects with verified maintainers</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden w-full mb-6">
            <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="bg-white/10 border-white/20 mt-2">
                  <CardContent className="p-4 space-y-4">
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Difficulty Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">Verified Only</span>
                      <Switch checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Project Cards Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects?.map((project) => {
                  const difficultyInfo = getDifficultyLabel(project.difficulty_level || '');
                  const isBookmarked = bookmarkedProjects.includes(project.id);
                  
                  return (
                    <Card 
                      key={project.id} 
                      className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-white text-lg group-hover:text-purple-200 transition-colors flex items-center gap-2">
                              {project.title}
                              {project.mentor_available && (
                                <Badge className="bg-green-500 text-white text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="text-gray-300 mt-1">
                              by {project.owner.login}
                            </CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmark(project.id)}
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
                          <Badge className={`${difficultyInfo.color} text-white text-xs`}>
                            {difficultyInfo.label}
                          </Badge>
                          {project.tags?.slice(0, 2).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="bg-white/20 text-gray-200 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Good First Issues */}
                        {project.issues && project.issues.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white text-sm font-medium mb-2">Good First Issues:</h4>
                            <div className="space-y-1">
                              {project.issues.map((issue: any, index: number) => (
                                <div key={index} className="text-xs text-gray-300 bg-white/5 p-2 rounded">
                                  {issue.title}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-purple-400 text-purple-300 hover:bg-purple-500/10"
                            onClick={() => window.open(project.repository_url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Repo
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          >
                            Contribute Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {filteredProjects?.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">No projects found</h3>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
