"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, Shield } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-lg shadow-[3px_3px_0px_rgba(108,92,231,0.3)] group-hover:shadow-[5px_5px_0px_rgba(108,92,231,0.4)] group-hover:-translate-y-0.5 transition-all duration-200">
              🧩
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline">
              Skills Hub
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === "/"
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              浏览
            </Link>
            <Link
              href="/submit"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === "/submit"
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              提交
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            title="管理后台"
          >
            <Shield className="h-3.5 w-3.5" />
            管理
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-[3px_3px_0px_rgba(108,92,231,0.3)] hover:shadow-[5px_5px_0px_rgba(108,92,231,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_rgba(108,92,231,0.3)] transition-all duration-150"
          >
            <PlusCircle className="h-4 w-4" />
            提交 Skill
          </Link>
        </div>
      </div>
    </header>
  );
}
