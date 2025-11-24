import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Layout, FileText, TrendingUp, Users } from "lucide-react";
import { Slide, SlideElement } from "./PresentationCreator";

interface Template {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  slide: Slide;
}

const templates: Template[] = [
  {
    id: "title",
    name: "Title Slide",
    icon: <Layout className="w-6 h-6" />,
    description: "Perfect for opening slides",
    slide: {
      id: "template-title",
      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
      elements: [
        {
          id: "title-text",
          type: "text",
          content: "Presentation Title",
          position: { x: 50, y: 40 },
          size: { width: 500, height: 60 }
        },
        {
          id: "subtitle-text",
          type: "text",
          content: "Subtitle goes here",
          position: { x: 50, y: 55 },
          size: { width: 400, height: 40 }
        }
      ]
    }
  },
  {
    id: "content",
    name: "Content Slide",
    icon: <FileText className="w-6 h-6" />,
    description: "Standard content layout",
    slide: {
      id: "template-content",
      background: "hsl(var(--background))",
      elements: [
        {
          id: "heading",
          type: "text",
          content: "Slide Title",
          position: { x: 50, y: 20 },
          size: { width: 400, height: 50 }
        },
        {
          id: "bullet1",
          type: "text",
          content: "• Key point 1",
          position: { x: 30, y: 40 },
          size: { width: 300, height: 40 }
        },
        {
          id: "bullet2",
          type: "text",
          content: "• Key point 2",
          position: { x: 30, y: 55 },
          size: { width: 300, height: 40 }
        },
        {
          id: "bullet3",
          type: "text",
          content: "• Key point 3",
          position: { x: 30, y: 70 },
          size: { width: 300, height: 40 }
        }
      ]
    }
  },
  {
    id: "comparison",
    name: "Comparison Slide",
    icon: <TrendingUp className="w-6 h-6" />,
    description: "Compare two items side by side",
    slide: {
      id: "template-comparison",
      background: "hsl(var(--muted))",
      elements: [
        {
          id: "title",
          type: "text",
          content: "Comparison",
          position: { x: 50, y: 15 },
          size: { width: 400, height: 50 }
        },
        {
          id: "left-title",
          type: "text",
          content: "Option A",
          position: { x: 25, y: 35 },
          size: { width: 200, height: 40 }
        },
        {
          id: "right-title",
          type: "text",
          content: "Option B",
          position: { x: 75, y: 35 },
          size: { width: 200, height: 40 }
        },
        {
          id: "left-content",
          type: "text",
          content: "Details about A",
          position: { x: 25, y: 55 },
          size: { width: 200, height: 80 }
        },
        {
          id: "right-content",
          type: "text",
          content: "Details about B",
          position: { x: 75, y: 55 },
          size: { width: 200, height: 80 }
        }
      ]
    }
  },
  {
    id: "team",
    name: "Team Slide",
    icon: <Users className="w-6 h-6" />,
    description: "Showcase team members",
    slide: {
      id: "template-team",
      background: "hsl(var(--background))",
      elements: [
        {
          id: "title",
          type: "text",
          content: "Our Team",
          position: { x: 50, y: 15 },
          size: { width: 400, height: 50 }
        },
        {
          id: "avatar1",
          type: "avatar",
          content: "",
          position: { x: 25, y: 50 },
          size: { width: 100, height: 100 }
        },
        {
          id: "name1",
          type: "text",
          content: "Team Member 1",
          position: { x: 25, y: 70 },
          size: { width: 150, height: 30 }
        },
        {
          id: "avatar2",
          type: "avatar",
          content: "",
          position: { x: 50, y: 50 },
          size: { width: 100, height: 100 }
        },
        {
          id: "name2",
          type: "text",
          content: "Team Member 2",
          position: { x: 50, y: 70 },
          size: { width: 150, height: 30 }
        },
        {
          id: "avatar3",
          type: "avatar",
          content: "",
          position: { x: 75, y: 50 },
          size: { width: 100, height: 100 }
        },
        {
          id: "name3",
          type: "text",
          content: "Team Member 3",
          position: { x: 75, y: 70 },
          size: { width: 150, height: 30 }
        }
      ]
    }
  }
];

interface TemplateSelectorProps {
  onSelectTemplate: (slide: Slide) => void;
}

const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Layout className="w-4 h-4 mr-2" />
          Use Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Select a pre-designed template to get started quickly
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => onSelectTemplate(template.slide)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </div>
                <div className="aspect-video bg-muted rounded border border-border relative overflow-hidden">
                  <div
                    className="absolute inset-0 text-[8px]"
                    style={{ background: template.slide.background }}
                  >
                    {template.slide.elements.map((el) => (
                      <div
                        key={el.id}
                        className="absolute bg-background/20 rounded flex items-center justify-center text-foreground/50"
                        style={{
                          left: `${el.position.x}%`,
                          top: `${el.position.y}%`,
                          width: `${el.size.width / 8}px`,
                          height: el.type === "text" ? "auto" : `${el.size.height / 8}px`,
                          transform: "translate(-50%, -50%)",
                          padding: "2px"
                        }}
                      >
                        {el.type === "text" && el.content}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
