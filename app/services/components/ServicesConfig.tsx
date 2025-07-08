import React from "react";

export interface Service {
  id: string;
  name: string;
  icon: ({ isCollapsed }: { isCollapsed?: boolean }) => React.JSX.Element;
}

export const services: Service[] = [
  {
    id: "grammar",
    name: "Grammar Checker",
    icon: ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
      <svg
        className={isCollapsed ? "w-10 h-10" : "w-5 h-5"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "translator",
    name: "Translator",
    icon: ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
      <svg
        className={isCollapsed ? "w-10 h-10" : "w-5 h-5"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
    ),
  },
  {
    id: "summariser",
    name: "Summariser",
    icon: ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
      <svg
        className={isCollapsed ? "w-10 h-10" : "w-5 h-5"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "paraphraser",
    name: "Paraphraser",
    icon: ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
      <svg
        className={isCollapsed ? "w-10 h-10" : "w-5 h-5"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
];
