import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Volume2, Zap, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VoiceSettings = () => {
  const [selectedVoice, setSelectedVoice] = useState("male-indian");
  const [speed, setSpeed] = useState([1.0]);
  const [pitch, setPitch] = useState([1.0]);
  const [playing, setPlaying] = useState<string | null>(null);
  const { toast } = useToast();

  const voices = [
    {
      id: "male-indian",
      name: "Rajesh Kumar",
      gender: "Male",
      accent: "Indian English",
      description: "Professional, clear, authoritative tone ideal for technical training",
      premium: false
    },
    {
      id: "female-indian",
      name: "Priya Sharma",
      gender: "Female",
      accent: "Indian English",
      description: "Warm, engaging delivery perfect for safety briefings",
      premium: false
    },
    {
      id: "male-us",
      name: "James Mitchell",
      gender: "Male",
      accent: "US English",
      description: "Clear, neutral accent suitable for international audiences",
      premium: true
    },
    {
      id: "female-us",
      name: "Sarah Johnson",
      gender: "Female",
      accent: "US English",
      description: "Professional, articulate voice for corporate training",
      premium: true
    },
    {
      id: "male-uk",
      name: "Oliver Williams",
      gender: "Male",
      accent: "British English",
      description: "Formal, precise delivery for compliance training",
      premium: true
    },
    {
      id: "female-uk",
      name: "Emma Thompson",
      gender: "Female",
      accent: "British English",
      description: "Clear enunciation ideal for step-by-step instructions",
      premium: true
    },
  ];

  const handlePlayPreview = (voiceId: string) => {
    if (playing === voiceId) {
      setPlaying(null);
      toast({ title: "Preview stopped" });
    } else {
      setPlaying(voiceId);
      toast({ title: "Playing preview", description: "Sample audio playback" });
      setTimeout(() => setPlaying(null), 3000);
    }
  };

  const handleApplySettings = () => {
    toast({
      title: "Voice settings applied",
      description: `Using ${voices.find(v => v.id === selectedVoice)?.name} at ${speed[0]}x speed`,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Voice <span className="text-primary">Settings</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Configure AI voice-over narration for your training content
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Voice Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="indian" className="space-y-4">
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="indian" className="data-[state=active]:bg-primary/10">
                  Indian Accent
                </TabsTrigger>
                <TabsTrigger value="us" className="data-[state=active]:bg-primary/10">
                  US Accent
                </TabsTrigger>
                <TabsTrigger value="uk" className="data-[state=active]:bg-primary/10">
                  UK Accent
                </TabsTrigger>
              </TabsList>

              <TabsContent value="indian" className="space-y-4">
                {voices.filter(v => v.accent.includes("Indian")).map((voice) => (
                  <Card
                    key={voice.id}
                    className={`bg-gradient-card border transition-all duration-300 cursor-pointer ${
                      selectedVoice === voice.id
                        ? "border-primary shadow-glow"
                        : "border-border hover:border-primary/40"
                    }`}
                    onClick={() => setSelectedVoice(voice.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-xl">{voice.name}</CardTitle>
                            {selectedVoice === voice.id && (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {voice.gender}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {voice.accent}
                            </Badge>
                          </div>
                          <CardDescription className="text-sm leading-relaxed">
                            {voice.description}
                          </CardDescription>
                        </div>
                        <Button
                          size="icon"
                          variant={playing === voice.id ? "default" : "outline"}
                          className={playing === voice.id ? "bg-primary" : "border-primary/30"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPreview(voice.id);
                          }}
                        >
                          {playing === voice.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="us" className="space-y-4">
                {voices.filter(v => v.accent.includes("US")).map((voice) => (
                  <Card
                    key={voice.id}
                    className={`bg-gradient-card border transition-all duration-300 cursor-pointer ${
                      selectedVoice === voice.id
                        ? "border-primary shadow-glow"
                        : "border-border hover:border-primary/40"
                    }`}
                    onClick={() => setSelectedVoice(voice.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-xl">{voice.name}</CardTitle>
                            {voice.premium && (
                              <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                            {selectedVoice === voice.id && (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {voice.gender}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {voice.accent}
                            </Badge>
                          </div>
                          <CardDescription className="text-sm leading-relaxed">
                            {voice.description}
                          </CardDescription>
                        </div>
                        <Button
                          size="icon"
                          variant={playing === voice.id ? "default" : "outline"}
                          className={playing === voice.id ? "bg-primary" : "border-primary/30"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPreview(voice.id);
                          }}
                        >
                          {playing === voice.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="uk" className="space-y-4">
                {voices.filter(v => v.accent.includes("British")).map((voice) => (
                  <Card
                    key={voice.id}
                    className={`bg-gradient-card border transition-all duration-300 cursor-pointer ${
                      selectedVoice === voice.id
                        ? "border-primary shadow-glow"
                        : "border-border hover:border-primary/40"
                    }`}
                    onClick={() => setSelectedVoice(voice.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-xl">{voice.name}</CardTitle>
                            {voice.premium && (
                              <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                            {selectedVoice === voice.id && (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {voice.gender}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {voice.accent}
                            </Badge>
                          </div>
                          <CardDescription className="text-sm leading-relaxed">
                            {voice.description}
                          </CardDescription>
                        </div>
                        <Button
                          size="icon"
                          variant={playing === voice.id ? "default" : "outline"}
                          className={playing === voice.id ? "bg-primary" : "border-primary/30"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPreview(voice.id);
                          }}
                        >
                          {playing === voice.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border shadow-card sticky top-24">
              <CardHeader>
                <CardTitle>Audio Controls</CardTitle>
                <CardDescription>Fine-tune voice parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Speed Control */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      Speed
                    </label>
                    <span className="text-sm font-mono text-muted-foreground">
                      {speed[0].toFixed(1)}x
                    </span>
                  </div>
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Slower</span>
                    <span>Normal</span>
                    <span>Faster</span>
                  </div>
                </div>

                {/* Pitch Control */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-primary" />
                      Pitch
                    </label>
                    <span className="text-sm font-mono text-muted-foreground">
                      {pitch[0].toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={pitch}
                    onValueChange={setPitch}
                    min={0.5}
                    max={1.5}
                    step={0.1}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Lower</span>
                    <span>Normal</span>
                    <span>Higher</span>
                  </div>
                </div>

                {/* Apply Button */}
                <Button
                  onClick={handleApplySettings}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  Apply Settings
                </Button>

                {/* Sample Text */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Sample Preview Text:</p>
                  <p className="text-sm leading-relaxed p-3 rounded-lg bg-muted/30 border border-border">
                    "Personal protective equipment must be worn at all times in designated areas. 
                    Safety is our top priority."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceSettings;
