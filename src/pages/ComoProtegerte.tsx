import { Shield, CheckCircle, XCircle } from "lucide-react";
import protectionImg from "@/assets/protection.jpg";

const tips = [
  { title: "Verifica el remitente", desc: "Antes de hacer clic, comprueba la dirección de email completa. Los estafadores usan dominios similares como @g00gle.com o @amaz0n.net." },
  { title: "No hagas clic en enlaces sospechosos", desc: "Pasa el ratón por encima del enlace para ver la URL real. Si no coincide con la web oficial, no hagas clic." },
  { title: "Activa la verificación en dos pasos (2FA)", desc: "Aunque roben tu contraseña, no podrán acceder sin el segundo factor. Usa apps como Google Authenticator." },
  { title: "Usa contraseñas únicas y fuertes", desc: "Nunca repitas contraseñas. Usa un gestor de contraseñas como Bitwarden o 1Password." },
  { title: "Mantén todo actualizado", desc: "Las actualizaciones corrigen vulnerabilidades de seguridad. Activa las actualizaciones automáticas." },
  { title: "Desconfía de la urgencia", desc: "Los estafadores crean sensación de urgencia. Si te presionan para actuar rápido, para y piensa." },
  { title: "Verifica por otro canal", desc: "Si recibes un email sospechoso de tu banco, llámales directamente al número oficial." },
  { title: "Revisa tus cuentas regularmente", desc: "Comprueba tus movimientos bancarios y cambia tus contraseñas cada cierto tiempo." },
];

const dos = [
  "Verifica siempre el remitente",
  "Usa contraseñas diferentes para cada servicio",
  "Activa la autenticación en dos pasos",
  "Mantén tu software actualizado",
  "Reporta los intentos de phishing",
];

const donts = [
  "No hagas clic en enlaces de emails sospechosos",
  "No descargues archivos de remitentes desconocidos",
  "No compartas contraseñas por email o chat",
  "No uses WiFi público para operaciones bancarias",
  "No ignores las alertas de seguridad del navegador",
];

const ComoProtegerte = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 mb-6">
            <Shield className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">Tu Defensa Digital</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            Cómo <span className="text-gradient">Protegerte</span>
          </h1>

          {/* Hero image */}
          <div className="rounded-xl overflow-hidden border mb-12 max-w-2xl">
            <img src={protectionImg} alt="Protección digital" className="w-full h-auto" width={800} height={600} loading="lazy" />
          </div>

          {/* Tips grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {tips.map((tip, i) => (
              <div key={i} className="card-gradient border rounded-xl p-5 animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center rounded-full bg-primary/20 text-primary font-heading font-bold w-8 h-8 shrink-0 text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Do's and Don'ts */}
          <h2 className="font-heading font-bold text-3xl mb-8 text-center">
            ✅ Haz esto / ❌ Evita esto
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-gradient border border-success/20 rounded-xl p-6">
              <h3 className="font-heading font-semibold text-lg text-success mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" /> Buenas prácticas
              </h3>
              <ul className="space-y-3">
                {dos.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-gradient border border-destructive/20 rounded-xl p-6">
              <h3 className="font-heading font-semibold text-lg text-destructive mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5" /> Malas prácticas
              </h3>
              <ul className="space-y-3">
                {donts.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComoProtegerte;
