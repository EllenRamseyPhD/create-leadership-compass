import ConfirmationMessage from '../ConfirmationMessage';

export default function ConfirmationMessageExample() {
  return (
    <ConfirmationMessage
      type="debrief"
      onReturnHome={() => console.log('Return home clicked')}
    />
  );
}
