import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card py-8">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-heading font-semibold text-gradient">CiberGuardianes</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Campaña de concienciación sobre ciberseguridad · Proyecto educativo 2025
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        Hecho con 💙 para proteger a todos en Internet
      </p>
    </div>
  </footer>
);

export default Footer;
