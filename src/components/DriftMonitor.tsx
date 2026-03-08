import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp } from "lucide-react";

const driftData = Array.from({ length: 20 }, (_, i) => ({
  interval: i + 1,
  psi: Math.max(0, 0.05 + Math.sin(i * 0.4) * 0.03 + Math.random() * 0.02),
  riskScore: 25 + Math.sin(i * 0.3) * 15 + Math.random() * 8,
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-3 text-xs bg-card border border-border/40 shadow-xl">
        <p className="font-semibold text-foreground mb-1">Interval {label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-muted-foreground">
            <span style={{ color: p.color }}>●</span> {p.name}: <span className="font-mono text-foreground">{typeof p.value === 'number' ? p.value.toFixed(3) : p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DriftMonitor = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl p-6 border border-border/30 bg-card/40"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          <h2 className="text-xs font-semibold text-foreground tracking-wider uppercase">Drift Monitor</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-success/8 border border-success/15">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
          <span className="text-[10px] font-mono text-success">STABLE</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={driftData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 15% 12%)" />
          <XAxis dataKey="interval" tick={{ fill: "hsl(230 10% 50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(230 10% 50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0.1} stroke="hsl(355, 75%, 55%)" strokeDasharray="5 5" label={{ value: "Threshold", fill: "hsl(355, 75%, 55%)", fontSize: 9 }} />
          <Line type="monotone" dataKey="psi" name="PSI" stroke="hsl(145, 80%, 42%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="riskScore" name="Risk Score" stroke="hsl(265, 70%, 60%)" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { label: "Current PSI", value: "0.062" },
          { label: "Max PSI (24h)", value: "0.089" },
          { label: "Drift Events", value: "0" },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-2 rounded-md bg-secondary/30 border border-border/20">
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            <p className="text-base font-mono font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DriftMonitor;
