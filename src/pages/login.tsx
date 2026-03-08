import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, UserPlus, Eye, EyeOff, ArrowRight, Fingerprint, Zap, ShieldCheck, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/ai-guardian-logo.png";

const features = [
  { icon: ShieldCheck, title: "Real-Time Bias Detection", desc: "Continuous fairness monitoring across demographic groups" },
  { icon: BarChart3, title: "SHAP Explainability", desc: "Transparent feature impact analysis for every prediction" },
  { icon: Zap, title: "Autonomous Mitigation", desc: "Intelligent correction recommendations in real-time" },
];

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => setActiveFeature((p) => (p + 1) % features.length), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignup) {
      const success = await signup(name, email, password, organization);
      if (success) {
        toast({ title: "Account created", description: "Welcome to AI Guardian!" });
        navigate("/");
      } else {
        toast({ title: "Signup failed", description: "Email already exists.", variant: "destructive" });
      }
    } else {
      const success = await login(email, password);
      if (success) {
        toast({ title: "Welcome back", description: "Authenticated successfully." });
        navigate("/");
      } else {
        toast({ title: "Authentication failed", description: "Invalid credentials.", variant: "destructive" });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Top branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <img src={logo} alt="AI Guardian" className="w-10 h-10 animate-float" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  AI <span className="text-primary text-glow-primary">Guardian</span>
                </h1>
              </div>
            </div>
            <p className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase">
              Jedi Code Compliance System
            </p>
          </motion.div>

          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="max-w-lg"
          >
            <h2 className="text-4xl font-bold text-foreground leading-tight mb-4">
              Ethical oversight for
              <br />
              <span className="text-primary text-glow-primary">deployed AI systems</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Protect your AI models from bias, drift, and compliance risks with 
              real-time monitoring, SHAP explainability, and autonomous mitigation.
            </p>

            {/* Rotating features */}
            <div className="space-y-3">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                const isActive = i === activeFeature;
                return (
                  <motion.div
                    key={feat.title}
                    animate={{ 
                      opacity: isActive ? 1 : 0.4,
                      x: isActive ? 0 : -4,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      isActive ? "bg-primary/5 border border-primary/15" : "border border-transparent"
                    }`}
                  >
                    <div className={`p-1.5 rounded-md ${isActive ? "bg-primary/15" : "bg-secondary/50"}`}>
                      <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {feat.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{feat.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Bottom info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6 text-[10px] font-mono text-muted-foreground/60"
          >
            <span>PS9 · BLUEBIT 4.0</span>
            <span>·</span>
            <span>NeuralGuardians</span>
            <span>·</span>
            <span>v2.0</span>
          </motion.div>
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute inset-0 hex-pattern" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm relative z-10"
        >
          {/* Mobile logo */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <img src={logo} alt="AI Guardian" className="w-12 h-12 mb-3" />
            <h1 className="text-xl font-bold text-foreground">
              AI <span className="text-primary text-glow-primary">Guardian</span>
            </h1>
          </div>

          {/* Auth header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Fingerprint className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                {isSignup ? "Create Account" : "Welcome back"}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {isSignup
                ? "Register your organization for ethical AI monitoring"
                : "Sign in to access the oversight dashboard"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className="bg-secondary/40 border-border/60 h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="org" className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Organization</Label>
                  <Input id="org" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Org name" required className="bg-secondary/40 border-border/60 h-9 text-sm" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Email</Label>
              <Input
                id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@organization.ai" required
                className="bg-secondary/40 border-border/60 h-9 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Password</Label>
              <div className="relative">
                <Input
                  id="password" type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                  className="bg-secondary/40 border-border/60 h-9 text-sm pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-10 glow-primary font-semibold" disabled={loading}>
              {loading ? (
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                  Authenticating...
                </motion.span>
              ) : (
                <>
                  {isSignup ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  {isSignup ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={() => setIsSignup(!isSignup)}
              className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {isSignup ? "Already have an account? Sign in" : "Need an account? Register"}
            </button>
          </div>

          {!isSignup && (
            <div className="mt-6 pt-5 border-t border-border/40">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3">Quick access</p>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { setEmail("admin@aiguardian.ai"); setPassword("admin123"); }}
                  className="flex items-center gap-2 text-xs px-3 py-2 rounded-md bg-secondary/30 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/25 transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Admin Access
                </button>
                <button type="button" onClick={() => { setEmail("analyst@aiguardian.ai"); setPassword("analyst123"); }}
                  className="flex items-center gap-2 text-xs px-3 py-2 rounded-md bg-secondary/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/25 transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Analyst Access
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
