
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useUserStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      // Get contributions count
      const { data: contributions, error: contribError } = await supabase
        .from('contributions')
        .select('id, type')
        .eq('user_id', user.id);

      if (contribError) throw contribError;

      // Get badges count
      const { data: badges, error: badgesError } = await supabase
        .from('user_badges')
        .select('id')
        .eq('user_id', user.id);

      if (badgesError) throw badgesError;

      // Get bookmarks count
      const { data: bookmarks, error: bookmarksError } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id);

      if (bookmarksError) throw bookmarksError;

      return {
        totalContributions: contributions?.length || 0,
        totalBadges: badges?.length || 0,
        totalBookmarks: bookmarks?.length || 0,
        contributionsByType: contributions?.reduce((acc, contrib) => {
          acc[contrib.type] = (acc[contrib.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {}
      };
    },
    enabled: !!user?.id,
  });
};
