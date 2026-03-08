import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Shield, CheckCircle, AlertTriangle, XCircle,
  FileCheck, Globe, Scale, Clock, ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Progress } from "@/components/ui/progress";

const regulations = [
  {
    name: "EU AI Act",
    status: "compliant",
    score: 94,
    requirements: [
      { name: "Risk Classification", status: "passed", detail: "All models classified per Annex III" },
      { name: "Transparency Obligations", status: "passed", detail: "SHAP explainability integrated" },
      { name: "Human Oversight", status: "passed", detail: "Admin review workflow enabled" },
      { name: "Data Governance", status: "warning", detail: "Training data documentation incomplete for 1 model" },
      { name: "Bias Monitoring", status: "passed", detail: "Real-time demographic parity tracking active" },
      { name: "Conformity Assessment", status: "passed", detail: "Self-assessment completed Q1 2025" },
    ],
  },
  {
    name: "NIST AI RMF",
    status: "partial",
    score: 78,
    requirements: [
      { name: "GOVERN", status: "passed", detail: "AI governance policies documented" },
      { name: "MAP", status: "warning", detail: "Context mapping partially complete" },
      { name: "MEASURE", status: "passed", detail: "Fairness metrics implemented (DP, EO, DI)" },
      { name: "MANAGE", status: "warning", detail: "Incident response plan needs update" },
    ],
  },
  {
    name: "IEEE Ethically Aligned Design",
    status: "non-compliant",
    score: 62,
    requirements: [
      { name: "Well-being", status: "passed", detail: "Impact assessment completed" },
      { name: "Accountability", status: "passed", detail: "Audit trail maintained" },
      { name: "Transparency", status: "warning", detail: "Public disclosure pending" },
      { name: "Awareness of Misuse", status: "failed", detail: "Red-teaming not yet conducted" },
    ],
  },
];

const statusIcon = {
  passed: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  failed: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
};

const frameworkStatus = {
  compliant: { color: "text-success", bg: "bg-success/10", border: "border-success/20", label: "COMPLIANT" },
  partial: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/20", label: "PARTIAL" },
  "non-compliant": { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20", label: "NON-COMPLIANT" },
};

const Compliance = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>("EU AI Act");

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-xl font-bold text-foreground">Compliance Dashboard</h2>
            <p className="text-sm text-muted-foreground">Regulatory framework tracking & certification status</p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Frameworks Tracked", value: "3", icon: Globe, color: "text-accent" },
            { label: "Fully Compliant", value: "1", icon: CheckCircle, color: "text-success" },
            { label: "Action Items", value: "4", icon: AlertTriangle, color: "text-warning" },
            { label: "Last Review", value: "Feb 28", icon: Clock, color: "text-muted-foreground" },
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

        {/* Regulations */}
        <div className="space-y-4">
          {regulations.map((reg, regIdx) => {
            const fwStatus = frameworkStatus[reg.status as keyof typeof frameworkStatus];
            const isExpanded = expanded === reg.name;
            return (
              <motion.div
                key={reg.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + regIdx * 0.05 }}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : reg.name)}
                  className="w-full p-5 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-secondary">
                      <Scale className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">{reg.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${fwStatus.bg} ${fwStatus.color} border ${fwStatus.border}`}>
                          {fwStatus.label}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">{reg.score}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 hidden sm:block">
                      <Progress value={reg.score} className="h-2" />
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-border"
                  >
                    <div className="p-4 space-y-2">
                      {reg.requirements.map((req) => {
                        const config = statusIcon[req.status as keyof typeof statusIcon];
                        const Icon = config.icon;
                        return (
                          <div
                            key={req.name}
                            className={`flex items-center gap-3 p-3 rounded-lg ${config.bg} border ${config.border}`}
                          >
                            <Icon className={`w-4 h-4 shrink-0 ${config.color}`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{req.name}</p>
                              <p className="text-xs text-muted-foreground">{req.detail}</p>
                            </div>
                            <span className={`text-[10px] font-mono ${config.color}`}>
                              {req.status.toUpperCase()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* JEDI Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">
              JEDI Code Compliance Certification
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Ethical Score", value: "87/100", desc: "Composite score across all monitored AI systems", status: "safe" },
              { title: "Certification Status", value: "Pending", desc: "Final review required for Resume Screener v1.8", status: "warning" },
              { title: "Next Audit", value: "Mar 15", desc: "Scheduled quarterly compliance review", status: "info" },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg bg-secondary/30 border border-border">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{item.title}</p>
                <p className="text-2xl font-bold font-mono text-foreground mt-1">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Compliance;
