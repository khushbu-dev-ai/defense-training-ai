import { Slide, SlideElement } from "./PresentationCreator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface SlideEditorProps {
  slide: Slide;
  selectedElement: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<SlideElement>) => void;
}

const SlideEditor = ({ slide, selectedElement, onSelectElement, onUpdateElement }: SlideEditorProps) => {
  const handleDragEnd = (elementId: string, e: React.DragEvent) => {
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    onUpdateElement(elementId, {
      position: { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
    });
  };

  const renderElement = (element: SlideElement) => {
    const isSelected = selectedElement === element.id;
    const baseClasses = `absolute cursor-move transition-all ${
      isSelected ? "ring-2 ring-primary" : ""
    }`;

    const style = {
      left: `${element.position.x}%`,
      top: `${element.position.y}%`,
      width: `${element.size.width}px`,
      height: element.type === "text" ? "auto" : `${element.size.height}px`,
      transform: "translate(-50%, -50%)"
    };

    switch (element.type) {
      case "text":
        return (
          <div
            key={element.id}
            draggable
            onDragEnd={(e) => handleDragEnd(element.id, e)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement(element.id);
            }}
            className={`${baseClasses} p-2 bg-background/80 rounded`}
            style={style}
          >
            <input
              type="text"
              value={element.content}
              onChange={(e) => onUpdateElement(element.id, { content: e.target.value })}
              className="w-full bg-transparent border-none outline-none text-foreground"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        );

      case "image":
        return (
          <div
            key={element.id}
            draggable
            onDragEnd={(e) => handleDragEnd(element.id, e)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement(element.id);
            }}
            className={`${baseClasses} bg-muted rounded flex items-center justify-center overflow-hidden`}
            style={style}
          >
            {element.content ? (
              <img src={element.content} alt="Slide element" className="w-full h-full object-cover" />
            ) : (
              <span className="text-muted-foreground text-xs">Image</span>
            )}
          </div>
        );

      case "video":
        return (
          <div
            key={element.id}
            draggable
            onDragEnd={(e) => handleDragEnd(element.id, e)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement(element.id);
            }}
            className={`${baseClasses} bg-muted rounded flex items-center justify-center`}
            style={style}
          >
            {element.content ? (
              <video src={element.content} className="w-full h-full object-cover" controls />
            ) : (
              <span className="text-muted-foreground text-xs">Video</span>
            )}
          </div>
        );

      case "avatar":
        return (
          <div
            key={element.id}
            draggable
            onDragEnd={(e) => handleDragEnd(element.id, e)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement(element.id);
            }}
            className={`${baseClasses}`}
            style={style}
          >
            <Avatar className="w-full h-full">
              {element.content ? (
                <AvatarImage src={element.content} />
              ) : (
                <AvatarFallback>
                  <User className="w-1/2 h-1/2" />
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-border"
      style={{
        background: slide.background || "hsl(var(--muted))"
      }}
      onClick={() => onSelectElement(null)}
    >
      {slide.elements.map(renderElement)}
      
      {slide.elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">Click "Add Element" to start building your slide</p>
        </div>
      )}
    </div>
  );
};

export default SlideEditor;
