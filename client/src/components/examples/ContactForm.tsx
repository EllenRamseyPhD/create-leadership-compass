import ContactForm from '../ContactForm';

export default function ContactFormExample() {
  return (
    <ContactForm
      type="debrief"
      onSubmit={(data) => console.log('Form submitted:', data)}
      onCancel={() => console.log('Cancel clicked')}
    />
  );
}
