import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Built-in avatar styles
const avatarStyles = [
  { id: "1", bg: "bg-blue-500", initials: "JD" },
  { id: "2", bg: "bg-green-500", initials: "SM" },
  { id: "3", bg: "bg-purple-500", initials: "AK" },
  { id: "4", bg: "bg-orange-500", initials: "RL" },
  { id: "5", bg: "bg-pink-500", initials: "MN" },
  { id: "6", bg: "bg-teal-500", initials: "PT" },
];

// Built-in background patterns
const backgrounds = [
  { id: "solid-dark", name: "Dark", value: "#1a1a1a" },
  { id: "solid-light", name: "Light", value: "#ffffff" },
  { id: "gradient-blue", name: "Blue Gradient", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: "gradient-sunset", name: "Sunset", value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { id: "gradient-ocean", name: "Ocean", value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  { id: "gradient-forest", name: "Forest", value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
  { id: "gradient-fire", name: "Fire", value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
  { id: "gradient-purple", name: "Purple", value: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
];

interface AssetLibraryProps {
  onSelectAvatar: (avatarData: string) => void;
  onSelectBackground: (background: string) => void;
}

const AssetLibrary = ({ onSelectAvatar, onSelectBackground }: AssetLibraryProps) => {
  const handleAvatarSelect = (avatar: typeof avatarStyles[0]) => {
    // Create a simple colored avatar representation
    onSelectAvatar(`avatar-${avatar.id}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Image className="w-4 h-4 mr-2" />
          Asset Library
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Asset Library</DialogTitle>
          <DialogDescription>
            Choose from built-in avatars and backgrounds
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="avatars" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="avatars">
              <User className="w-4 h-4 mr-2" />
              Avatars
            </TabsTrigger>
            <TabsTrigger value="backgrounds">
              <Image className="w-4 h-4 mr-2" />
              Backgrounds
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="avatars" className="mt-4">
            <div className="grid grid-cols-6 gap-4">
              {avatarStyles.map((avatar) => (
                <div
                  key={avatar.id}
                  className="cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className={avatar.bg}>
                      {avatar.initials}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xs text-center mt-1 text-muted-foreground">
                    Avatar {avatar.id}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="backgrounds" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {backgrounds.map((bg) => (
                <div
                  key={bg.id}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => onSelectBackground(bg.value)}
                >
                  <div
                    className="h-32 rounded-lg border-2 border-border hover:border-primary transition-colors"
                    style={{ background: bg.value }}
                  />
                  <p className="text-sm text-center mt-2 font-medium">
                    {bg.name}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AssetLibrary;
