"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps { text: string; className?: string }

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) { const t = setTimeout(() => setCopied(false), 2000); return () => clearTimeout(t); }
  }, [copied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
        copied
          ? "bg-green-500 text-white shadow-[3px_3px_0px_rgba(34,197,94,0.3)] -translate-y-0.5"
          : "bg-primary text-primary-foreground shadow-[3px_3px_0px_rgba(108,92,231,0.3)] hover:shadow-[5px_5px_0px_rgba(108,92,231,0.4)] hover:-translate-y-0.5 active:translate-y-0"
      } ${className || ""}`}
    >
      {copied ? <><Check className="h-4 w-4" />已复制</> : <><Copy className="h-4 w-4" />复制命令</>}
    </button>
  );
}
