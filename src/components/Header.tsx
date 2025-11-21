import { Button } from "@/components/ui/button";
import { Shield, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">DefenceTrain</span>
              <span className="text-xs text-muted-foreground">AI Training Suite</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors ${
                isActive('/dashboard') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/voice-settings" 
              className={`text-sm font-medium transition-colors ${
                isActive('/voice-settings') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Voice Settings
            </Link>
            <Link 
              to="/translation" 
              className={`text-sm font-medium transition-colors ${
                isActive('/translation') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Translation
            </Link>
            <Link 
              to="/analytics" 
              className={`text-sm font-medium transition-colors ${
                isActive('/analytics') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Analytics
            </Link>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get Started
            </Button>
          </nav>

          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
