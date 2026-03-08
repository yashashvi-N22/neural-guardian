import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, AlertTriangle, CheckCircle, Info, XCircle, X, Trash2 } from "lucide-react";

interface Notification {
  id: string;
  type: "critical" | "warning" | "info" | "success";
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "n1", type: "critical", message: "Resume Screener v1.8: Demographic parity violation detected", time: "1m ago", read: false },
  { id: "n2", type: "warning", message: "Loan Approval v2.1: PSI approaching threshold (0.089)", time: "5m ago", read: false },
  { id: "n3", type: "info", message: "Fraud Detection v5.1: SHAP report generated", time: "12m ago", read: false },
  { id: "n4", type: "success", message: "Credit Scoring v3.2: Bias mitigation applied", time: "18m ago", read: true },
  { id: "n5", type: "warning", message: "Insurance Pricing v4.0: Disparate impact ratio below 0.80", time: "22m ago", read: true },
  { id: "n6", type: "info", message: "Compliance audit report ready for download", time: "30m ago", read: true },
];

const typeConfig = {
  critical: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  info: { icon: Info, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
  success: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
};

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
}

const NotificationsPanel = ({ open, onClose }: NotificationsPanelProps) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismissNotification = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const clearAll = () => setNotifications([]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-2 w-96 max-h-[500px] glass rounded-xl border border-border shadow-2xl z-50 overflow-hidden"
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-[10px] text-muted-foreground hover:text-primary transition-colors px-2 py-1">
                  Mark all read
                </button>
              )}
              <button onClick={clearAll} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[400px] p-2 space-y-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              notifications.map((n) => {
                const config = typeConfig[n.type];
                const Icon = config.icon;
                return (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`flex gap-3 p-3 rounded-lg ${config.bg} border ${config.border} group cursor-pointer transition-colors ${
                      !n.read ? "ring-1 ring-primary/20" : "opacity-70"
                    }`}
                    onClick={() => setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                  >
                    <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground leading-relaxed">{n.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[10px] text-muted-foreground font-mono">{n.time}</p>
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); dismissNotification(n.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
export { type Notification };
