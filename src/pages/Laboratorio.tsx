import { useMemo, useState } from "react";
import { FlaskConical, Mail, Link2, KeyRound, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Copy, Check } from "lucide-react";

/* ---------------- 1. SIMULADOR DE PHISHING ---------------- */
interface Hotspot {
  id: string;
  label: string;
  reason: string;
  // bounding box in % of the email card
  top: string;
  left: string;
  width: string;
  height: string;
}

interface PhishingEmail {
  id: string;
  isPhishing: boolean;
  from: string;
  subject: string;
  bodyJsx: JSX.Element;
  hotspots: Hotspot[]; // empty if legitimate
}

const emails: PhishingEmail[] = [
  {
    id: "amazon",
    isPhishing: true,
    from: "Amazon Soporte <seguridad@amaz0n-support.net>",
    subject: "🚨 URGENTE: Su cuenta sera suspendida en 24h",
    bodyJsx: (
      <>
        <p>Estimado clliente,</p>
        <p>
          Hemos detectado actividad sospechossa en su cuenta. Si no verifica sus
          datos en las proximas 24 horas su cuenta sera suspendida permanentemente.
        </p>
        <p>
          Verifique aquí:{" "}
          <span className="text-blue-400 underline">
            http://amaz0n-verify.security-login.ru/account
          </span>
        </p>
        <p>Gracias, Equipo de Seguridad Amazon</p>
      </>
    ),
    hotspots: [
      { id: "from", label: "Remitente", reason: "El dominio 'amaz0n-support.net' usa un cero en lugar de la 'o'. Amazon nunca enviaría desde ese dominio.", top: "8%", left: "2%", width: "96%", height: "12%" },
      { id: "subject", label: "Asunto urgente", reason: "Crear urgencia y miedo ('24h', 'suspendida') es una técnica clásica de manipulación.", top: "22%", left: "2%", width: "96%", height: "10%" },
      { id: "typos", label: "Faltas de ortografía", reason: "'clliente', 'sospechossa', falta de tildes... Las empresas reales revisan sus comunicaciones.", top: "38%", left: "2%", width: "96%", height: "20%" },
      { id: "link", label: "Enlace sospechoso", reason: "Dominio '.ru' y subdominios extraños. El enlace real no apunta a amazon.com.", top: "62%", left: "2%", width: "96%", height: "14%" },
    ],
  },
  {
    id: "banco",
    isPhishing: false,
    from: "BBVA <noreply@bbva.es>",
    subject: "Resumen mensual de tu cuenta - Octubre 2025",
    bodyJsx: (
      <>
        <p>Hola,</p>
        <p>
          Ya está disponible tu resumen mensual. Puedes consultarlo accediendo a tu
          banca online desde la app oficial o desde www.bbva.es.
        </p>
        <p>
          Por motivos de seguridad, nunca te pediremos tus claves por email.
        </p>
        <p>Un saludo, BBVA</p>
      </>
    ),
    hotspots: [],
  },
  {
    id: "correos",
    isPhishing: true,
    from: "Correos <info@correos-envios-es.com>",
    subject: "Tu paquete está retenido - Paga 1,99€",
    bodyJsx: (
      <>
        <p>Hola,</p>
        <p>
          Tu paquete con número de seguimiento ES8472 no se ha podido entregar
          por una tasa pendiente de <strong>1,99€</strong>.
        </p>
        <p>
          Paga ahora aquí:{" "}
          <span className="text-blue-400 underline">https://bit.ly/pago-correos-es</span>
        </p>
        <p>Si no realizas el pago en 12h, tu paquete será devuelto.</p>
      </>
    ),
    hotspots: [
      { id: "from", label: "Remitente falso", reason: "El dominio oficial es correos.es, no 'correos-envios-es.com'.", top: "8%", left: "2%", width: "96%", height: "12%" },
      { id: "amount", label: "Pago pequeño", reason: "Los estafadores piden cantidades pequeñas (1-3€) para que no dudes en pagar.", top: "30%", left: "2%", width: "96%", height: "14%" },
      { id: "link", label: "Enlace acortado", reason: "bit.ly oculta el destino real del enlace. Correos nunca usa acortadores.", top: "48%", left: "2%", width: "96%", height: "14%" },
      { id: "urgency", label: "Urgencia artificial", reason: "El plazo de '12h' busca que actúes sin pensar.", top: "66%", left: "2%", width: "96%", height: "14%" },
    ],
  },
];

