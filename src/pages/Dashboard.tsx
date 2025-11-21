import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Brain, 
  Mic, 
  Video,
  Download,
  Play
} from "lucide-react";

const Dashboard = () => {
  const [processingStage, setProcessingStage] = useState("content-extraction");

  const stages = [
    { id: "content-extraction", label: "Content Extraction", progress: 100, status: "complete" },
    { id: "ai-enhancement", label: "AI Enhancement", progress: 75, status: "processing" },
    { id: "script-generation", label: "Script Generation", progress: 30, status: "processing" },
    { id: "voice-generation", label: "Voice Generation", progress: 0, status: "pending" },
    { id: "video-creation", label: "Video Creation", progress: 0, status: "pending" },
  ];

  const extractedContent = {
    title: "Workplace Safety Protocols 2025",
    slides: 12,
    keyPoints: 8,
    hazards: 3,
    images: 5
  };

  const generatedScript = `
Welcome to the Workplace Safety Protocols training session for 2025.

Today, we will cover essential safety measures that every team member must understand and follow to maintain a secure working environment.

Key topics include:
- Personal Protective Equipment (PPE) requirements
- Hazard identification and reporting procedures
- Emergency response protocols
- Safe equipment operation guidelines

Let's begin with understanding the importance of PPE in our daily operations...
  `.trim();

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Processing <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time content processing and AI analysis
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6 bg-gradient-card border-border shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Overall Progress</CardTitle>
                <CardDescription className="text-base mt-1">
                  Training content generation in progress
                </CardDescription>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Est. 5 min remaining
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={41} className="h-3 mb-4" />
            <div className="text-sm text-muted-foreground">
              41% complete • Processing AI enhancement
            </div>
          </CardContent>
        </Card>

        {/* Stage Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {stages.map((stage) => (
            <Card
              key={stage.id}
              className={`bg-gradient-card border transition-all duration-300 ${
                stage.status === "complete"
                  ? "border-primary/40 shadow-glow"
                  : stage.status === "processing"
                  ? "border-accent/40 shadow-intense"
                  : "border-border"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-base">{stage.label}</CardTitle>
                  {stage.status === "complete" && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                  {stage.status === "processing" && (
                    <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                  )}
                  {stage.status === "pending" && (
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <Progress value={stage.progress} className="h-2" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {stage.progress}% complete
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="extracted" className="space-y-4">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="extracted" className="data-[state=active]:bg-primary/10">
              <FileText className="w-4 h-4 mr-2" />
              Extracted Content
            </TabsTrigger>
            <TabsTrigger value="script" className="data-[state=active]:bg-primary/10">
              <Brain className="w-4 h-4 mr-2" />
              Generated Script
            </TabsTrigger>
            <TabsTrigger value="hazards" className="data-[state=active]:bg-primary/10">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Risk Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="extracted" className="space-y-4">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Content Summary</CardTitle>
                <CardDescription>
                  Automatically extracted from uploaded presentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="text-3xl font-bold text-primary">{extractedContent.slides}</div>
                    <div className="text-sm text-muted-foreground mt-1">Slides</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="text-3xl font-bold text-primary">{extractedContent.keyPoints}</div>
                    <div className="text-sm text-muted-foreground mt-1">Key Points</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="text-3xl font-bold text-accent">{extractedContent.hazards}</div>
                    <div className="text-sm text-muted-foreground mt-1">Hazards</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="text-3xl font-bold text-primary">{extractedContent.images}</div>
                    <div className="text-sm text-muted-foreground mt-1">Images</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="text-3xl font-bold text-primary">24</div>
                    <div className="text-sm text-muted-foreground mt-1">Bullets</div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
                  <h4 className="font-semibold mb-2 text-lg">{extractedContent.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Comprehensive safety training covering PPE requirements, hazard identification,
                    emergency procedures, and operational safety guidelines for all personnel.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="script" className="space-y-4">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI-Generated Training Script</CardTitle>
                    <CardDescription>
                      Enhanced for clarity and compliance
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-primary/30">
                    <Download className="w-4 h-4 mr-2" />
                    Export Script
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-muted/30 border border-border font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  {generatedScript}
                </div>
                <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">Script optimized for {" "}
                    <span className="font-semibold text-primary">Supervisor Level</span> training
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hazards" className="space-y-4">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Risk Factor Analysis</CardTitle>
                <CardDescription>
                  AI-identified hazards and control measures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    hazard: "Inadequate PPE Usage",
                    risk: "High",
                    control: "Mandatory PPE inspection before shift start, visual reminders at entry points"
                  },
                  {
                    hazard: "Equipment Operation Without Training",
                    risk: "Critical",
                    control: "Digital certification verification system, lockout procedures for untrained personnel"
                  },
                  {
                    hazard: "Emergency Exit Obstruction",
                    risk: "Medium",
                    control: "Weekly safety audits, clear signage, designated safety officer rounds"
                  }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg bg-card border border-border hover:border-accent/40 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{item.hazard}</h4>
                      <Badge
                        className={
                          item.risk === "Critical"
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : item.risk === "High"
                            ? "bg-accent/10 text-accent border-accent/20"
                            : "bg-primary/10 text-primary border-primary/20"
                        }
                      >
                        {item.risk} Risk
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Control Measure:</span> {item.control}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
