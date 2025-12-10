import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Hero from "@/components/Hero";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import SummaryDashboard from "@/components/SummaryDashboard";
import ContactForm from "@/components/ContactForm";
import ConfirmationMessage from "@/components/ConfirmationMessage";
import { useToast } from "@/hooks/use-toast";

type AssessmentState = "welcome" | "assessment" | "summary" | "contact" | "confirmation";

const questions = [
  {
    pillar: "Conscious Self-Awareness",
    question: "How would you describe your current focus as a leader?",
    options: [
      { value: "A", label: "Driving operational performance" },
      { value: "B", label: "Strengthening your leadership team" },
      { value: "C", label: "Preparing the organization for future growth" },
      { value: "D", label: "Reassessing your own leadership impact" },
    ],
  },
  {
    pillar: "Relational Intelligence",
    question: "When thinking about your executive team, which best describes the current dynamic?",
    options: [
      { value: "A", label: "Highly aligned and trusting" },
      { value: "B", label: "Functionally strong but somewhat siloed" },
      { value: "C", label: "Capable but inconsistent in communication" },
      { value: "D", label: "In transition or rebuilding trust" },
    ],
  },
  {
    pillar: "Ethical Influence",
    question: "How do values and ethics show up in your organization's decision-making?",
    options: [
      { value: "A", label: "Consistently reflected in strategy" },
      { value: "B", label: "Sometimes discussed but not fully lived" },
      { value: "C", label: "Primarily reactive when issues arise" },
    ],
  },
  {
    pillar: "Adaptive Growth",
    question: "In the face of disruption (AI, market shifts, new ownership), what's your instinctive response as a leader?",
    options: [
      { value: "A", label: "I adapt quickly and guide others to do the same" },
      { value: "B", label: "I manage change, but it often feels reactive" },
      { value: "C", label: "I rely on stability more than experimentation" },
    ],
  },
  {
    pillar: "Transparent Communication",
    question: "How freely does information flow across your leadership levels?",
    options: [
      { value: "A", label: "Open and reciprocal" },
      { value: "B", label: "Clear at the top, mixed elsewhere" },
      { value: "C", label: "Controlled and cautious" },
    ],
  },
  {
    pillar: "Empowered Action",
    question: "When your team makes decisions, do they feel true ownership?",
    options: [
      { value: "A", label: "Yes, autonomy is encouraged" },
      { value: "B", label: "Partially, though some rely on approval" },
      { value: "C", label: "Not yet—most decisions flow upward" },
    ],
  },
];

