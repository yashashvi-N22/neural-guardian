import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, User, Palette, Bell as BellIcon, Shield, Monitor } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

const SettingsPanel = ({ open, onClose }: SettingsPanelProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "monitoring">("profile");

  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem("ai_guardian_settings");
    return stored
      ? JSON.parse(stored)
      : {
          emailAlerts: true,
          criticalOnly: false,
          autoMitigation: false,
          driftThreshold: "0.10",
          biasThreshold: "0.80",
          monitoringInterval: "5",
          complianceFramework: "EU AI Act",
        };
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const saveSettings = () => {
    localStorage.setItem("ai_guardian_settings", JSON.stringify(settings));
    toast({ title: "Settings saved", description: "Your preferences have been updated." });
  };

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "notifications" as const, label: "Alerts", icon: BellIcon },
    { id: "monitoring" as const, label: "Monitoring", icon: Monitor },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md glass border-l border-border z-50 flex flex-col"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Settings</h3>
              </div>
              <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs transition-colors ${
                      activeTab === tab.id
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {activeTab === "profile" && (
                <>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{user?.name?.charAt(0) || "U"}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 mt-1 inline-block">
                        {user?.role?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Organization</Label>
                      <Input value={user?.organization || ""} readOnly className="bg-secondary/50 border-border text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">User ID</Label>
                      <Input value={user?.id || ""} readOnly className="bg-secondary/50 border-border text-sm font-mono" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Compliance Framework</Label>
                      <select
                        value={settings.complianceFramework}
                        onChange={(e) => setSettings({ ...settings, complianceFramework: e.target.value })}
                        className="w-full h-10 rounded-md border border-border bg-secondary/50 px-3 text-sm text-foreground"
                      >
                        <option value="EU AI Act">EU AI Act</option>
                        <option value="NIST AI RMF">NIST AI RMF</option>
                        <option value="IEEE Ethically Aligned">IEEE Ethically Aligned</option>
                        <option value="Custom">Custom Framework</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div>
                      <p className="text-sm text-foreground">Email Alerts</p>
                      <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                    </div>
                    <Switch checked={settings.emailAlerts} onCheckedChange={(v) => setSettings({ ...settings, emailAlerts: v })} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div>
                      <p className="text-sm text-foreground">Critical Only</p>
                      <p className="text-xs text-muted-foreground">Only send critical risk alerts</p>
                    </div>
                    <Switch checked={settings.criticalOnly} onCheckedChange={(v) => setSettings({ ...settings, criticalOnly: v })} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div>
                      <p className="text-sm text-foreground">Auto Mitigation</p>
                      <p className="text-xs text-muted-foreground">Automatically apply bias corrections</p>
                    </div>
                    <Switch checked={settings.autoMitigation} onCheckedChange={(v) => setSettings({ ...settings, autoMitigation: v })} />
                  </div>
                </div>
              )}

              {activeTab === "monitoring" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">PSI Drift Threshold</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={settings.driftThreshold}
                      onChange={(e) => setSettings({ ...settings, driftThreshold: e.target.value })}
                      className="bg-secondary/50 border-border text-sm font-mono"
                    />
                    <p className="text-[10px] text-muted-foreground">Alert when PSI exceeds this value</p>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Fairness Threshold (Disparate Impact)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={settings.biasThreshold}
                      onChange={(e) => setSettings({ ...settings, biasThreshold: e.target.value })}
                      className="bg-secondary/50 border-border text-sm font-mono"
                    />
                    <p className="text-[10px] text-muted-foreground">Flag models below this DI ratio</p>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Monitoring Interval (minutes)</Label>
                    <Input
                      type="number"
                      value={settings.monitoringInterval}
                      onChange={(e) => setSettings({ ...settings, monitoringInterval: e.target.value })}
                      className="bg-secondary/50 border-border text-sm font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border">
              <Button onClick={saveSettings} className="w-full glow-primary">
                <Shield className="w-4 h-4" />
                Save Settings
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
