import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Languages, CheckCircle2, ArrowRight, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LanguageTranslation = () => {
  const [sourceLanguage, setSourceLanguage] = useState("english");
  const [targetLanguage, setTargetLanguage] = useState("hindi");
  const [translating, setTranslating] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: "english", name: "English", flag: "🇬🇧" },
    { code: "hindi", name: "Hindi", flag: "🇮🇳" },
    { code: "gujarati", name: "Gujarati", flag: "🇮🇳" },
    { code: "marathi", name: "Marathi", flag: "🇮🇳" },
    { code: "tamil", name: "Tamil", flag: "🇮🇳" },
    { code: "telugu", name: "Telugu", flag: "🇮🇳" },
  ];

  const sampleContent = {
    english: {
      title: "Workplace Safety Protocols 2025",
      description: "Essential safety guidelines for all personnel",
      content: [
        "Always wear appropriate Personal Protective Equipment (PPE)",
        "Report all hazards immediately to your supervisor",
        "Follow emergency evacuation procedures",
        "Maintain clean and organized work areas",
        "Never operate equipment without proper training"
      ]
    },
    hindi: {
      title: "कार्यस्थल सुरक्षा प्रोटोकॉल 2025",
      description: "सभी कर्मियों के लिए आवश्यक सुरक्षा दिशानिर्देश",
      content: [
        "हमेशा उचित व्यक्तिगत सुरक्षा उपकरण (PPE) पहनें",
        "सभी खतरों की तुरंत अपने पर्यवेक्षक को रिपोर्ट करें",
        "आपातकालीन निकासी प्रक्रियाओं का पालन करें",
        "कार्य क्षेत्रों को साफ और व्यवस्थित रखें",
        "उचित प्रशिक्षण के बिना कभी भी उपकरण संचालित न करें"
      ]
    },
    gujarati: {
      title: "કાર્યસ્થળ સુરક્ષા પ્રોટોકોલ 2025",
      description: "તમામ કર્મચારીઓ માટે આવશ્યક સુરક્ષા માર્ગદર્શિકા",
      content: [
        "હંમેશા યોગ્ય વ્યક્તિગત સુરક્ષા સાધનો (PPE) પહેરો",
        "તમામ જોખમો તરત જ તમારા સુપરવાઇઝરને જણાવો",
        "કટોકટી સ્થળાંતર પ્રક્રિયાઓનું પાલન કરો",
        "કાર્ય વિસ્તારોને સ્વચ્છ અને વ્યવસ્થિત રાખો",
        "યોગ્ય તાલીમ વિના ક્યારેય સાધનો ચલાવશો નહીં"
      ]
    },
    marathi: {
      title: "कार्यस्थळ सुरक्षा प्रोटोकॉल 2025",
      description: "सर्व कर्मचार्यांसाठी आवश्यक सुरक्षा मार्गदर्शक तत्त्वे",
      content: [
        "नेहमी योग्य वैयक्तिक संरक्षण उपकरणे (PPE) घाला",
        "सर्व धोके ताबडतोब आपल्या पर्यवेक्षकाला कळवा",
        "आपत्कालीन निर्वासन प्रक्रियेचे पालन करा",
        "कार्य क्षेत्र स्वच्छ आणि व्यवस्थित ठेवा",
        "योग्य प्रशिक्षणाशिवाय कधीही उपकरणे चालवू नका"
      ]
    }
  };

  const handleTranslate = () => {
    setTranslating(true);
    setTimeout(() => {
      setTranslating(false);
      toast({
        title: "Translation complete",
        description: `Content translated to ${languages.find(l => l.code === targetLanguage)?.name}`,
      });
    }, 2000);
  };

  const currentSource = sampleContent[sourceLanguage as keyof typeof sampleContent] || sampleContent.english;
  const currentTarget = sampleContent[targetLanguage as keyof typeof sampleContent] || sampleContent.hindi;

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Language <span className="text-primary">Translation</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            AI-powered multi-language translation for training content
          </p>
        </div>

        {/* Language Selection */}
        <Card className="mb-6 bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-6 h-6 text-primary" />
              Translation Settings
            </CardTitle>
            <CardDescription>
              Select source and target languages for content translation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <label className="text-sm font-medium mb-2 block">Source Language</label>
                <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-center py-4 md:py-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="flex-1 w-full">
                <label className="text-sm font-medium mb-2 block">Target Language</label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 md:pt-6">
                <Button
                  onClick={handleTranslate}
                  disabled={translating || sourceLanguage === targetLanguage}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {translating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Languages className="w-4 h-4 mr-2" />
                      Translate
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Side-by-side comparison */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Source Content */}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle>Source Content</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {languages.find(l => l.code === sourceLanguage)?.flag} {languages.find(l => l.code === sourceLanguage)?.name}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">{currentSource.title}</h3>
                <p className="text-muted-foreground">{currentSource.description}</p>
              </div>

              <div className="space-y-3">
                {currentSource.content.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Translated Content */}
          <Card className="bg-gradient-card border-primary/40 shadow-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle>Translated Content</CardTitle>
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                    {languages.find(l => l.code === targetLanguage)?.flag} {languages.find(l => l.code === targetLanguage)?.name}
                  </Badge>
                </div>
                <Button size="sm" variant="outline" className="border-primary/30">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">{currentTarget.title}</h3>
                <p className="text-muted-foreground">{currentTarget.description}</p>
              </div>

              <div className="space-y-3">
                {currentTarget.content.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Translation Info */}
        <Card className="mt-6 bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Supported Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Context-Aware
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI maintains technical terminology and safety context during translation
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Batch Processing
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Translate entire training modules across multiple languages simultaneously
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Voice Sync
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Automatically generates voice-over in target language with proper pronunciation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LanguageTranslation;
