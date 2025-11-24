import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AIContentSuggestionsProps {
  onApplySuggestion: (content: string) => void;
}

const AIContentSuggestions = ({ onApplySuggestion }: AIContentSuggestionsProps) => {
  const [topic, setTopic] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateSuggestions = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for content generation",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: { topic }
      });

      if (error) throw error;

      setSuggestions(data.suggestions || []);
      toast({
        title: "Content generated",
        description: "AI has generated content suggestions for your slide"
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: "Failed to generate AI content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Sparkles className="w-4 h-4 mr-2" />
          AI Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Content Suggestions</DialogTitle>
          <DialogDescription>
            Generate training content based on your topic
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="topic">Training Topic</Label>
            <Textarea
              id="topic"
              placeholder="E.g., 'Safety procedures for equipment operation' or 'Team leadership principles'"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              className="mt-2"
            />
          </div>

          <Button 
            onClick={generateSuggestions} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Content
              </>
            )}
          </Button>

          {suggestions.length > 0 && (
            <div className="space-y-3 mt-6">
              <Label>Suggested Content</Label>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                >
                  <p className="text-sm mb-3">{suggestion}</p>
                  <Button
                    size="sm"
                    onClick={() => {
                      onApplySuggestion(suggestion);
                      toast({
                        title: "Content applied",
                        description: "AI suggestion added to your slide"
                      });
                    }}
                  >
                    Apply to Slide
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIContentSuggestions;
