"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🧩</span>
            <span className="hidden sm:inline">AI Skills Hub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link
              href="/"
              className={`hover:text-primary transition-colors ${
                pathname === "/" ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              浏览
            </Link>
            <Link
              href="/submit"
              className={`hover:text-primary transition-colors ${
                pathname === "/submit" ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              提交
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
            title="管理后台"
          >
            管理
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
          >
            <PlusCircle className="h-4 w-4" />
            提交 Skill
          </Link>
        </div>
      </div>
    </header>
  );
}
