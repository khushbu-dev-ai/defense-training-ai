import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Play, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SlideEditor from "./SlideEditor";
import SlideControls from "./SlideControls";

export interface SlideElement {
  id: string;
  type: "text" | "image" | "video" | "avatar";
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Slide {
  id: string;
  background?: string;
  elements: SlideElement[];
}

const PresentationCreator = () => {
  const [slides, setSlides] = useState<Slide[]>([
    { id: "1", elements: [] }
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const { toast } = useToast();

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      elements: []
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
    toast({
      title: "Slide added",
      description: `Slide ${slides.length + 1} created`,
    });
  };

  const deleteSlide = (index: number) => {
    if (slides.length === 1) {
      toast({
        title: "Cannot delete",
        description: "You need at least one slide",
        variant: "destructive"
      });
      return;
    }
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    }
    toast({
      title: "Slide deleted",
      description: "Slide removed successfully",
    });
  };

  const updateSlide = (index: number, updatedSlide: Slide) => {
    const newSlides = [...slides];
    newSlides[index] = updatedSlide;
    setSlides(newSlides);
  };

  const addElementToSlide = (type: SlideElement["type"], content: string = "") => {
    const currentSlide = slides[currentSlideIndex];
    const newElement: SlideElement = {
      id: Date.now().toString(),
      type,
      content: content || (type === "text" ? "Enter text here" : ""),
      position: { x: 50, y: 50 },
      size: { width: 200, height: type === "text" ? 50 : 150 }
    };
    
    const updatedSlide = {
      ...currentSlide,
      elements: [...currentSlide.elements, newElement]
    };
    updateSlide(currentSlideIndex, updatedSlide);
    setSelectedElement(newElement.id);
  };

  const updateElement = (elementId: string, updates: Partial<SlideElement>) => {
    const currentSlide = slides[currentSlideIndex];
    const updatedElements = currentSlide.elements.map(el =>
      el.id === elementId ? { ...el, ...updates } : el
    );
    updateSlide(currentSlideIndex, { ...currentSlide, elements: updatedElements });
  };

  const deleteElement = (elementId: string) => {
    const currentSlide = slides[currentSlideIndex];
    const updatedElements = currentSlide.elements.filter(el => el.id !== elementId);
    updateSlide(currentSlideIndex, { ...currentSlide, elements: updatedElements });
    setSelectedElement(null);
  };

  const setBackground = (background: string) => {
    const currentSlide = slides[currentSlideIndex];
    updateSlide(currentSlideIndex, { ...currentSlide, background });
  };

  const generateVideo = () => {
    toast({
      title: "Generating AI Video",
      description: "Processing your presentation with AI...",
    });
  };

  const savePresentation = () => {
    toast({
      title: "Presentation Saved",
      description: "Your presentation has been saved successfully",
    });
  };

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Create Your <span className="text-accent">Presentation</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Build slides with AI-powered content generation
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          {/* Slides Panel */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Slides</CardTitle>
              <CardDescription>Manage your presentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      index === currentSlideIndex
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setCurrentSlideIndex(index)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Slide {index + 1}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSlide(index);
                        }}
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      >
                        ×
                      </Button>
                    </div>
                    <div className="mt-2 aspect-video bg-muted rounded text-xs flex items-center justify-center">
                      {slide.elements.length} elements
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={addSlide} className="w-full" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Slide
              </Button>
            </CardContent>
          </Card>

          {/* Editor Panel */}
          <div className="space-y-6">
            <SlideControls
              onAddElement={addElementToSlide}
              onSetBackground={setBackground}
              selectedElement={selectedElement}
              onUpdateElement={updateElement}
              onDeleteElement={deleteElement}
              currentSlide={slides[currentSlideIndex]}
            />

            <Card className="bg-gradient-card border-border shadow-card">
              <CardContent className="p-6">
                <SlideEditor
                  slide={slides[currentSlideIndex]}
                  selectedElement={selectedElement}
                  onSelectElement={setSelectedElement}
                  onUpdateElement={updateElement}
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <Button onClick={savePresentation} variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={generateVideo} className="bg-accent hover:bg-accent/90">
                <Play className="w-4 h-4 mr-2" />
                Generate AI Video
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresentationCreator;
