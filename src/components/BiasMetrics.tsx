import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Scale } from "lucide-react";

const data = [
  { name: "Gender", demographic: 0.82, equal_opp: 0.91, disparate: 0.88 },
  { name: "Age", demographic: 0.75, equal_opp: 0.85, disparate: 0.79 },
  { name: "Ethnicity", demographic: 0.68, equal_opp: 0.72, disparate: 0.71 },
  { name: "Income", demographic: 0.90, equal_opp: 0.93, disparate: 0.95 },
  { name: "Location", demographic: 0.88, equal_opp: 0.89, disparate: 0.92 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-3 text-xs bg-card border border-border/40 shadow-xl">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-muted-foreground">
            <span style={{ color: p.color }}>●</span> {p.name}: <span className="font-mono text-foreground">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BiasMetrics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl p-6 border border-border/30 bg-card/40"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-accent" />
          <h2 className="text-xs font-semibold text-foreground tracking-wider uppercase">Bias & Fairness</h2>
        </div>
        <div className="flex gap-3">
          {[
            { label: "DP", color: "bg-primary" },
            { label: "EO", color: "bg-accent" },
            { label: "DI", color: "bg-warning" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <div className={`w-2 h-2 rounded-sm ${l.color}`} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={1} barSize={10}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 15% 12%)" />
          <XAxis dataKey="name" tick={{ fill: "hsl(230 10% 50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 1]} tick={{ fill: "hsl(230 10% 50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="demographic" name="Demographic Parity" fill="hsl(145, 80%, 42%)" radius={[3, 3, 0, 0]} />
          <Bar dataKey="equal_opp" name="Equal Opportunity" fill="hsl(265, 70%, 60%)" radius={[3, 3, 0, 0]} />
          <Bar dataKey="disparate" name="Disparate Impact" fill="hsl(38, 95%, 55%)" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default BiasMetrics;
