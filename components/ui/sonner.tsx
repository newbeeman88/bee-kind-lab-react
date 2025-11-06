"use client";

import { Toaster as Sonner} from "sonner";
import type {ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  // Detect if dark mode is active by checking if document has 'dark' class
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  return (
    <Sonner
      theme={isDark ? "dark" : "light"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          background: 'var(--popover)',
          color: 'var(--popover-foreground)',
          border: '1px solid var(--border)',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

