import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const EthicalRiskScore = () => {
  const score = 32;
  const maxScore = 100;
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getRiskLevel = (s: number) => {
    if (s <= 30) return { label: "Safe", color: "text-success", bg: "bg-success/8", border: "border-success/20", stroke: "hsl(145, 80%, 42%)" };
    if (s <= 60) return { label: "Monitor", color: "text-warning", bg: "bg-warning/8", border: "border-warning/20", stroke: "hsl(38, 95%, 55%)" };
    return { label: "Critical", color: "text-destructive", bg: "bg-destructive/8", border: "border-destructive/20", stroke: "hsl(355, 75%, 55%)" };
  };

  const risk = getRiskLevel(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="rounded-xl p-6 border border-border/30 bg-card/40"
    >
      <div className="flex items-center gap-2 mb-5">
        <Shield className="w-4 h-4 text-primary" />
        <h2 className="text-xs font-semibold text-foreground tracking-wider uppercase">Ethical Risk Score</h2>
      </div>

      <div className="flex items-center justify-center mb-5">
        <div className="relative">
          <svg width="170" height="170" viewBox="0 0 170 170" className="-rotate-90">
            <circle cx="85" cy="85" r="70" stroke="hsl(var(--secondary))" strokeWidth="8" fill="none" />
            <motion.circle
              cx="85" cy="85" r="70"
              stroke={risk.stroke}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-4xl font-bold font-mono text-foreground"
            >
              {score}
            </motion.span>
            <span className="text-[10px] text-muted-foreground font-mono">/ {maxScore}</span>
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-center gap-2 py-2 rounded-md ${risk.bg} border ${risk.border} mb-5`}>
        <div className={`w-1.5 h-1.5 rounded-full ${risk.color === "text-success" ? "bg-success" : risk.color === "text-warning" ? "bg-warning" : "bg-destructive"}`} />
        <span className={`text-xs font-semibold ${risk.color}`}>{risk.label}</span>
      </div>

      <div className="space-y-3">
        {[
          { label: "Bias Score", value: 0.18, weight: "×0.4", color: "bg-primary" },
          { label: "Drift Index", value: 0.25, weight: "×0.3", color: "bg-accent" },
          { label: "Explainability Gap", value: 0.42, weight: "×0.2", color: "bg-warning" },
          { label: "Confidence", value: 0.91, weight: "×0.1", color: "bg-success" },
        ].map((metric) => (
          <div key={metric.label} className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">{metric.label} <span className="font-mono text-foreground/40">{metric.weight}</span></span>
              <span className="font-mono text-foreground">{metric.value}</span>
            </div>
            <div className="h-1 bg-secondary/60 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${metric.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${metric.value * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[9px] font-mono text-muted-foreground/50 text-center">
        Risk = Bias×0.4 + Drift×0.3 + ExplGap×0.2 + Conf×0.1
      </p>
    </motion.div>
  );
};

export default EthicalRiskScore;
