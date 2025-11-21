import { Button } from "@/components/ui/button";
import { Shield, Zap, Video, FileText } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero grid-pattern">
      {/* Animated background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-military-green/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-primary/20 shadow-glow">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Defence Grade Security</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              AI-Powered Training
            </span>
            <br />
            <span className="text-accent">Content Generator</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform presentations into comprehensive training videos, TBT documents, and voice-over content
            with military-grade AI automation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg shadow-intense group">
              <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Start Creating
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 font-semibold px-8 py-6 text-lg">
              View Demo
            </Button>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            {[
              { icon: Video, text: "Auto Video Generation" },
              { icon: FileText, text: "TBT Documents" },
              { icon: Shield, text: "Offline Processing" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border backdrop-blur-sm"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
