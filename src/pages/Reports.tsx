import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText, Download, ArrowLeft, CheckCircle, AlertTriangle, XCircle,
  Calendar, BarChart3, Shield, TrendingUp, Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

const complianceData = [
  { category: "Bias Detection", score: 92, max: 100 },
  { category: "Drift Monitoring", score: 88, max: 100 },
  { category: "Explainability", score: 76, max: 100 },
  { category: "Data Privacy", score: 95, max: 100 },
  { category: "Model Governance", score: 85, max: 100 },
];

const radarData = [
  { metric: "Fairness", value: 88 },
  { metric: "Transparency", value: 76 },
  { metric: "Accountability", value: 92 },
  { metric: "Privacy", value: 95 },
  { metric: "Safety", value: 84 },
  { metric: "Robustness", value: 79 },
];

const auditHistory = [
  { id: "AUD-2025-001", date: "2025-02-28", status: "passed", score: 94, framework: "EU AI Act" },
  { id: "AUD-2025-002", date: "2025-02-15", status: "warning", score: 78, framework: "NIST AI RMF" },
  { id: "AUD-2025-003", date: "2025-01-30", status: "passed", score: 91, framework: "EU AI Act" },
  { id: "AUD-2025-004", date: "2025-01-15", status: "failed", score: 62, framework: "IEEE Ethics" },
  { id: "AUD-2025-005", date: "2024-12-30", status: "passed", score: 89, framework: "EU AI Act" },
];

const modelBreakdown = [
  { name: "Safe", value: 3, fill: "hsl(160, 100%, 45%)" },
  { name: "Monitor", value: 1, fill: "hsl(45, 100%, 50%)" },
  { name: "Critical", value: 1, fill: "hsl(0, 80%, 55%)" },
];

const statusConfig = {
  passed: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  failed: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg p-3 text-xs">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-muted-foreground">
            Score: <span className="font-mono text-foreground">{p.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Reports = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [generating, setGenerating] = useState(false);

  const generateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      // Create a mock PDF download
      const reportContent = `
AI GUARDIAN - COMPLIANCE AUDIT REPORT
=====================================
Generated: ${new Date().toISOString()}
Organization: ${user?.organization || "NeuralGuardians"}
Framework: EU AI Act

EXECUTIVE SUMMARY
------------------
Overall Compliance Score: 87/100
Models Monitored: 5
Active Risk Alerts: 2
Predictions Analyzed: 12,400+

BIAS DETECTION SUMMARY
-----------------------
Demographic Parity: 0.82 (Gender), 0.75 (Age), 0.68 (Ethnicity)
Equal Opportunity: 0.91 (Gender), 0.85 (Age), 0.72 (Ethnicity)
Disparate Impact: 0.88 (Gender), 0.79 (Age), 0.71 (Ethnicity)

DRIFT MONITORING
-----------------
Current PSI: 0.062 (STABLE)
Max PSI (24h): 0.089
Drift Events: 0

EXPLAINABILITY (SHAP)
---------------------
Top Features: Income (+0.35), Credit History (+0.28), Employment (+0.22)
Flagged Features: Gender (-0.18), Age (-0.15)

RECOMMENDATIONS
----------------
1. Review ethnicity bias in Resume Screener v1.8
2. Monitor Loan Approval v2.1 PSI trending upward
3. Increase SHAP coverage for Insurance Pricing v4.0

Report ID: RPT-${Date.now()}
NeuralGuardians · BLUEBIT 4.0 · PS9
      `;
      const blob = new Blob([reportContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `AI_Guardian_Audit_Report_${new Date().toISOString().split("T")[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, 2000);
  };

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
              <h2 className="text-xl font-bold text-foreground">Compliance Reports</h2>
              <p className="text-sm text-muted-foreground">Audit-ready governance reports & analytics</p>
            </div>
          </div>
          <Button onClick={generateReport} disabled={generating} className="glow-primary">
            {generating ? (
              <span className="animate-pulse">Generating...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export Report
              </>
            )}
          </Button>
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Overall Score", value: "87%", icon: Shield, color: "text-primary" },
            { label: "Audits Passed", value: "3/5", icon: CheckCircle, color: "text-success" },
            { label: "Risk Findings", value: "4", icon: AlertTriangle, color: "text-warning" },
            { label: "Last Audit", value: "Feb 28", icon: Calendar, color: "text-accent" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="glass rounded-xl p-4 flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-secondary">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compliance by category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">Compliance by Category</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={complianceData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                <XAxis dataKey="category" tick={{ fill: "hsl(215 15% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" fill="hsl(160, 100%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Scale className="w-5 h-5 text-accent" />
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">Ethical Dimensions</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(220 15% 18%)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="hsl(160, 100%, 45%)" fill="hsl(160, 100%, 45%)" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model distribution pie chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-warning" />
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">Model Risk Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={modelBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={0}>
                  {modelBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {modelBreakdown.map((m) => (
                <div key={m.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.fill }} />
                  {m.name} ({m.value})
                </div>
              ))}
            </div>
          </motion.div>

          {/* Audit history */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-2 glass rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">Audit History</h3>
            </div>
            <div className="space-y-2">
              {auditHistory.map((audit) => {
                const config = statusConfig[audit.status as keyof typeof statusConfig];
                const Icon = config.icon;
                return (
                  <div
                    key={audit.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md ${config.bg} border ${config.border}`}>
                        <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-mono text-foreground">{audit.id}</p>
                        <p className="text-[10px] text-muted-foreground">{audit.framework} · {audit.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-bold text-foreground">{audit.score}%</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${config.bg} ${config.color} border ${config.border}`}>
                        {audit.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
