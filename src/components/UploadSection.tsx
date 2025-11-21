import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "File selected",
        description: `${selectedFile.name} is ready to upload`,
      });
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Upload successful",
        description: "Your file is being processed by AI",
      });
    }, 2000);
  };

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Upload Your <span className="text-accent">Content</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Start by uploading your presentation or training materials
          </p>
        </div>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">Upload Training Materials</CardTitle>
            <CardDescription className="text-base">
              Supported formats: PPT, PPTX, PDF, Images (JPG, PNG)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload area */}
            <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-12 text-center transition-colors group cursor-pointer">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".ppt,.pptx,.pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {file ? (
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  ) : (
                    <Upload className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">
                    {file ? file.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Maximum file size: 50MB
                  </p>
                </div>
              </label>
            </div>

            {/* File info */}
            {file && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                <FileText className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {uploading ? "Processing..." : "Process File"}
                </Button>
              </div>
            )}

            {/* Info boxes */}
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm mb-1">Secure Processing</p>
                  <p className="text-xs text-muted-foreground">All data processed offline with military-grade encryption</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/20">
                <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm mb-1">No Third-Party</p>
                  <p className="text-xs text-muted-foreground">Processing happens entirely on secure Defence systems</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UploadSection;
