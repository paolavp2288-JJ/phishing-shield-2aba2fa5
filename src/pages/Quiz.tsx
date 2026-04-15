import { useState } from "react";
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "Recibes un email de \"soporte@amaz0n-seguridad.com\" diciendo que tu cuenta ha sido comprometida. ¿Qué haces?",
    options: [
      "Hago clic en el enlace para verificar mi cuenta",
      "Ignoro el email y accedo a Amazon directamente desde mi navegador",
      "Reenvío el email a mis contactos para advertirles",
      "Respondo pidiendo más información",
    ],
    correct: 1,
    explanation: "El dominio 'amaz0n-seguridad.com' no es oficial de Amazon. Siempre accede directamente desde tu navegador escribiendo la URL real.",
  },
  {
    question: "¿Cuál de estas contraseñas es la MÁS segura?",
    options: ["password123", "MiNombre2024", "j#9Kx$mL2!qR", "123456789"],
    correct: 2,
    explanation: "Una contraseña segura combina letras mayúsculas, minúsculas, números y símbolos especiales, con al menos 12 caracteres.",
  },
  {
    question: "Recibes un SMS: \"CORREOS: Su paquete está retenido. Pague 1,99€ aquí: bit.ly/paq382\". ¿Qué tipo de ataque es?",
    options: ["Vishing", "Pharming", "Smishing", "Ransomware"],
    correct: 2,
    explanation: "El Smishing es phishing a través de SMS. Correos nunca pide pagos por SMS con enlaces acortados.",
  },
  {
    question: "Estás en un aeropuerto y ves una red WiFi llamada \"WiFi_Gratis_Aeropuerto\". ¿Qué haces?",
    options: [
      "Me conecto porque es gratis",
      "Me conecto y accedo a mi banco",
      "No me conecto o uso VPN si es necesario",
      "Le doy mi contraseña del WiFi de casa",
    ],
    correct: 2,
    explanation: "Las redes WiFi públicas pueden ser falsas (Evil Twin). Usa VPN o tus datos móviles para operaciones sensibles.",
  },
  {
    question: "¿Qué es la autenticación en dos pasos (2FA)?",
    options: [
      "Escribir la contraseña dos veces",
      "Un segundo método de verificación además de la contraseña",
      "Tener dos contraseñas diferentes",
      "Cambiar la contraseña cada dos días",
    ],
    correct: 1,
    explanation: "La 2FA añade una capa extra de seguridad: además de tu contraseña, necesitas un código temporal enviado a tu móvil o generado por una app.",
  },
  {
    question: "Tu jefe te envía un email urgente pidiendo que transfieras dinero a una cuenta nueva. ¿Qué haces?",
    options: [
      "Transfiero el dinero inmediatamente porque es urgente",
      "Verifico con mi jefe por teléfono o en persona antes de actuar",
      "Respondo al email pidiendo confirmación",
      "Lo ignoro completamente",
    ],
    correct: 1,
    explanation: "Esto podría ser un ataque de spear phishing o BEC (Business Email Compromise). Siempre verifica por otro canal cuando te pidan dinero.",
  },
  {
    question: "¿Cuál de estos es un signo de que un sitio web es seguro?",
    options: [
      "Tiene imágenes bonitas",
      "La URL empieza por https:// y tiene un candado",
      "Ofrece descuentos increíbles",
      "Te pide pocos datos personales",
    ],
    correct: 1,
    explanation: "El protocolo HTTPS y el icono del candado indican que la conexión está cifrada. Aunque no garantiza que el sitio sea legítimo al 100%, es un requisito mínimo.",
  },
  {
    question: "Un amigo te envía un mensaje por WhatsApp con un enlace diciendo \"Mira esto, sales tú 😂\". ¿Qué haces?",
    options: [
      "Hago clic porque confío en mi amigo",
      "Le pregunto antes de hacer clic si realmente me lo envió él",
      "Lo comparto con otros amigos",
      "Lo abro en modo incógnito",
    ],
    correct: 1,
    explanation: "Las cuentas de tus amigos pueden ser hackeadas. Siempre verifica antes de abrir enlaces sospechosos, incluso de contactos conocidos.",
  },
];

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === questions[current].correct) {
      setScore((s) => s + 1);
    }
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  };

  const q = questions[current];
  const percentage = Math.round((score / questions.length) * 100);

  const getResultMessage = () => {
    if (percentage >= 80) return { emoji: "🏆", title: "¡Eres un CiberGuardián experto!", desc: "Sabes identificar y evitar las trampas digitales. ¡Comparte tus conocimientos!" };
    if (percentage >= 50) return { emoji: "👍", title: "¡Vas por buen camino!", desc: "Tienes buena base, pero aún puedes mejorar. Revisa las secciones de la web." };
    return { emoji: "⚠️", title: "¡Necesitas reforzar tus defensas!", desc: "No te preocupes, navega por nuestra web para aprender más sobre ciberseguridad." };
  };

  if (finished) {
    const result = getResultMessage();
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-lg text-center animate-fade-in">
          <div className="card-gradient border rounded-2xl p-8">
            <div className="text-6xl mb-4">{result.emoji}</div>
            <h2 className="font-heading font-bold text-3xl mb-2">{result.title}</h2>
            <p className="text-muted-foreground mb-6">{result.desc}</p>
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="hsl(var(--primary))" strokeWidth="8"
                  strokeDasharray={`${percentage * 2.51} 251`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading font-bold text-2xl text-gradient">{score}/{questions.length}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="font-semibold">{percentage}% de aciertos</span>
            </div>
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading font-semibold text-primary-foreground hover:scale-105 transition-transform"
            >
              <RotateCcw className="h-4 w-4" /> Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="font-heading font-bold text-3xl">Quiz Interactivo</h1>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Pregunta {current + 1} de {questions.length}</span>
              <span>{score} aciertos</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="card-gradient border rounded-xl p-6 md:p-8 mb-6 animate-fade-in" key={current}>
            <h2 className="font-heading font-semibold text-lg mb-6">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map((option, i) => {
                let style = "card-gradient border hover:border-primary/50 cursor-pointer";
                if (answered) {
                  if (i === q.correct) style = "bg-success/10 border border-success";
                  else if (i === selected) style = "bg-destructive/10 border border-destructive";
                  else style = "card-gradient border opacity-50";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className={`w-full text-left rounded-lg p-4 transition-all flex items-start gap-3 ${style}`}
                  >
                    <span className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm">{option}</span>
                    {answered && i === q.correct && <CheckCircle className="h-5 w-5 text-success shrink-0 ml-auto" />}
                    {answered && i === selected && i !== q.correct && <XCircle className="h-5 w-5 text-destructive shrink-0 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {answered && (
            <div className="card-gradient border rounded-xl p-5 mb-6 animate-slide-up">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">💡 Explicación:</span> {q.explanation}
              </p>
            </div>
          )}

          {answered && (
            <button
              onClick={next}
              className="w-full rounded-lg bg-primary py-3 font-heading font-semibold text-primary-foreground hover:scale-[1.02] transition-transform"
            >
              {current + 1 >= questions.length ? "Ver resultados" : "Siguiente pregunta →"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Quiz;
