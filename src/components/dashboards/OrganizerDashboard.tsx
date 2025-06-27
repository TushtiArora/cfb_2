
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, BarChart3, Users, MessageSquare, Award, Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ProjectWizard from "./ProjectWizard";
import OrganizerStats from "./OrganizerStats";
import ProjectManagement from "./ProjectManagement";

const OrganizerDashboard = () => {
  const [showProjectWizard, setShowProjectWizard] = useState(false);
  const { user } = useAuth();

  const { data: myProjects, isLoading: projectsLoading } = useQuery({
    queryKey: ['my-projects', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          contributions(count),
          bookmarks(count)
        `)
        .eq('organizer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Organizer Dashboard
            </h1>
            <p className="text-gray-300 mt-2">Manage your projects and grow your community</p>
          </div>
          <Button
            onClick={() => setShowProjectWizard(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </div>

        <OrganizerStats projects={myProjects} />

        <Tabs defaultValue="projects" className="mt-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/10">
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-purple-600">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-600">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="community" className="text-white data-[state=active]:bg-purple-600">
              Community
            </TabsTrigger>
            <TabsTrigger value="rewards" className="text-white data-[state=active]:bg-purple-600">
              Rewards
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-white data-[state=active]:bg-purple-600">
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <ProjectManagement projects={myProjects} isLoading={projectsLoading} />
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Project Analytics
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Deep insights into your project performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300">Advanced analytics coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Communication Hub
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Engage with your contributors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300">Communication tools coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Reward & Recognition
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Create custom badges and recognize top contributors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300">Reward system coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Project Templates
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Curated templates for different tech stacks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300">Project templates coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showProjectWizard && (
          <ProjectWizard onClose={() => setShowProjectWizard(false)} />
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
