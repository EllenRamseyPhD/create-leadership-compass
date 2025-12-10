import SummaryDashboard from '../SummaryDashboard';

export default function SummaryDashboardExample() {
  const mockResponses = {
    consciousSelfAwareness: "A",
    relationalIntelligence: "B",
    ethicalInfluence: "A",
    adaptiveGrowth: "B",
    transparentCommunication: "C",
    empoweredAction: "A",
  };

  const mockSummary = `Based on your responses, your leadership profile shows high integrity and strategic focus, with opportunity to strengthen cross-team alignment and adaptive communication.

Your strong performance in Conscious Self-Awareness, Ethical Influence, and Empowered Action indicates you are well-grounded in your leadership purpose and values. You demonstrate clarity about your impact and actively foster autonomy within your team.

The dimensions of Transparent Communication and Adaptive Growth present opportunities for development. Consider exploring how information flows across leadership levels and how you might build more experimental approaches to organizational change.

These themes align closely with the CREATE Leadership Model™ and suggest a leader who is both principled and pragmatic, with room to enhance collaborative agility.`;

  return (
    <SummaryDashboard
      responses={mockResponses}
      summary={mockSummary}
      onRequestDebrief={() => console.log('Request debrief clicked')}
      onEmailReport={() => console.log('Email report clicked')}
    />
  );
}
