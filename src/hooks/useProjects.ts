
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProjects = (filters?: {
  difficulty?: string;
  tags?: string[];
  mentorAvailable?: boolean;
  lookingForContributors?: boolean;
}) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select(`
          *,
          profiles!projects_organizer_id_fkey(username, full_name)
        `)
        .eq('status', 'active');

      if (filters?.difficulty) {
        query = query.eq('difficulty_level', filters.difficulty);
      }

      if (filters?.mentorAvailable) {
        query = query.eq('mentor_available', true);
      }

      if (filters?.lookingForContributors) {
        query = query.eq('looking_for_contributors', true);
      }

      if (filters?.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};
