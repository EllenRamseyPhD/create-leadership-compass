import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface HeroProps {
  onBeginAssessment: () => void;
}

export default function Hero({ onBeginAssessment }: HeroProps) {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAyNGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBvcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Powered by AI & Research</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight tracking-tight">
          CREATE Leadership Compass™
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 leading-relaxed">
          Your AI reflection partner powered by Dr. Ellen Ramsey's CREATE Leadership Model™
        </p>
        
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          This brief reflection represents a small percentage of our comprehensive in-depth assessment. Explore how your current leadership approach aligns with six key dimensions of sustainable, human-centered leadership.
        </p>
        
        <Button 
          size="lg" 
          onClick={onBeginAssessment}
          className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
          data-testid="button-begin-assessment"
        >
          Begin Your Assessment
        </Button>
        
        <p className="text-sm text-muted-foreground mt-6">
          5-7 minutes • Confidential • No account required
        </p>
      </div>
    </div>
  );
}
