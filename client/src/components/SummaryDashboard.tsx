import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Users, Shield, TrendingUp, MessageSquare, Zap, Mail, Calendar } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface SummaryDashboardProps {
  responses: {
    consciousSelfAwareness: string;
    relationalIntelligence: string;
    ethicalInfluence: string;
    adaptiveGrowth: string;
    transparentCommunication: string;
    empoweredAction: string;
  };
  summary: string;
  onRequestDebrief: () => void;
  onEmailReport: () => void;
}

const pillarInfo = [
  { key: "consciousSelfAwareness", name: "Conscious Self-Awareness", icon: Brain },
  { key: "relationalIntelligence", name: "Relational Intelligence", icon: Users },
  { key: "ethicalInfluence", name: "Ethical Influence", icon: Shield },
  { key: "adaptiveGrowth", name: "Adaptive Growth", icon: TrendingUp },
  { key: "transparentCommunication", name: "Transparent Communication", icon: MessageSquare },
  { key: "empoweredAction", name: "Empowered Action", icon: Zap },
];

const scoreMapping: Record<string, number> = {
  A: 95,
  B: 75,
  C: 55,
};

export default function SummaryDashboard({
  responses,
  summary,
  onRequestDebrief,
  onEmailReport,
}: SummaryDashboardProps) {
  const chartData = pillarInfo.map((pillar) => ({
    pillar: pillar.name,
    score: scoreMapping[responses[pillar.key as keyof typeof responses]] || 50,
  }));

  const strengths = pillarInfo
    .filter((pillar) => {
      const score = scoreMapping[responses[pillar.key as keyof typeof responses]] || 50;
      return score >= 75;
    })
    .slice(0, 3);

  const opportunities = pillarInfo
    .filter((pillar) => {
      const score = scoreMapping[responses[pillar.key as keyof typeof responses]] || 50;
      return score < 75;
    })
    .slice(0, 3);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
          Your Leadership Profile
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Based on your responses, here's a comprehensive view of your leadership approach
          across the CREATE™ dimensions.
        </p>
      </div>

      <Card className="p-8 md:p-12 mb-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Leadership Compass</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="pillar"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar
                name="Leadership Score"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-8 shadow-md">
          <h3 className="text-xl font-semibold text-foreground mb-6">Key Strengths</h3>
          <div className="space-y-4">
            {strengths.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.key} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{pillar.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Strong foundation in this dimension
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-8 shadow-md">
          <h3 className="text-xl font-semibold text-foreground mb-6">Growth Opportunities</h3>
          <div className="space-y-4">
            {opportunities.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.key} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{pillar.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Potential area for development
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-8 md:p-12 mb-8 shadow-lg bg-gradient-to-br from-card to-accent/10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Personalized Leadership Insights
        </h2>
        <p className="text-base text-foreground leading-relaxed whitespace-pre-line" data-testid="text-summary">
          {summary}
        </p>
      </Card>

      <Card className="p-8 md:p-12 shadow-lg border-primary/20">
  <div className="text-center mb-8">
    <h2 className="text-2xl font-semibold text-foreground mb-3">
      Take the Next Step
    </h2>
    <p className="text-base text-muted-foreground max-w-2xl mx-auto">
      Many leaders find value in a brief, private consultation with Dr. Ramsey to interpret
      their CREATE Leadership Compass™ profile in the context of their organization.
    </p>
  </div>

  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Button
      size="lg"
      onClick={onRequestDebrief}
      className="gap-2"
      data-testid="button-request-debrief"
    >
      <Calendar className="w-5 h-5" />
      Request Confidential Debrief
    </Button>
    <Button
      size="lg"
      variant="outline"
      onClick={onEmailReport}
      className="gap-2"
      data-testid="button-email-report"
    >
      <Mail className="w-5 h-5" />
      Email My Report
    </Button>
  </div>
</Card>

{/* --- new addition here --- */}
<div className="text-center mt-8">
  <p className="text-lg text-muted-foreground mb-4">
    Ready to explore what your results mean for your leadership path?
  </p>
  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSdRrNrjxkIhMlAmJD5Z2V7dIBhb0nyTI166Eh7_B3QIeJicOw/viewform?usp=dialog"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-[#003366] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#00284d] transition"
  >
    Share Your Information for a Private CREATE™ Debrief
  </a>
</div>

<div className="text-center mt-12 text-sm text-muted-foreground">
  <p>CREATE Leadership Model™ developed by Dr. Ellen Ramsey, Ph.D.</p>
</div>
</div>
);
}
