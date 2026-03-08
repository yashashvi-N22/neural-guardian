import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, Settings, Activity, LogOut, UserCircle, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NotificationsPanel from "@/components/NotificationsPanel";
import SettingsPanel from "@/components/SettingsPanel";
import logo from "@/assets/ai-guardian-logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Models", path: "/register-model" },
    { label: "Reports", path: "/reports" },
    { label: "Compliance", path: "/compliance" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 px-5 py-2.5 flex items-center justify-between border-b border-border/30 bg-background/80 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="AI Guardian" className="w-7 h-7" />
          <span className="text-sm font-bold tracking-tight text-foreground">
            AI<span className="text-primary">Guardian</span>
          </span>
          <span className="hidden sm:inline text-[9px] font-mono text-muted-foreground/60 border border-border/40 px-1.5 py-0.5 rounded">
            v2.0
          </span>
        </div>

        <div className="hidden md:flex items-center">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/40"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/8 border border-primary/15">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-[10px] font-mono text-primary/80">LIVE</span>
          </div>

          {user && (
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/30 border border-border/30">
              <UserCircle className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] font-mono text-muted-foreground">{user.name?.split(" ")[0]}</span>
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => { setNotifOpen(!notifOpen); setSettingsOpen(false); }}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors relative rounded-md hover:bg-secondary/40"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-destructive rounded-full" />
            </button>
            <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
          </div>

          <button
            onClick={() => { setSettingsOpen(true); setNotifOpen(false); }}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/40"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleLogout}
            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors md:hidden"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-b border-border/30 bg-background/95 backdrop-blur-xl md:hidden"
        >
          <div className="px-4 py-2 space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/40"
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};

export default Navbar;
