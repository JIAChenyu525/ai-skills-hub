"use client";

import { useEffect, useState, useRef } from "react";
import { Check, Copy } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface CopyButtonProps {
  text: string;
  slug: string;
  className?: string;
}

export function CopyButton({ text, slug, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const countedRef = useRef(false);

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [copied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    // Count download once per page view
    if (!countedRef.current) {
      countedRef.current = true;
      const { data } = await supabase.from("skills").select("downloads").eq("slug", slug).single();
      if (data) {
        await supabase.from("skills").update({ downloads: (data.downloads || 0) + 1 }).eq("slug", slug);
      }
    }
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
