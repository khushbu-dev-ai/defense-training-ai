import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, FileText, Video, Image, Download } from "lucide-react";

const exportFormats = [
  {
    icon: Video,
    title: "MP4 Video",
    description: "Full training video with voice-over and transitions",
    size: "~45 MB",
  },
  {
    icon: FileText,
    title: "TBT PDF",
    description: "One-page toolbox talk summary document",
    size: "~2 MB",
  },
  {
    icon: FileDown,
    title: "PPT with Audio",
    description: "PowerPoint with embedded voice narration",
    size: "~12 MB",
  },
  {
    icon: Image,
    title: "Training Poster",
    description: "Print-ready poster format for notices",
    size: "~5 MB",
  },
];

const ExportOptions = () => {
  return (
    <section className="py-24 px-6 bg-military-dark relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Export In <span className="text-primary">Any Format</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your training materials in multiple formats, ready for deployment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {exportFormats.map((format, index) => (
            <Card
              key={index}
              className="bg-gradient-card border-border hover:border-primary/40 transition-all duration-300 hover:shadow-glow group"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <format.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground px-2 py-1 rounded bg-muted">
                    {format.size}
                  </span>
                </div>
                <CardTitle className="text-xl pt-4">{format.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {format.description}
                </CardDescription>
                <Button 
                  variant="outline" 
                  className="w-full border-primary/30 hover:bg-primary/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bulk export */}
        <Card className="bg-gradient-card border-accent/30 shadow-intense">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Download className="w-6 h-6 text-accent" />
              Bulk Export
            </CardTitle>
            <CardDescription className="text-base">
              Download all formats at once in a single ZIP file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              Download All Formats
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExportOptions;
