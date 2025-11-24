import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Collaborator {
  id: string;
  name: string;
  color: string;
  online: boolean;
}

interface CollaborationPanelProps {
  presentationId: string;
}

const CollaborationPanel = ({ presentationId }: CollaborationPanelProps) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  useEffect(() => {
    const channel = supabase.channel(`presentation-${presentationId}`);

    // Track presence
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users: Collaborator[] = [];
        
        Object.keys(state).forEach((key) => {
          const presences = state[key];
          presences.forEach((presence: any) => {
            users.push({
              id: presence.user_id,
              name: presence.user_name || 'Anonymous',
              color: presence.color || '#667eea',
              online: true
            });
          });
        });
        
        setCollaborators(users);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track current user's presence
          const userId = `user-${Math.random().toString(36).substr(2, 9)}`;
          const userName = `User ${Math.floor(Math.random() * 100)}`;
          const userColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
          
          await channel.track({
            user_id: userId,
            user_name: userName,
            color: userColor,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [presentationId]);

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Users className="w-4 h-4" />
          Active Collaborators
        </CardTitle>
        <CardDescription className="text-xs">
          {collaborators.length} {collaborators.length === 1 ? 'person' : 'people'} editing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {collaborators.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active collaborators</p>
        ) : (
          collaborators.map((collab) => (
            <div key={collab.id} className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback style={{ backgroundColor: collab.color }}>
                  {collab.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{collab.name}</p>
              </div>
              {collab.online && (
                <Badge variant="outline" className="text-xs">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                  Online
                </Badge>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CollaborationPanel;
