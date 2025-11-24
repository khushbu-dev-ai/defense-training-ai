import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Type, Image, Video, User, Palette, Trash2 } from "lucide-react";
import { SlideElement, Slide } from "./PresentationCreator";
import { useState } from "react";

interface SlideControlsProps {
  onAddElement: (type: SlideElement["type"], content?: string) => void;
  onSetBackground: (background: string) => void;
  selectedElement: string | null;
  onUpdateElement: (id: string, updates: Partial<SlideElement>) => void;
  onDeleteElement: (id: string) => void;
  currentSlide: Slide;
}

const SlideControls = ({
  onAddElement,
  onSetBackground,
  selectedElement,
  onUpdateElement,
  onDeleteElement,
  currentSlide
}: SlideControlsProps) => {
  const [bgColor, setBgColor] = useState("#1a1a1a");

  const handleFileUpload = (type: "image" | "video" | "avatar", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onAddElement(type, url);
    }
  };

  const selectedElementData = currentSlide.elements.find(el => el.id === selectedElement);

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">Slide Controls</CardTitle>
        <CardDescription>Add and edit elements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Elements */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Add Elements</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => onAddElement("text")} variant="outline" className="w-full">
              <Type className="w-4 h-4 mr-2" />
              Text
            </Button>
            <Button variant="outline" className="w-full relative">
              <Image className="w-4 h-4 mr-2" />
              Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload("image", e)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </Button>
            <Button variant="outline" className="w-full relative">
              <Video className="w-4 h-4 mr-2" />
              Video
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload("video", e)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </Button>
            <Button variant="outline" className="w-full relative">
              <User className="w-4 h-4 mr-2" />
              Avatar
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload("avatar", e)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </Button>
          </div>
        </div>

        {/* Background */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Slide Background</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-20 h-10 cursor-pointer"
            />
            <Button onClick={() => onSetBackground(bgColor)} variant="outline" className="flex-1">
              <Palette className="w-4 h-4 mr-2" />
              Set Color
            </Button>
          </div>
          <Button variant="outline" className="w-full mt-2 relative">
            <Image className="w-4 h-4 mr-2" />
            Background Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  onSetBackground(`url(${url})`);
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </Button>
        </div>

        {/* Element Properties */}
        {selectedElement && selectedElementData && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-semibold">Element Properties</Label>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteElement(selectedElement)}
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
            
            {selectedElementData.type === "text" && (
              <Textarea
                value={selectedElementData.content}
                onChange={(e) => onUpdateElement(selectedElement, { content: e.target.value })}
                placeholder="Enter text"
                className="mb-3"
              />
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Width (px)</Label>
                <Input
                  type="number"
                  value={selectedElementData.size.width}
                  onChange={(e) => onUpdateElement(selectedElement, {
                    size: { ...selectedElementData.size, width: parseInt(e.target.value) || 100 }
                  })}
                  min="50"
                  max="800"
                />
              </div>
              {selectedElementData.type !== "text" && (
                <div>
                  <Label className="text-xs">Height (px)</Label>
                  <Input
                    type="number"
                    value={selectedElementData.size.height}
                    onChange={(e) => onUpdateElement(selectedElement, {
                      size: { ...selectedElementData.size, height: parseInt(e.target.value) || 100 }
                    })}
                    min="50"
                    max="600"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SlideControls;
