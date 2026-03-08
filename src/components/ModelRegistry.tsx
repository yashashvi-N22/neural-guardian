import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cpu, CheckCircle, AlertTriangle, XCircle, ArrowUpRight } from "lucide-react";

const models = [
  { name: "Credit Scoring v3.2", type: "Classification", status: "safe", score: 28, lastChecked: "2m ago", id: "credit-scoring-v3.2" },
  { name: "Loan Approval v2.1", type: "Binary Classifier", status: "monitor", score: 48, lastChecked: "5m ago", id: "loan-approval-v2.1" },
  { name: "Resume Screener v1.8", type: "NLP Classifier", status: "critical", score: 72, lastChecked: "1m ago", id: "resume-screener-v1.8" },
  { name: "Insurance Pricing v4.0", type: "Regression", status: "safe", score: 19, lastChecked: "8m ago", id: "insurance-pricing-v4.0" },
  { name: "Fraud Detection v5.1", type: "Anomaly Detection", status: "safe", score: 22, lastChecked: "3m ago", id: "fraud-detection-v5.1" },
];

const statusConfig = {
  safe: { icon: CheckCircle, color: "text-success", bg: "bg-success/8", border: "border-success/15", label: "Safe" },
  monitor: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/8", border: "border-warning/15", label: "Monitor" },
  critical: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/8", border: "border-destructive/15", label: "Critical" },
};

const ModelRegistry = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-xl p-6 border border-border/30 bg-card/40"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-semibold text-foreground tracking-wider uppercase">Registered Models</h2>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">{models.length} active</span>
      </div>

      <div className="space-y-1.5">
        {models.map((model, i) => {
          const config = statusConfig[model.status as keyof typeof statusConfig];
          const Icon = config.icon;
          return (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.04 }}
              onClick={() => navigate(`/model/${model.id}`)}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary/30 transition-all group cursor-pointer border border-transparent hover:border-border/20"
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                <div>
                  <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">{model.name}</p>
                  <p className="text-[9px] text-muted-foreground font-mono">{model.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-mono font-bold text-foreground">{model.score}</p>
                  <p className="text-[9px] text-muted-foreground">{model.lastChecked}</p>
                </div>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground/0 group-hover:text-muted-foreground transition-all" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ModelRegistry;
