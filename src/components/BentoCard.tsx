import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight } from "lucide-react";

interface BentoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  className?: string;
  variant?: "default" | "accent" | "warning";
}

const BentoCard = ({ icon: Icon, title, description, link, className = "", variant = "default" }: BentoCardProps) => {
  const variants = {
    default: "card-gradient border hover:glow-primary",
    accent: "card-gradient border border-accent/20 hover:glow-accent",
    warning: "card-gradient border border-warning/20 hover:border-warning/40",
  };

  return (
    <Link
      to={link}
      className={`group block rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${variants[variant]} ${className}`}
    >
      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
      <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Explorar <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
};

export default BentoCard;
