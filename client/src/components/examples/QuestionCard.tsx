import QuestionCard from '../QuestionCard';

export default function QuestionCardExample() {
  return (
    <QuestionCard
      pillar="Conscious Self-Awareness"
      question="How would you describe your current focus as a leader?"
      options={[
        { value: "A", label: "Driving operational performance" },
        { value: "B", label: "Strengthening your leadership team" },
        { value: "C", label: "Preparing the organization for future growth" },
        { value: "D", label: "Reassessing your own leadership impact" },
      ]}
      onAnswer={(value) => console.log('Selected:', value)}
      onBack={() => console.log('Back clicked')}
      showBack={true}
    />
  );
}
