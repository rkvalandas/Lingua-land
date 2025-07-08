"use client";

import { useState } from "react";
import { UserIcon, SettingsIcon, LogoutIcon, ChevronIcon } from "./Icons";

interface User {
  username: string;
  email: string;
}

interface UserSectionProps {
  user: User;
  sidebarCollapsed: boolean;
  onLogout: () => void;
}

export default function UserSection({
  user,
  sidebarCollapsed,
  onLogout,
}: UserSectionProps) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-1; border-t-2 border-amber-300/70 dark:border-amber-600/70 bg-gradient-to-r from-amber-200/95 via-yellow-200/95 to-amber-200/95 dark:from-amber-800/95 dark:via-yellow-800/95 dark:to-amber-800/95 backdrop-blur-lg">
      <div className="relative">
        <button
          onClick={() => setShowUserDropdown(!showUserDropdown)}
          className={`
            w-full flex items-center gap-4 px-4 py-4 rounded-2xl 
            hover:bg-gradient-to-r hover:from-purple-100/80 hover:via-purple-50/80 hover:to-purple-100/80
            dark:hover:from-purple-800/30 dark:hover:via-purple-700/30 dark:hover:to-purple-800/30
            transition-all duration-300 group touch-manipulation active:scale-95 relative overflow-hidden
            ${
              sidebarCollapsed && window.innerWidth >= 1024
                ? "justify-center"
                : ""
            }
          `}
          title={
            sidebarCollapsed && window.innerWidth >= 1024
              ? user.username
              : undefined
          }
          style={{
            borderRadius: "16px 12px 16px 8px",
            boxShadow:
              "0 6px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
            minHeight: "64px",
            border: "1px solid rgba(147,51,234,0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg ring-2 ring-white/20">
            <UserIcon />
          </div>
          {(!sidebarCollapsed || window.innerWidth < 1024) && (
            <div className="flex-1 text-left min-w-0">
              <div className="font-bold text-emerald-900 dark:text-emerald-100 truncate text-base">
                {user.username}
              </div>
              <div className="text-sm text-emerald-700 dark:text-emerald-300 truncate opacity-80">
                {user.email}
              </div>
            </div>
          )}
          {(!sidebarCollapsed || window.innerWidth < 1024) && (
            <div className="w-5 h-5 text-emerald-600 dark:text-emerald-400 opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-180">
              <ChevronIcon direction="down" />
            </div>
          )}

          {/* Subtle hover effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ borderRadius: "16px 12px 16px 8px" }}
          />
        </button>

        {/* User Dropdown */}
        {showUserDropdown &&
          (!sidebarCollapsed || window.innerWidth < 1024) && (
            <div
              className="absolute bottom-full left-0 right-0 mb-4 bg-gradient-to-br from-amber-100/95 via-yellow-100/95 to-amber-200/95 dark:from-amber-800/95 dark:via-yellow-800/95 dark:to-amber-700/95 backdrop-blur-lg shadow-2xl border-2 border-amber-300/60 dark:border-amber-600/60 overflow-hidden"
              style={{
                boxShadow:
                  "0 -12px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
                borderRadius: "16px 12px 16px 8px",
              }}
            >
              <div className="py-2">
                <button className="w-full px-5 py-4 text-left hover:bg-gradient-to-r hover:from-emerald-100/80 hover:to-emerald-50/80 dark:hover:from-emerald-800/25 dark:hover:to-emerald-700/25 transition-all duration-300 flex items-center gap-4 text-emerald-800 dark:text-emerald-200 text-sm font-medium touch-manipulation active:scale-95">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <SettingsIcon />
                  </div>
                  Settings
                </button>
                <div className="border-t border-amber-300/60 dark:border-amber-600/60 my-2 mx-4"></div>
                <button
                  onClick={onLogout}
                  className="w-full px-5 py-4 text-left hover:bg-gradient-to-r hover:from-red-100/80 hover:to-red-50/80 dark:hover:from-red-900/25 dark:hover:to-red-800/25 transition-all duration-300 flex items-center gap-4 text-red-600 dark:text-red-400 text-sm font-medium touch-manipulation active:scale-95"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white">
                    <LogoutIcon />
                  </div>
                  Sign Out
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