export default function Home() {
  const [state, setState] = useState<AssessmentState>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [contactType, setContactType] = useState<"debrief" | "email">("debrief");
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const { toast } = useToast();

  const generateSummaryMutation = useMutation({
    mutationFn: async (responses: Record<string, string>) => {
      const result = await apiRequest("POST", "/api/assessments/generate-summary", { responses });
      return await result.json();
    },
  });

  const saveAssessmentMutation = useMutation({
    mutationFn: async (data: { responses: Record<string, string>; summary: string; name?: string; email?: string }) => {
      const result = await apiRequest("POST", "/api/assessments", data);
      return await result.json();
    },
  });

  const handleBeginAssessment = () => {
    setState("assessment");
    setCurrentQuestion(0);
    setResponses({});
  };

  const handleAnswer = async (value: string) => {
    const pillarMapping: Record<string, string> = {
      "Conscious Self-Awareness": "consciousSelfAwareness",
      "Relational Intelligence": "relationalIntelligence",
      "Ethical Influence": "ethicalInfluence",
      "Adaptive Growth": "adaptiveGrowth",
      "Transparent Communication": "transparentCommunication",
      "Empowered Action": "empoweredAction",
    };

    const questionKey = pillarMapping[questions[currentQuestion].pillar];

    const newResponses = {
      ...responses,
      [questionKey]: value,
    };

    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsGeneratingSummary(true);
      try {
        const result = await generateSummaryMutation.mutateAsync(newResponses);
        setAiSummary(result.summary);
        setState("summary");
      } catch (error) {
        console.error("Error generating summary:", error);
        toast({
          title: "Error",
          description: "Failed to generate your leadership profile. Please try again.",
          variant: "destructive",
        });
        setAiSummary(generateSummary(newResponses));
        setState("summary");
      } finally {
        setIsGeneratingSummary(false);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleRequestDebrief = () => {
    setContactType("debrief");
    setState("contact");
  };

  const handleEmailReport = () => {
    setContactType("email");
    setState("contact");
  };

  const handleContactSubmit = async (data: { name: string; email: string; message?: string }) => {
    try {
      await saveAssessmentMutation.mutateAsync({
        responses,
        summary: aiSummary || generateSummary(responses),
        name: data.name,
        email: data.email,
      });
      
      toast({
        title: "Success",
        description: contactType === "debrief" 
          ? "Your consultation request has been received." 
          : "Your report has been sent to your email.",
      });
      
      setState("confirmation");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReturnHome = () => {
    setState("welcome");
    setCurrentQuestion(0);
    setResponses({});
    setAiSummary("");
  };

  const generateSummary = (responsesToAnalyze: Record<string, string> = responses) => {
    const pillarNames: Record<string, string> = {
      consciousSelfAwareness: "Conscious Self-Awareness",
      relationalIntelligence: "Relational Intelligence",
      ethicalInfluence: "Ethical Influence",
      adaptiveGrowth: "Adaptive Growth",
      transparentCommunication: "Transparent Communication",
      empoweredAction: "Empowered Action",
    };

    const highScores = Object.entries(responsesToAnalyze).filter(([, value]) => value === "A");
    const mediumScores = Object.entries(responsesToAnalyze).filter(([, value]) => value === "B");

    let summary = "Based on your responses, your leadership profile shows ";

    if (highScores.length >= 4) {
      summary += "exceptional strength and strategic clarity across multiple dimensions. ";
    } else if (highScores.length >= 2) {
      summary += "strong capabilities with clear areas of excellence. ";
    } else {
      summary += "thoughtful self-awareness and recognition of growth opportunities. ";
    }

    summary += "\n\n";

    if (highScores.length > 0) {
      const strengths = highScores.map(([key]) => pillarNames[key]).filter(Boolean);
      summary += `Your strongest dimensions include ${strengths.join(", ")}. These areas demonstrate your grounded approach to leadership and your commitment to sustainable practices.\n\n`;
    }

    if (mediumScores.length > 0 || highScores.length < questions.length) {
      summary += "Areas for potential development include enhancing cross-functional collaboration and adaptive communication strategies. ";
      summary += "These opportunities align with the CREATE Leadership Model™ framework for continuous growth.\n\n";
    }

    summary += "Your profile suggests a leader who values both integrity and impact, with a foundation ready for deeper strategic work.";

    return summary;
  };

  return (
    <div className="min-h-screen bg-background">
      {state === "welcome" && <Hero onBeginAssessment={handleBeginAssessment} />}

      {state === "assessment" && (
        <>
          <ProgressBar currentStep={currentQuestion + 1} totalSteps={questions.length} />
          <QuestionCard
            key={currentQuestion}
            pillar={questions[currentQuestion].pillar}
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            onAnswer={handleAnswer}
            onBack={handleBack}
            showBack={currentQuestion > 0}
          />
        </>
      )}

      {state === "summary" && (
        <SummaryDashboard
          responses={responses as any}
          summary={aiSummary || generateSummary()}
          onRequestDebrief={handleRequestDebrief}
          onEmailReport={handleEmailReport}
        />
      )}

      {state === "contact" && (
        <ContactForm
          type={contactType}
          onSubmit={handleContactSubmit}
          onCancel={() => setState("summary")}
        />
      )}

      {state === "confirmation" && (
        <ConfirmationMessage type={contactType} onReturnHome={handleReturnHome} />
      )}
    </div>
  );
}
