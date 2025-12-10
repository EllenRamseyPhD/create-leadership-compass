import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface ContactFormProps {
  type: "debrief" | "email";
  onSubmit: (data: { name: string; email: string; message?: string }) => void;
  onCancel: () => void;
}

export default function ContactForm({ type, onSubmit, onCancel }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, message });
  };

  const title = type === "debrief" 
    ? "Request Confidential Debrief" 
    : "Email Leadership Report";
  
  const description = type === "debrief"
    ? "Share your contact information and Dr. Ramsey will reach out to schedule a private consultation."
    : "Enter your email address to receive your complete leadership profile and insights.";

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12">
      <Card className="p-8 md:p-12 shadow-lg">
        <h2 className="text-3xl font-semibold text-foreground mb-3">{title}</h2>
        <p className="text-base text-muted-foreground mb-8">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              required
              data-testid="input-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.smith@company.com"
              required
              data-testid="input-email"
            />
          </div>

          {type === "debrief" && (
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message (Optional)
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share any specific areas you'd like to explore in your consultation..."
                rows={4}
                data-testid="input-message"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button type="submit" size="lg" className="flex-1" data-testid="button-submit">
              {type === "debrief" ? "Request Consultation" : "Send Report"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onCancel}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
