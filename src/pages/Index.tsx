import Navbar from "@/components/Navbar";
import StatsBar from "@/components/StatsBar";
import EthicalRiskScore from "@/components/EthicalRiskScore";
import BiasMetrics from "@/components/BiasMetrics";
import DriftMonitor from "@/components/DriftMonitor";
import ExplainabilityPanel from "@/components/ExplainabilityPanel";
import ModelRegistry from "@/components/ModelRegistry";
import AlertsFeed from "@/components/AlertsFeed";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Shield, ArrowDown } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border border-border/30 p-6 bg-gradient-to-r from-primary/5 via-background to-accent/5"
        >
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
              <h2 className="text-lg font-bold text-foreground">
                Welcome back, <span className="text-primary">{user?.name?.split(" ")[0]}</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-mono text-foreground">5</span> models monitored · 
                <span className="font-mono text-warning"> 2</span> alerts pending · 
                <span className="font-mono text-success"> 94%</span> compliance
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="text-right">
                <p className="text-[10px] font-mono text-muted-foreground uppercase">Organization</p>
                <p className="text-sm font-medium text-foreground">{user?.organization}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        </motion.div>

        <StatsBar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4">
            <EthicalRiskScore />
          </div>
          <div className="lg:col-span-8 space-y-5">
            <BiasMetrics />
            <DriftMonitor />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5">
            <ExplainabilityPanel />
          </div>
          <div className="lg:col-span-7">
            <ModelRegistry />
          </div>
        </div>

        <AlertsFeed />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
