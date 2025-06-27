
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, BookmarkPlus, Trophy, Code, Users, Filter, Search } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useUserStats } from "@/hooks/useUserStats";
import ProjectCard from "./ProjectCard";
import StatsOverview from "./StatsOverview";
import ActivityFeed from "./ActivityFeed";
import BookmarkedProjects from "./BookmarkedProjects";

const ContributorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mentorFilter, setMentorFilter] = useState(false);

  const { data: projects, isLoading: projectsLoading } = useProjects({
    difficulty: selectedDifficulty || undefined,
    tags: selectedTags,
    mentorAvailable: mentorFilter || undefined,
    lookingForContributors: true
  });

  const { data: userStats } = useUserStats();

  const filteredProjects = projects?.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const commonTags = ['JavaScript', 'TypeScript', 'React', 'Python', 'Go', 'Rust', 'Machine Learning', 'Frontend', 'Backend', 'Mobile'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Contributor Dashboard
            </h1>
            <p className="text-gray-300 mt-2">Discover projects and track your open source journey</p>
          </div>
        </div>

        <StatsOverview stats={userStats} />

        <Tabs defaultValue="discover" className="mt-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="discover" className="text-white data-[state=active]:bg-purple-600">
              Discover Projects
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="text-white data-[state=active]:bg-purple-600">
              Bookmarked
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-white data-[state=active]:bg-purple-600">
              Activity Feed
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-white data-[state=active]:bg-purple-600">
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="mt-6">
            <Card className="bg-white/10 border-white/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters & Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
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

                  <Button
                    variant={mentorFilter ? "default" : "outline"}
                    onClick={() => setMentorFilter(!mentorFilter)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Mentor Available
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedDifficulty('');
                      setSelectedTags([]);
                      setMentorFilter(false);
                    }}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Clear Filters
                  </Button>
                </div>

                <div className="mt-4">
                  <p className="text-gray-300 mb-2 text-sm">Popular Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {commonTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          selectedTags.includes(tag)
                            ? "bg-purple-600 text-white"
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                        onClick={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(t => t !== tag));
                          } else {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="bg-white/10 border-white/20 animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-white/20 rounded mb-2"></div>
                      <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 bg-white/20 rounded"></div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                filteredProjects?.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="bookmarks">
            <BookmarkedProjects />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityFeed />
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Your Achievements
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Track your progress and unlock new badges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Trophy className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300">Achievement system coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContributorDashboard;
