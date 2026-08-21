"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/components/(base)/providers/UserProvider";
import { BreadcrumbBackButton, BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { MorphIcon } from "morphicons/react";
import { Menu as MenuIcon, X, RefreshCw, RotateCw } from "lucide";
import Menu from "./Menu";
import { getPendingDevicesCount } from "@/components/(Kore)/admin/lib/actions";
import { createPortal } from "react-dom";
import AnimacionLogoKore from "@/components/(Kore)/logo/AnimacionLogoKore";
import { MaintenanceAlertBar } from "@/components/(base)/layout/MaintenanceAlertBar";

export default function Header() {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingDevices, setPendingDevices] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [refreshHovered, setRefreshHovered] = useState(false);
  const [breadcrumbHovered, setBreadcrumbHovered] = useState(false);
  const pathname = usePathname();
  const isRoot = pathname === "/kore";

  const metadata = user?.user_metadata || {};
  const role = metadata.rol || user?.role || "user";
  const canManage = ["super", "admin"].includes(role);

  useEffect(() => {
    const init = async () => {
      setMounted(true);
      if (!canManage) return;
      const c = await getPendingDevicesCount();
      setPendingDevices(c ?? 0);
    };
    init();
  }, [canManage]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFullScreen(true);
  };

  if (!user) return null;

  return (
    <>
      <header className="relative z-[100] w-full border-b border-border/20 bg-transparent">
        <div className="mx-auto flex items-center justify-between gap-4 px-4 pt-2 pb-0.5 md:px-8 md:pb-1">
          <div className="flex min-w-0 items-center">
            {isRoot ? (
              <Link
                href={user ? "/kore" : "/"}
                onClick={handleLogoClick}
                className="group flex shrink-0 cursor-pointer items-center"
              >
                <motion.img
                  src="/kore/kore.png"
                  alt="KORE"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-8 w-auto origin-left object-contain transition-transform duration-300 group-hover:scale-105 md:h-10"
                />
              </Link>
            ) : (
              <div
                className="flex min-w-0 items-center gap-0.5 md:gap-1"
                onMouseEnter={() => setBreadcrumbHovered(true)}
                onMouseLeave={() => setBreadcrumbHovered(false)}
              >
                <BreadcrumbBackButton engaged={breadcrumbHovered} />
                <Link
                  href={user ? "/kore" : "/"}
                  onClick={handleLogoClick}
                  className="group flex shrink-0 cursor-pointer items-center"
                >
                  <motion.img
                    src="/kore/kore.png"
                    alt="KORE"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-8 w-auto origin-left object-contain transition-transform duration-300 group-hover:scale-105 md:h-10"
                  />
                </Link>
                {user ? (
                  <div className="hidden min-w-0 items-center md:flex">
                    <BreadcrumbNav />
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              id="refresh-btn"
              onClick={() => window.location.reload()}
              onMouseEnter={() => setRefreshHovered(true)}
              onMouseLeave={() => setRefreshHovered(false)}
              className="flex items-center justify-center text-white hover:text-celeste-kore cursor-pointer transition-colors active:scale-95"
            >
              <MorphIcon
                icon={refreshHovered ? RotateCw : RefreshCw}
                size={26}
                strokeWidth={2}
                spring="snappy"
              />
            </button>
            <div className="relative ml-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center text-foreground hover:text-foreground/80 cursor-pointer transition-colors active:scale-95"
              >
                <MorphIcon
                  icon={isOpen ? X : MenuIcon}
                  size={32}
                  strokeWidth={2}
                  spring="snappy"
                />
              </button>
              {!isOpen && canManage && pendingDevices > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-celeste-kore text-[10px] font-bold text-white animate-pulse pointer-events-none">
                  {pendingDevices}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {user && !isRoot && (
        <div
          className="relative w-full border-b border-border/20 bg-transparent px-6 py-2 md:hidden"
          onMouseEnter={() => setBreadcrumbHovered(true)}
          onMouseLeave={() => setBreadcrumbHovered(false)}
        >
          <BreadcrumbNav />
        </div>
      )}

      <Menu isOpen={isOpen} setIsOpen={setIsOpen} user={user} />

      {/* Maintenance alert bar: shows below header on proyectos pages when billing is due within 5 days */}
      {user && <MaintenanceAlertBar />}

      {mounted && createPortal(
        <AnimacionLogoKore isOpen={isFullScreen} onClose={() => setIsFullScreen(false)} />,
        document.body
      )}
    </>
  );
}
