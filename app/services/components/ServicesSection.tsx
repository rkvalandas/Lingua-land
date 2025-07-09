"use client";

import { services } from "./ServicesConfig";
import { AIServicesIcon, ChevronIcon, CheckIcon } from "./Icons";

interface ServicesSectionProps {
  selectedService: string;
  sidebarCollapsed: boolean;
  showServicesDropdown: boolean;
  onServiceChange: (serviceId: string) => void;
  onToggleDropdown: () => void;
}

export default function ServicesSection({
  selectedService,
  sidebarCollapsed,
  showServicesDropdown,
  onServiceChange,
  onToggleDropdown,
}: ServicesSectionProps) {
  return (
    <div className="px-3 py-4 relative">
      {(!sidebarCollapsed || window.innerWidth < 1024) && (
        <>
          {/* Services Dropdown Button */}
          <button
            onClick={onToggleDropdown}
            className="w-full flex items-center justify-between gap-4 px-4 py-4 rounded-2xl transition-all duration-300 text-left group touch-manipulation relative overflow-hidden bg-gradient-to-r from-amber-100/95 via-yellow-50/95 to-amber-200/95 dark:from-amber-800/95 dark:via-yellow-700/95 dark:to-amber-700/95 hover:from-amber-200/95 hover:via-amber-100/95 hover:to-amber-200/95 dark:hover:from-amber-700/95 dark:hover:via-amber-600/95 dark:hover:to-amber-700/95 shadow-md hover:shadow-lg active:scale-95"
            style={{
              borderRadius: "16px 12px 16px 8px",
              border: "2px solid rgba(251,191,36,0.5)",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              minHeight: "56px",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/95 to-emerald-700/95 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-400/80 dark:border-emerald-500/80">
                <AIServicesIcon />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-handwriting text-emerald-800 dark:text-emerald-100 font-bold">
                  ✨ AI Services
                </h2>
                <div className="text-sm text-emerald-700 dark:text-emerald-300 opacity-90 font-medium">
                  {services.find((s) => s.id === selectedService)?.name ||
                    "Select a service"}
                </div>
              </div>
            </div>

            <div
              className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 transition-transform duration-300 ${
                showServicesDropdown ? "rotate-180" : ""
              }`}
            >
              <ChevronIcon direction="down" />
            </div>
          </button>

          {/* Services Dropdown Menu */}
          {showServicesDropdown && (
            <div
              className="mt-3 bg-gradient-to-br from-amber-50/95 via-yellow-50/95 to-amber-100/95 dark:from-amber-900/95 dark:via-yellow-900/95 dark:to-amber-800/95 backdrop-blur-lg shadow-xl border-2 border-amber-300/60 dark:border-amber-600/60 overflow-hidden"
              style={{
                borderRadius: "16px 12px 16px 8px",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <nav className="py-2">
                {services.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => onServiceChange(service.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 transition-all duration-200 text-left group touch-manipulation ${
                      selectedService === service.id
                        ? "bg-gradient-to-r from-amber-200/95 via-amber-100/95 to-amber-200/95 dark:from-amber-700/95 dark:via-amber-600/95 dark:to-amber-700/95 text-emerald-900 dark:text-white"
                        : "text-emerald-800 dark:text-emerald-100 hover:bg-gradient-to-r hover:from-amber-100/80 hover:via-yellow-50/80 hover:to-amber-100/80 dark:hover:from-amber-800/80 dark:hover:via-amber-700/80 dark:hover:to-amber-800/80"
                    } ${index === 0 ? "rounded-t-lg" : ""} ${
                      index === services.length - 1 ? "rounded-b-lg" : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 flex items-center justify-center ${
                        selectedService === service.id
                          ? "text-emerald-700 dark:text-emerald-200"
                          : "text-emerald-600 dark:text-emerald-300"
                      }`}
                    >
                      <service.icon isCollapsed={false} />
                    </div>
                    <span className="font-medium text-sm tracking-wide">
                      {service.name}
                    </span>
                    {selectedService === service.id && <CheckIcon />}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </>
      )}

      {/* Collapsed state - show selected service icon */}
      {sidebarCollapsed && window.innerWidth >= 1024 && (
        <div className="flex justify-center">
          <button
            onClick={onToggleDropdown}
            className="w-12 h-12 bg-gradient-to-br from-amber-200/95 via-amber-100/95 to-amber-200/95 dark:from-amber-700/95 dark:via-amber-600/95 dark:to-amber-700/95 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            title={
              services.find((s) => s.id === selectedService)?.name ||
              "AI Services"
            }
            style={{
              borderRadius: "16px 12px 16px 8px",
              border: "2px solid rgba(251,191,36,0.9)",
              boxShadow:
                "0 6px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            {services
              .find((s) => s.id === selectedService)
              ?.icon({ isCollapsed: true }) || <AIServicesIcon />}
          </button>
        </div>
      )}
    </div>
  );
}
