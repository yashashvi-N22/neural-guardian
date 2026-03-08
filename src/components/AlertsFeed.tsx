import { motion } from "framer-motion";
import { Bell, AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

const alerts = [
  { type: "critical", message: "Resume Screener v1.8: Demographic parity violation detected for ethnicity group", time: "1m ago", icon: XCircle },
  { type: "warning", message: "Loan Approval v2.1: PSI approaching threshold (0.089)", time: "5m ago", icon: AlertTriangle },
  { type: "info", message: "Fraud Detection v5.1: SHAP explainability report generated", time: "12m ago", icon: Info },
  { type: "success", message: "Credit Scoring v3.2: Bias mitigation successfully applied", time: "18m ago", icon: CheckCircle },
  { type: "info", message: "Insurance Pricing v4.0: Compliance audit report ready", time: "25m ago", icon: Info },
];

const typeConfig = {
  critical: { color: "text-destructive", bg: "bg-destructive/6", border: "border-destructive/12" },
  warning: { color: "text-warning", bg: "bg-warning/6", border: "border-warning/12" },
  info: { color: "text-accent", bg: "bg-accent/6", border: "border-accent/12" },
  success: { color: "text-success", bg: "bg-success/6", border: "border-success/12" },
};

const AlertsFeed = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl p-6 border border-border/30 bg-card/40"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-warning" />
          <h2 className="text-xs font-semibold text-foreground tracking-wider uppercase">Activity Feed</h2>
        </div>
        <span className="flex items-center justify-center px-1.5 py-0.5 rounded bg-destructive/15 text-destructive text-[10px] font-mono font-bold">
          {alerts.filter(a => a.type === "critical").length} critical
        </span>
      </div>

      <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
        {alerts.map((alert, i) => {
          const config = typeConfig[alert.type as keyof typeof typeConfig];
          const Icon = alert.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.04 }}
              className={`flex gap-2.5 p-3 rounded-lg ${config.bg} border ${config.border}`}
            >
              <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${config.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-foreground/90 leading-relaxed">{alert.message}</p>
                <p className="text-[9px] text-muted-foreground font-mono mt-1">{alert.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AlertsFeed;
