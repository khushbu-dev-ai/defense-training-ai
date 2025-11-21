import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Brain, Mic, Video, FileDown, Languages } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Smart Upload",
    description: "Upload PPT, PDF, or images. System automatically extracts slides, notes, and key content.",
  },
  {
    icon: Brain,
    title: "AI Enhancement",
    description: "Rewrites content to be training-friendly, compliance-aligned, and level-appropriate.",
  },
  {
    icon: Mic,
    title: "Voice Generation",
    description: "Multiple voice options with accent selection. Auto-sync narration with slide content.",
  },
  {
    icon: Video,
    title: "Video Creation",
    description: "Convert slides to MP4 with transitions, animations, and synchronized voice-over.",
  },
  {
    icon: FileDown,
    title: "Multiple Exports",
    description: "Generate TBT PDFs, PPTs, posters, and short training videos in one click.",
  },
  {
    icon: Languages,
    title: "Multi-Language",
    description: "Support for Hindi, English, Gujarati, Marathi and more with auto-translation.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-6 bg-military-dark relative">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Complete Training <span className="text-primary">Automation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            End-to-end solution for converting presentations into professional training materials
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gradient-card border-border hover:border-primary/40 transition-all duration-300 hover:shadow-glow group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