const PhishingSimulator = () => {
  const [index, setIndex] = useState(0);
  const [found, setFound] = useState<string[]>([]);
  const [verdict, setVerdict] = useState<null | "phishing" | "safe">(null);
  const [activeReason, setActiveReason] = useState<string | null>(null);

  const email = emails[index];
  const total = email.hotspots.length;

  const next = () => {
    setIndex((index + 1) % emails.length);
    setFound([]);
    setVerdict(null);
    setActiveReason(null);
  };

  const handleHotspot = (h: Hotspot) => {
    if (!found.includes(h.id)) setFound([...found, h.id]);
    setActiveReason(`${h.label}: ${h.reason}`);
  };

  const handleVerdict = (v: "phishing" | "safe") => {
    setVerdict(v);
  };

  const correctVerdict = verdict !== null && ((verdict === "phishing") === email.isPhishing);

  return (
    <div className="card-gradient border rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="font-heading font-bold text-xl">Simulador de Phishing</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Haz clic en las zonas sospechosas del email y luego decide si es phishing o legítimo.
      </p>

      {/* Email mockup */}
      <div className="relative bg-background border rounded-xl overflow-hidden mb-4 select-none">
        <div className="border-b p-4 text-sm">
          <div className="text-xs text-muted-foreground mb-1">De:</div>
          <div className="font-mono">{email.from}</div>
          <div className="text-xs text-muted-foreground mt-2 mb-1">Asunto:</div>
          <div className="font-semibold">{email.subject}</div>
        </div>
        <div className="p-4 text-sm space-y-3 min-h-[220px] leading-relaxed">
          {email.bodyJsx}
        </div>

        {/* Hotspots overlay */}
        <div className="absolute inset-0">
          {email.hotspots.map((h) => {
            const isFound = found.includes(h.id);
            return (
              <button
                key={h.id}
                onClick={() => handleHotspot(h)}
                style={{ top: h.top, left: h.left, width: h.width, height: h.height }}
                className={`absolute rounded-md transition-all ${
                  isFound
                    ? "border-2 border-success bg-success/10"
                    : "border-2 border-transparent hover:border-primary/40 hover:bg-primary/5"
                }`}
                aria-label={h.label}
              />
            );
          })}
        </div>
      </div>

      {/* Counter & reason */}
      <div className="flex items-center justify-between text-sm mb-4">
        <span className="text-muted-foreground">
          Señales detectadas:{" "}
          <span className="text-foreground font-semibold">
            {found.length}/{total}
          </span>
        </span>
        <button
          onClick={next}
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          <RefreshCw className="h-3 w-3" /> Otro email
        </button>
      </div>

      {activeReason && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm mb-4 animate-fade-in">
          💡 {activeReason}
        </div>
      )}

      {/* Verdict */}
      {verdict === null ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleVerdict("phishing")}
            className="rounded-lg bg-destructive/10 border border-destructive/40 text-destructive py-3 font-semibold hover:bg-destructive/20 transition-colors"
          >
            🚨 Es phishing
          </button>
          <button
            onClick={() => handleVerdict("safe")}
            className="rounded-lg bg-success/10 border border-success/40 text-success py-3 font-semibold hover:bg-success/20 transition-colors"
          >
            ✅ Es legítimo
          </button>
        </div>
      ) : (
        <div
          className={`rounded-lg p-4 border ${
            correctVerdict
              ? "bg-success/10 border-success text-success"
              : "bg-destructive/10 border-destructive text-destructive"
          } animate-fade-in`}
        >
          <div className="flex items-center gap-2 font-semibold mb-1">
            {correctVerdict ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            {correctVerdict ? "¡Correcto!" : "¡Incorrecto!"}
          </div>
          <p className="text-sm text-foreground/80">
            Este email {email.isPhishing ? "ERA phishing" : "era legítimo"}.{" "}
            {email.isPhishing
              ? `Encontraste ${found.length} de ${total} señales sospechosas.`
              : "No tenía señales de fraude."}
          </p>
        </div>
      )}
    </div>
  );
};

/* ---------------- 2. ANALIZADOR DE URLs ---------------- */
interface UrlCheck {
  level: "danger" | "warning" | "ok";
  text: string;
}

