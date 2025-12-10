import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface ConfirmationMessageProps {
  type: "debrief" | "email";
  onReturnHome: () => void;
}

export default function ConfirmationMessage({ type, onReturnHome }: ConfirmationMessageProps) {
  const title = type === "debrief" 
    ? "Consultation Request Received" 
    : "Report Sent Successfully";
  
  const message = type === "debrief"
    ? "Thank you for your interest. Dr. Ramsey will review your request and reach out within 1-2 business days to schedule your confidential consultation."
    : "Your complete leadership profile and insights have been sent to your email. Please check your inbox (and spam folder) for your personalized report.";

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12">
      <Card className="p-8 md:p-12 shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/10">
            <CheckCircle2 className="w-16 h-16 text-primary" />
          </div>
        </div>
        
        <h2 className="text-3xl font-semibold text-foreground mb-4">{title}</h2>
        <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto">
          {message}
        </p>
        
        <Button onClick={onReturnHome} size="lg" data-testid="button-return-home">
          Return to Home
        </Button>
      </Card>
    </div>
  );
}
