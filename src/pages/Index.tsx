import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UploadSection from "@/components/UploadSection";
import ExportOptions from "@/components/ExportOptions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <UploadSection />
      <ExportOptions />
    </div>
  );
};

export default Index;
