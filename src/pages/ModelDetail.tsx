import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, TrendingUp, Scale, Eye, AlertTriangle, CheckCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine, Cell, AreaChart, Area
} from "recharts";

const modelData: Record<string, any> = {
  "credit-scoring-v3.2": {
    name: "Credit Scoring v3.2",
    type: "Classification",
    status: "safe",
    score: 28,
    description: "Binary classifier for consumer credit risk assessment",
    predictions: "4.2K",
    uptime: "99.8%",
    bias: {
      gender: { dp: 0.82, eo: 0.91, di: 0.88 },
      age: { dp: 0.90, eo: 0.93, di: 0.95 },
      ethnicity: { dp: 0.85, eo: 0.88, di: 0.90 },
    },
    shapData: [
      { feature: "Income", impact: 0.35 },
      { feature: "Credit History", impact: 0.28 },
      { feature: "Employment", impact: 0.22 },
      { feature: "Education", impact: 0.12 },
      { feature: "Location", impact: -0.08 },
      { feature: "Age", impact: -0.15 },
      { feature: "Gender", impact: -0.05 },
    ],
    driftHistory: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      psi: Math.max(0, 0.03 + Math.sin(i * 0.3) * 0.015 + Math.random() * 0.01),
    })),
  },
  "loan-approval-v2.1": {
    name: "Loan Approval v2.1",
    type: "Binary Classifier",
    status: "monitor",
    score: 48,
    description: "Automated loan approval decision engine with fairness constraints",
    predictions: "3.8K",
    uptime: "99.5%",
    bias: {
      gender: { dp: 0.75, eo: 0.82, di: 0.80 },
      age: { dp: 0.70, eo: 0.78, di: 0.74 },
      ethnicity: { dp: 0.65, eo: 0.70, di: 0.68 },
    },
    shapData: [
      { feature: "Annual Income", impact: 0.42 },
      { feature: "Debt-to-Income", impact: 0.31 },
      { feature: "Credit Score", impact: 0.25 },
      { feature: "Employment Years", impact: 0.18 },
      { feature: "Age", impact: -0.20 },
      { feature: "Zip Code", impact: -0.12 },
      { feature: "Gender", impact: -0.15 },
    ],
    driftHistory: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      psi: Math.max(0, 0.05 + Math.sin(i * 0.25) * 0.025 + Math.random() * 0.015),
    })),
  },
  "resume-screener-v1.8": {
    name: "Resume Screener v1.8",
    type: "NLP Classifier",
    status: "critical",
    score: 72,
    description: "NLP-based resume screening for job applications",
    predictions: "1.9K",
    uptime: "98.2%",
    bias: {
      gender: { dp: 0.58, eo: 0.62, di: 0.60 },
      age: { dp: 0.65, eo: 0.68, di: 0.66 },
      ethnicity: { dp: 0.52, eo: 0.55, di: 0.54 },
    },
    shapData: [
      { feature: "Years Experience", impact: 0.38 },
      { feature: "Education Level", impact: 0.30 },
      { feature: "Skills Match", impact: 0.25 },
      { feature: "Name Features", impact: -0.28 },
      { feature: "University Prestige", impact: -0.22 },
      { feature: "Location", impact: -0.15 },
      { feature: "Gender Indicators", impact: -0.32 },
    ],
    driftHistory: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      psi: Math.max(0, 0.06 + Math.sin(i * 0.35) * 0.04 + Math.random() * 0.02),
    })),
  },
};

const statusConfig = {
  safe: { color: "text-success", bg: "bg-success/10", border: "border-success/20", glow: "glow-primary" },
  monitor: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/20", glow: "glow-warning" },
  critical: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20", glow: "glow-destructive" },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg p-3 text-xs">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-muted-foreground">
            {p.name}: <span className="font-mono text-foreground">{typeof p.value === "number" ? p.value.toFixed(3) : p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ModelDetail = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const model = modelData[modelId || ""] || modelData["credit-scoring-v3.2"];
  const config = statusConfig[model.status as keyof typeof statusConfig];

  const biasChartData = Object.entries(model.bias).map(([group, metrics]: [string, any]) => ({
    name: group.charAt(0).toUpperCase() + group.slice(1),
    dp: metrics.dp,
    eo: metrics.eo,
    di: metrics.di,
  }));

  const shapSorted = [...model.shapData].sort((a: any, b: any) => Math.abs(b.impact) - Math.abs(a.impact));

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="text-xl font-bold text-foreground">{model.name}</h2>
              <p className="text-sm text-muted-foreground">{model.description}</p>
            </div>
          </div>
          <span className={`text-xs font-mono px-3 py-1.5 rounded-full ${config.bg} ${config.color} border ${config.border}`}>
            {model.status.toUpperCase()} · Score: {model.score}
          </span>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Risk Score", value: model.score, icon: Shield, color: config.color },
            { label: "Predictions", value: model.predictions, icon: Activity, color: "text-accent" },
            { label: "Uptime", value: model.uptime, icon: CheckCircle, color: "text-success" },
            { label: "Model Type", value: model.type, icon: TrendingUp, color: "text-muted-foreground" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-[10px] text-muted-foreground uppercase">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold font-mono text-foreground">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bias by group */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Scale className="w-5 h-5 text-accent" />
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">Bias Analysis by Group</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={biasChartData} barGap={2} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                <XAxis dataKey="name" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 1]} tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0.8} stroke="hsl(0, 80%, 55%)" strokeDasharray="5 5" />
                <Bar dataKey="dp" name="Demographic Parity" fill="hsl(160, 100%, 45%)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="eo" name="Equal Opportunity" fill="hsl(200, 90%, 50%)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="di" name="Disparate Impact" fill="hsl(45, 100%, 50%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-3 justify-center">
              {[
                { label: "Dem. Parity", color: "bg-primary" },
                { label: "Equal Opp.", color: "bg-accent" },
                { label: "Disp. Impact", color: "bg-warning" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <div className={`w-2 h-2 rounded-sm ${l.color}`} />
                  {l.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* SHAP */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Eye className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">SHAP Feature Impact</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={shapSorted} layout="vertical" barSize={14}>
                <XAxis type="number" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="feature" type="category" tick={{ fill: "hsl(215 15% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} width={110} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="impact" name="SHAP Value" radius={[0, 4, 4, 0]}>
                  {shapSorted.map((entry: any, i: number) => (
                    <Cell key={i} fill={entry.impact >= 0 ? "hsl(160, 100%, 45%)" : "hsl(0, 80%, 55%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Drift history */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">30-Day PSI Drift History</h3>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">Population Stability Index</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={model.driftHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="day" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0.1} stroke="hsl(0, 80%, 55%)" strokeDasharray="5 5" label={{ value: "Threshold", fill: "hsl(0, 80%, 55%)", fontSize: 10 }} />
              <Area type="monotone" dataKey="psi" name="PSI" stroke="hsl(160, 100%, 45%)" fill="hsl(160, 100%, 45%)" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </main>
    </div>
  );
};

export default ModelDetail;