const analyzeUrl = (raw: string): { score: number; checks: UrlCheck[] } => {
  const checks: UrlCheck[] = [];
  let url = raw.trim();
  if (!url) return { score: 0, checks: [] };

  let parsed: URL | null = null;
  try {
    parsed = new URL(url.startsWith("http") ? url : `http://${url}`);
  } catch {
    return { score: 0, checks: [{ level: "danger", text: "URL no válida o malformada." }] };
  }

  const host = parsed.hostname.toLowerCase();

  // HTTPS
  if (parsed.protocol === "https:") {
    checks.push({ level: "ok", text: "Usa HTTPS (conexión cifrada)." });
  } else {
    checks.push({ level: "danger", text: "No usa HTTPS. La conexión no está cifrada." });
  }

  // IP en lugar de dominio
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    checks.push({ level: "danger", text: "Usa una dirección IP en lugar de un dominio." });
  }

  // Acortadores
  const shorteners = ["bit.ly", "tinyurl.com", "goo.gl", "t.co", "ow.ly", "is.gd", "cutt.ly"];
  if (shorteners.some((s) => host.includes(s))) {
    checks.push({ level: "warning", text: "Es un enlace acortado: oculta el destino real." });
  }

  // Typosquatting / caracteres sospechosos
  if (/[0-9]/.test(host.replace(/\.\d+/g, "")) && /(amaz|goog|face|paypa|appl|micro)/.test(host)) {
    checks.push({ level: "danger", text: "Posible 'typosquatting': números imitando letras en el dominio." });
  }

  // Subdominios excesivos
  const parts = host.split(".");
  if (parts.length > 4) {
    checks.push({ level: "warning", text: `Tiene ${parts.length - 1} subdominios. Sospechoso.` });
  }

  // TLD raros
  const tld = parts[parts.length - 1];
  const riskyTlds = ["ru", "tk", "ml", "ga", "cf", "gq", "xyz", "top", "click"];
  if (riskyTlds.includes(tld)) {
    checks.push({ level: "warning", text: `Dominio de nivel '.${tld}' frecuentemente usado en fraudes.` });
  }

  // Caracteres @ en URL
  if (url.includes("@")) {
    checks.push({ level: "danger", text: "Contiene '@': técnica para ocultar el dominio real." });
  }

  // Palabras señuelo
  const baits = ["login", "verify", "secure", "account", "update", "confirm"];
  if (baits.some((b) => host.includes(b))) {
    checks.push({ level: "warning", text: "Contiene palabras tipo 'login', 'verify', 'secure'... muy usadas en phishing." });
  }

  if (checks.length === 1 && checks[0].level === "ok") {
    checks.push({ level: "ok", text: "No se detectan señales obvias de phishing. Verifica siempre el dominio." });
  }

  const danger = checks.filter((c) => c.level === "danger").length;
  const warning = checks.filter((c) => c.level === "warning").length;
  const score = Math.max(0, 100 - danger * 35 - warning * 18);

  return { score, checks };
};

