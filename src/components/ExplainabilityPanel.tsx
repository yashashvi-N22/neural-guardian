import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Eye } from "lucide-react";

const shapData = [
  { feature: "Income", impact: 0.35, direction: "positive" },
  { feature: "Credit History", impact: 0.28, direction: "positive" },
  { feature: "Age", impact: -0.15, direction: "negative" },
  { feature: "Employment", impact: 0.22, direction: "positive" },
  { feature: "Location", impact: -0.08, direction: "negative" },
  { feature: "Gender", impact: -0.18, direction: "negative" },
  { feature: "Education", impact: 0.12, direction: "positive" },
];

const sortedData = [...shapData].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-lg p-3 text-xs bg-card border border-border/40 shadow-xl">
        <p className="font-semibold text-foreground">{d.feature}</p>
        <p className="text-muted-foreground">
          SHAP: <span className="font-mono text-foreground">{d.impact > 0 ? "+" : ""}{d.impact}</span>
        </p>
      </div>
    );
  }
  return null;
};

const ExplainabilityPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="rounded-xl p-6 border border-border/30 bg-card/40"
    >
      <div className="flex items-center gap-2 mb-5">
        <Eye className="w-4 h-4 text-primary" />
        <h2 className="text-xs font-semibold text-foreground tracking-wider uppercase">SHAP Explainability</h2>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={sortedData} layout="vertical" barSize={12}>
          <XAxis type="number" tick={{ fill: "hsl(230 10% 50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="feature" type="category" tick={{ fill: "hsl(230 10% 50%)", fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="impact" radius={[0, 3, 3, 0]}>
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.impact >= 0 ? "hsl(145, 80%, 42%)" : "hsl(355, 75%, 55%)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="text-[9px] font-mono text-muted-foreground/50 text-center mt-2">
        Feature impact — Credit Scoring v3.2
      </p>
    </motion.div>
  );
};

export default ExplainabilityPanel;
