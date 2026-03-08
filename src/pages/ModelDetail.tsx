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
  { category: "Gender Bias", score: 72, max: 100 },
  { category: "Age Bias", score: 68, max: 100 },
  { category: "Ethnicity Bias", score: 58, max: 100 },
  { category: "Calibration", score: 95, max: 100 },
  { category: "Privacy", score: 92, max: 100 },
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
  { id: "AUD-2025-001", date: "2025-02-28", status: "passed", score: 94, framework: "EU AI Act (Hiring)" },
  { id: "AUD-2025-002", date: "2025-02-15", status: "warning", score: 78, framework: "EEOC Compliance" },
  { id: "AUD-2025-003", date: "2025-01-30", status: "passed", score: 91, framework: "EU AI Act (Hiring)" },
  { id: "AUD-2025-004", date: "2025-01-15", status: "failed", score: 62, framework: "NYC Local Law 144" },
  { id: "AUD-2025-005", date: "2024-12-30", status: "passed", score: 89, framework: "NIST AI RMF" },
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
AI GUARDIAN - HIRING SYSTEMS ETHICAL AUDIT REPORT
===================================================
Generated: ${new Date().toISOString()}
Organization: ${user?.organization || "NeuralGuardians"}
Domain: AI-Powered Hiring Systems
Framework: EU AI Act (High-Risk AI Systems)

EXECUTIVE SUMMARY
------------------
Overall Compliance Score: 87/100
Hiring Models Audited: 5
Active Bias Alerts: 2
Candidates Evaluated: 12,400+

BIAS DETECTION SUMMARY (Hiring Pipeline)
------------------------------------------
Demographic Parity: 0.72 (Gender), 0.68 (Age), 0.58 (Ethnicity)
Equal Opportunity: 0.81 (Gender), 0.75 (Age), 0.62 (Ethnicity)
Disparate Impact: 0.78 (Gender), 0.71 (Age), 0.60 (Ethnicity)

FLAGGED BIAS INSTANCES
-----------------------
1. CRITICAL: Candidate Ranker v1.8 — Female applicants rejected 23% more often (DP=0.58)
2. CRITICAL: Candidate Ranker v1.8 — Ethnicity-associated names scored 18% lower (EO=0.55)
3. WARNING: Interview Scorer v2.1 — Candidates 45+ receive lower sentiment scores (DI=0.71)
4. WARNING: Resume Screener v3.2 — University prestige acts as socioeconomic proxy

CALIBRATION ANALYSIS
---------------------
ECE Score: 0.032 (GOOD)
Brier Score: 0.041 (GOOD)
Average Confidence Gap: 3.2%

PRIVACY PRESERVATION
---------------------
PII Masking: ACTIVE
Differential Privacy: ε=1.2
Data Minimization: 12 protected attributes excluded
Consent Verification: PARTIAL (action needed)
Privacy Score: 92/100

EXPLAINABILITY (SHAP — Resume Screener v3.2)
----------------------------------------------
Legitimate Factors: Years Experience (+0.38), Skills Match (+0.32), Education (+0.25)
Flagged Bias Sources: Name Ethnicity Signal (-0.28), Gender Indicators (-0.22)

RECOMMENDATIONS
----------------
1. [HIGH] Retrain Candidate Ranker with balanced dataset (Est. 3-5 days)
2. [HIGH] Remove name-based features from screening pipeline (Est. 1 day)
3. [MEDIUM] Add age-debiasing layer to Interview Scorer (Est. 2-3 days)
4. [MEDIUM] Replace university prestige with skills-based scoring (Est. 1 week)
5. [LOW] Implement consent tracking for all AI screening steps (Est. 2-3 days)

Report ID: RPT-${Date.now()}
NeuralGuardians · AI Guardian Platform
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
              <h2 className="text-xl font-bold text-foreground">Hiring Systems Audit Reports</h2>
              <p className="text-sm text-muted-foreground">Bias audits, fairness scorecards & compliance analytics</p>
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
            { label: "Bias Findings", value: "4", icon: AlertTriangle, color: "text-warning" },
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
