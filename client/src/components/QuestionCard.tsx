import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Users, Shield, TrendingUp, MessageSquare, Zap } from "lucide-react";
import { useState } from "react";

interface QuestionCardProps {
  pillar: string;
  question: string;
  options: { value: string; label: string }[];
  onAnswer: (value: string) => void;
  onBack?: () => void;
  showBack?: boolean;
}

const pillarIcons: Record<string, any> = {
  "Conscious Self-Awareness": Brain,
  "Relational Intelligence": Users,
  "Ethical Influence": Shield,
  "Adaptive Growth": TrendingUp,
  "Transparent Communication": MessageSquare,
  "Empowered Action": Zap,
};

export default function QuestionCard({
  pillar,
  question,
  options,
  onAnswer,
  onBack,
  showBack = false,
}: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const Icon = pillarIcons[pillar] || Brain;

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleContinue = () => {
    if (selectedValue) {
      onAnswer(selectedValue);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-8">
      <Card className="p-8 md:p-12 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">{pillar}</h2>
        </div>

        <p className="text-lg text-foreground mb-8 leading-relaxed">{question}</p>

        <div className="space-y-4 mb-8">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full p-6 text-left rounded-md border-2 transition-all hover-elevate ${
                selectedValue === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              }`}
              data-testid={`option-${option.value}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedValue === option.value
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {selectedValue === option.value && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                  )}
                </div>
                <span className="text-base text-foreground leading-relaxed">
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          {showBack ? (
            <Button
              variant="outline"
              onClick={onBack}
              data-testid="button-back"
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            onClick={handleContinue}
            disabled={!selectedValue}
            size="lg"
            data-testid="button-continue"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}
