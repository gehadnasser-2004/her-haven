import Card from './Card';

export default function CardList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-[928px]">
      <Card
        title="Personalized Tracking"
        description="Track your pregnancy milestones, appointments, and symptoms with our intuitive calendar."
      />
      <Card
        title="AI Chat Support"
        description="Get instant answers to your questions anytime with AI-powered support."
      />
      <Card
        title="Timely Notifications"
        description="Receive personalized reminders for appointments, medications, and self-care activities."
      />
      <Card
        title="Wellbeing Resources"
        description="Access a library of articles, videos, and guides on pregnancy, childbirth, and parenting."
      />
    </div>
  );
}
