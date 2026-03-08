import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Key, Copy, Check, Server, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

interface RegisteredModel {
  id: string;
  name: string;
  type: string;
  endpoint: string;
  apiKey: string;
  registeredAt: string;
  status: "active" | "pending";
}

const generateApiKey = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return "ag_" + Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const RegisterModel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [type, setType] = useState("classification");
  const [endpoint, setEndpoint] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [models, setModels] = useState<RegisteredModel[]>(() => {
    const stored = localStorage.getItem("ai_guardian_models");
    return stored ? JSON.parse(stored) : [
      {
        id: "mdl_001",
        name: "Loan Approval Model v2.1",
        type: "classification",
        endpoint: "https://api.bank.com/predict",
        apiKey: "ag_xK9mP2qR5tW8vY1zA3bC6dE0fG4hI7j",
        registeredAt: "2024-12-15T10:30:00Z",
        status: "active",
      },
      {
        id: "mdl_002",
        name: "Hiring Screening AI",
        type: "classification",
        endpoint: "https://ml.hr-tech.io/screen",
        apiKey: "ag_nL3oM6pQ9sT2uV5wX8yA1bD4eF7gH0i",
        registeredAt: "2025-01-02T14:15:00Z",
        status: "active",
      },
    ];
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newModel: RegisteredModel = {
      id: `mdl_${Date.now()}`,
      name,
      type,
      endpoint,
      apiKey: generateApiKey(),
      registeredAt: new Date().toISOString(),
      status: "pending",
    };
    const updated = [...models, newModel];
    setModels(updated);
    localStorage.setItem("ai_guardian_models", JSON.stringify(updated));
    setName("");
    setEndpoint("");
    toast({
      title: "AI System Registered",
      description: `API key issued for ${newModel.name}`,
    });
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-xl font-bold text-foreground">Register AI System</h2>
            <p className="text-sm text-muted-foreground">Obtain API credentials for ethical monitoring</p>
          </div>
        </div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
            <Plus className="w-4 h-4 text-primary" />
            New AI System Registration
          </h3>
          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Model Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Loan Approval Model v3"
                required
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Model Type</Label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-10 rounded-md border border-border bg-secondary/50 px-3 text-sm text-foreground"
              >
                <option value="classification">Classification</option>
                <option value="regression">Regression</option>
                <option value="nlp">NLP</option>
                <option value="recommendation">Recommendation</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm text-muted-foreground">Prediction API Endpoint</Label>
              <Input
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="https://api.example.com/predict"
                required
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="glow-primary">
                <Key className="w-4 h-4" />
                Register & Generate API Key
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Registered Models */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
            <Server className="w-4 h-4 text-accent" />
            Registered AI Systems ({models.length})
          </h3>
          <div className="space-y-3">
            {models.map((model) => (
              <div
                key={model.id}
                className="p-4 rounded-lg bg-secondary/30 border border-border space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm text-foreground">{model.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      model.status === "active"
                        ? "bg-success/10 text-success border border-success/20"
                        : "bg-warning/10 text-warning border border-warning/20"
                    }`}>
                      {model.status.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{model.id}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono bg-background/50 px-2 py-1 rounded">{model.type}</span>
                  <span>·</span>
                  <span className="truncate max-w-xs">{model.endpoint}</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs font-mono bg-background/50 px-3 py-1.5 rounded border border-border text-muted-foreground truncate">
                    {model.apiKey}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyKey(model.apiKey)}
                  >
                    {copiedKey === model.apiKey ? (
                      <Check className="w-3 h-3 text-success" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RegisterModel;
