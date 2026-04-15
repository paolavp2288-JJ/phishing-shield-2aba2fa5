import { Mail, Phone, MessageSquare, Globe, Wifi, UserX } from "lucide-react";

const attacks = [
  {
    icon: Mail,
    name: "Email Phishing",
    desc: "El más común. Recibes un email falso que imita a tu banco, tienda online o red social pidiendo que verifiques tu cuenta.",
    example: "\"Estimado cliente, detectamos actividad sospechosa en su cuenta. Haga clic aquí para verificar su identidad.\"",
    danger: "Alta",
  },
  {
    icon: MessageSquare,
    name: "Smishing (SMS)",
    desc: "Phishing a través de mensajes de texto. Suelen incluir enlaces acortados que llevan a webs falsas.",
    example: "\"CORREOS: Su paquete está retenido. Pague 1,99€ de aduanas aquí: bit.ly/xxxx\"",
    danger: "Alta",
  },
  {
    icon: Phone,
    name: "Vishing (Llamadas)",
    desc: "Te llaman haciéndose pasar por tu banco o soporte técnico. Usan la presión verbal para que des tus datos.",
    example: "\"Somos el departamento de seguridad de su banco. Necesitamos verificar su número de tarjeta para bloquear una transacción sospechosa.\"",
    danger: "Media-Alta",
  },
  {
    icon: Globe,
    name: "Pharming",
    desc: "Redirigen tu navegador a webs falsas aunque escribas la dirección correcta. Manipulan los servidores DNS.",
    example: "Escribes www.tubanco.com pero acabas en una copia exacta controlada por hackers.",
    danger: "Muy Alta",
  },
  {
    icon: UserX,
    name: "Spear Phishing",
    desc: "Ataques personalizados dirigidos a una persona concreta. Investigan sobre ti para hacer el engaño más creíble.",
    example: "\"Hola María, soy Pedro del departamento de RRHH. Necesito que actualices tu información fiscal en este enlace.\"",
    danger: "Muy Alta",
  },
  {
    icon: Wifi,
    name: "Evil Twin (WiFi falsa)",
    desc: "Crean una red WiFi falsa con el nombre de una red legítima. Todo lo que navegas pasa por el atacante.",
    example: "Te conectas a \"WiFi_Gratis_Cafetería\" en un aeropuerto y el atacante captura tus credenciales.",
    danger: "Alta",
  },
];

const dangerColors: Record<string, string> = {
  "Alta": "text-warning",
  "Media-Alta": "text-warning",
  "Muy Alta": "text-destructive",
};

const TiposDeAtaques = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Tipos de <span className="text-gradient">Ataques</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            El phishing tiene muchas caras. Conocer cada tipo te ayudará a reconocerlos antes de que sea demasiado tarde.
          </p>

          <div className="space-y-6">
            {attacks.map((attack, i) => (
              <div
                key={i}
                className="card-gradient border rounded-xl p-6 md:p-8 transition-all hover:-translate-y-1 hover:glow-primary animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 shrink-0">
                    <attack.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-heading font-bold text-xl">{attack.name}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${dangerColors[attack.danger] || "text-warning"} border-current`}>
                        Peligro: {attack.danger}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">{attack.desc}</p>
                    <div className="bg-muted/50 rounded-lg p-4 border border-dashed">
                      <p className="text-sm italic text-muted-foreground">
                        <span className="font-semibold text-warning">📌 Ejemplo real:</span> {attack.example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TiposDeAtaques;
