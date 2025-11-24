import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PresentationCreator from "@/components/PresentationCreator";
import ExportOptions from "@/components/ExportOptions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <PresentationCreator />
      <ExportOptions />
    </div>
  );
};

export default Index;
