interface StatCardProps {
  value: string;
  label: string;
  icon: string;
}

const StatCard = ({ value, label, icon }: StatCardProps) => (
  <div className="card-gradient border rounded-xl p-5 text-center animate-pulse-glow">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="font-heading font-bold text-2xl text-gradient">{value}</div>
    <div className="text-sm text-muted-foreground mt-1">{label}</div>
  </div>
);

export default StatCard;
