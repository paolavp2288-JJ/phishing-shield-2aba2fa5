import { AlertTriangle, Target, Users, TrendingUp } from "lucide-react";
import phishingImg from "@/assets/phishing-email.jpg";

const QueEsPhishing = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-4 py-1.5 mb-6">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium text-warning">Amenaza Digital</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            ¿Qué es el <span className="text-gradient">Phishing</span>?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            El phishing es una técnica de ingeniería social que utilizan los ciberdelincuentes 
            para engañarte y obtener información confidencial como contraseñas, datos bancarios 
            o información personal.
          </p>
        </div>
      </section>

      {/* Visual explanation */}
      <section className="py-8 container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-xl overflow-hidden border glow-primary">
            <img src={phishingImg} alt="Ejemplo de phishing" className="w-full h-auto" width={800} height={600} loading="lazy" />
          </div>
          <div className="space-y-6">
            <div className="card-gradient border rounded-xl p-5">
              <h3 className="font-heading font-semibold text-lg mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> ¿Cómo funciona?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                El atacante se hace pasar por una entidad legítima (banco, empresa, red social) 
                y te envía un mensaje urgente para que hagas clic en un enlace falso o descargues 
                un archivo malicioso.
              </p>
            </div>
            <div className="card-gradient border rounded-xl p-5">
              <h3 className="font-heading font-semibold text-lg mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" /> ¿A quién afecta?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A cualquier persona con acceso a Internet. No importa tu edad ni experiencia 
                tecnológica. Los ataques son cada vez más sofisticados y difíciles de detectar.
              </p>
            </div>
            <div className="card-gradient border rounded-xl p-5">
              <h3 className="font-heading font-semibold text-lg mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-warning" /> Tendencia
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Los ataques de phishing han aumentado un 61% en el último año. La Inteligencia 
                Artificial permite crear mensajes cada vez más convincentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to identify */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-3xl mb-8 text-center">
            🔍 Señales de <span className="text-gradient">Alerta</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { emoji: "📧", title: "Remitente sospechoso", desc: "Dirección de email con faltas, dominios raros o ligeramente modificados." },
              { emoji: "⚡", title: "Urgencia extrema", desc: "\"Tu cuenta será bloqueada en 24h\". Intentan que actúes sin pensar." },
              { emoji: "🔗", title: "Enlaces falsos", desc: "URLs que parecen legítimas pero llevan a sitios fraudulentos." },
              { emoji: "📎", title: "Adjuntos peligrosos", desc: "Archivos .exe, .zip o documentos con macros que instalan malware." },
              { emoji: "🎁", title: "Ofertas increíbles", desc: "\"Has ganado un iPhone\". Si suena demasiado bueno, es falso." },
              { emoji: "🔓", title: "Piden datos sensibles", desc: "Ninguna empresa legítima te pedirá tu contraseña por email." },
            ].map((item, i) => (
              <div key={i} className="card-gradient border rounded-xl p-5 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QueEsPhishing;
