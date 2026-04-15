import { Shield, AlertTriangle, Lock, Brain, Mail, Eye } from "lucide-react";
import heroImage from "@/assets/hero-shield.jpg";
import BentoCard from "@/components/BentoCard";
import StatCard from "@/components/StatCard";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden hero-gradient">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="Ciberseguridad" className="w-full h-full object-cover" width={1920} height={1080} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Campaña de Concienciación</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            No caigas en la trampa del{" "}
            <span className="text-gradient">Phishing</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Aprende a identificar, prevenir y actuar ante las estafas digitales más comunes. 
            Tu seguridad online empieza aquí.
          </p>
          <a
            href="#contenido"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading font-semibold text-primary-foreground transition-all hover:scale-105 glow-primary"
          >
            Explorar la campaña
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon="📧" value="3.4B" label="Emails de phishing enviados al día" />
          <StatCard icon="💰" value="$17K" label="Pérdida media por víctima" />
          <StatCard icon="⏱️" value="22seg" label="Tiempo para caer en una trampa" />
          <StatCard icon="📈" value="61%" label="Aumento de ataques en 2024" />
        </div>
      </section>

      {/* Bento Grid */}
      <section id="contenido" className="py-16 container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
          Descubre todo sobre el <span className="text-gradient">Phishing</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          Explora nuestras secciones para convertirte en un verdadero CiberGuardián
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BentoCard
            icon={AlertTriangle}
            title="¿Qué es el Phishing?"
            description="Entiende cómo funcionan las estafas digitales y por qué son tan peligrosas."
            link="/que-es-phishing"
            className="md:col-span-2"
            variant="warning"
          />
          <BentoCard
            icon={Mail}
            title="Tipos de Ataques"
            description="Desde emails falsos hasta SMS fraudulentos. Conoce todas las variantes."
            link="/tipos-de-ataques"
          />
          <BentoCard
            icon={Lock}
            title="Cómo Protegerte"
            description="Consejos prácticos y herramientas para blindar tu seguridad digital."
            link="/como-protegerte"
            variant="accent"
          />
          <BentoCard
            icon={Brain}
            title="🧠 Quiz Interactivo"
            description="¿Podrás detectar un phishing real? Pon a prueba tus conocimientos."
            link="/quiz"
            className="md:col-span-2"
            variant="accent"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container mx-auto px-4">
        <div className="card-gradient border rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto animate-pulse-glow">
          <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
            Mantén los ojos abiertos
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            El 91% de los ciberataques comienzan con un email de phishing. 
            La mejor defensa eres tú.
          </p>
          <a
            href="/quiz"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading font-semibold text-primary-foreground transition-all hover:scale-105"
          >
            Haz el Quiz ahora
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
