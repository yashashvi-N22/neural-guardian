import { motion } from "framer-motion";
import { Shield, Cpu, AlertTriangle, FileCheck } from "lucide-react";

const stats = [
  { label: "Models Monitored", value: "5", icon: Cpu, color: "text-primary", border: "border-primary/15" },
  { label: "Predictions Analyzed", value: "12.4K", icon: Shield, color: "text-accent", border: "border-accent/15" },
  { label: "Active Alerts", value: "2", icon: AlertTriangle, color: "text-warning", border: "border-warning/15" },
  { label: "Compliance Rate", value: "94%", icon: FileCheck, color: "text-success", border: "border-success/15" },
];

const StatsBar = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className={`group relative rounded-xl p-4 flex items-center gap-3 border ${stat.border} bg-card/40 hover:bg-card/70 transition-all duration-300`}
          >
            <div className="p-2 rounded-md bg-secondary/50">
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xl font-bold font-mono text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsBar;