const UrlAnalyzer = () => {
  const [url, setUrl] = useState("");
  const result = useMemo(() => analyzeUrl(url), [url]);

  const examples = [
    "https://www.amazon.es",
    "http://amaz0n-verify.login.ru/account",
    "https://bit.ly/paq382",
  ];

  const scoreColor =
    result.score >= 70 ? "text-success" : result.score >= 40 ? "text-warning" : "text-destructive";

  return (
    <div className="card-gradient border rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-2">
        <Link2 className="h-5 w-5 text-primary" />
        <h3 className="font-heading font-bold text-xl">Analizador de URLs</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Pega un enlace para detectar señales de phishing. (Análisis local, no se envía a ningún servidor).
      </p>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://ejemplo.com"
        className="w-full rounded-lg bg-background border px-4 py-3 text-sm font-mono focus:border-primary outline-none transition-colors mb-3"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs text-muted-foreground self-center">Probar:</span>
        {examples.map((ex) => (
          <button
            key={ex}
            onClick={() => setUrl(ex)}
            className="text-xs rounded-full border px-3 py-1 hover:border-primary hover:text-primary transition-colors font-mono"
          >
            {ex.length > 28 ? ex.slice(0, 28) + "…" : ex}
          </button>
        ))}
      </div>

      {url && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Nivel de confianza</span>
            <span className={`font-heading font-bold text-2xl ${scoreColor}`}>{result.score}/100</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
            <div
              className={`h-full transition-all duration-500 ${
                result.score >= 70 ? "bg-success" : result.score >= 40 ? "bg-warning" : "bg-destructive"
              }`}
              style={{ width: `${result.score}%` }}
            />
          </div>

          <ul className="space-y-2">
            {result.checks.map((c, i) => {
              const Icon = c.level === "ok" ? CheckCircle2 : c.level === "warning" ? AlertTriangle : XCircle;
              const color =
                c.level === "ok"
                  ? "text-success"
                  : c.level === "warning"
                  ? "text-warning"
                  : "text-destructive";
              return (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${color}`} />
                  <span>{c.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

/* ---------------- 3. GENERADOR DE CONTRASEÑAS ---------------- */
const generatePassword = (length: number, opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }) => {
  let chars = "";
  if (opts.lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (opts.upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (opts.numbers) chars += "0123456789";
  if (opts.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  if (!chars) return "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => chars[n % chars.length]).join("");
};

const passwordStrength = (pwd: string) => {
  if (!pwd) return { score: 0, label: "—", color: "bg-muted", text: "text-muted-foreground" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;
  const map = [
    { label: "Muy débil", color: "bg-destructive", text: "text-destructive" },
    { label: "Débil", color: "bg-destructive", text: "text-destructive" },
    { label: "Regular", color: "bg-warning", text: "text-warning" },
    { label: "Buena", color: "bg-warning", text: "text-warning" },
    { label: "Fuerte", color: "bg-success", text: "text-success" },
    { label: "Muy fuerte", color: "bg-success", text: "text-success" },
    { label: "Excelente", color: "bg-success", text: "text-success" },
  ];
  return { score, ...map[score] };
};

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [password, setPassword] = useState(() => generatePassword(16, { upper: true, lower: true, numbers: true, symbols: true }));
  const [copied, setCopied] = useState(false);

  const regen = () => setPassword(generatePassword(length, opts));

  const copy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const strength = passwordStrength(password);

  const toggleOpt = (key: keyof typeof opts) => {
    const next = { ...opts, [key]: !opts[key] };
    setOpts(next);
    setPassword(generatePassword(length, next));
  };

  const onLength = (v: number) => {
    setLength(v);
    setPassword(generatePassword(v, opts));
  };

  return (
    <div className="card-gradient border rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-2">
        <KeyRound className="h-5 w-5 text-primary" />
        <h3 className="font-heading font-bold text-xl">Generador de Contraseñas</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Crea contraseñas aleatorias, fuertes e imposibles de adivinar.
      </p>

      <div className="bg-background border rounded-lg p-4 mb-4 flex items-center gap-3">
        <code className="flex-1 font-mono text-sm break-all">{password || "—"}</code>
        <button
          onClick={copy}
          className="shrink-0 rounded-md p-2 hover:bg-muted transition-colors"
          aria-label="Copiar"
        >
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </button>
        <button
          onClick={regen}
          className="shrink-0 rounded-md p-2 hover:bg-muted transition-colors"
          aria-label="Regenerar"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Strength */}
      <div className="mb-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Fuerza</span>
          <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full ${i < strength.score ? strength.color : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      {/* Length */}
      <div className="mb-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Longitud</span>
          <span className="font-mono font-semibold">{length}</span>
        </div>
        <input
          type="range"
          min={6}
          max={32}
          value={length}
          onChange={(e) => onLength(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2">
        {([
          ["upper", "Mayúsculas (A-Z)"],
          ["lower", "Minúsculas (a-z)"],
          ["numbers", "Números (0-9)"],
          ["symbols", "Símbolos (!@#)"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => toggleOpt(key)}
            className={`rounded-lg border px-3 py-2 text-sm text-left transition-colors ${
              opts[key]
                ? "border-primary/50 bg-primary/10 text-foreground"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <span className="inline-block w-4">{opts[key] ? "✓" : ""}</span> {label}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ---------------- PAGE ---------------- */
const Laboratorio = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-4">
            <FlaskConical className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Laboratorio CiberGuardián</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Pon en práctica lo aprendido
          </h1>
          <p className="text-muted-foreground text-lg">
            Tres herramientas interactivas para entrenarte: detecta phishing en emails reales,
            analiza enlaces sospechosos y crea contraseñas indestructibles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <PhishingSimulator />
          </div>
          <UrlAnalyzer />
          <PasswordGenerator />
        </div>
      </section>
    </div>
  );
};

export default Laboratorio;
