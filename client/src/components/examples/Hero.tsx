import Hero from '../Hero';

export default function HeroExample() {
  return <Hero onBeginAssessment={() => console.log('Begin assessment clicked')} />;
}
