"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { SkillList } from "@/components/SkillList";
import { CheckCircle, Sparkles, Zap, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  const submitted = searchParams.get("submitted");
  const [skills, setSkills] = useState<Array<{
    slug: string; name: string; description: string;
    category: string; author_name: string; downloads: number;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("skills").select("*").eq("status", "approved").order("created_at", { ascending: false })
      .then(({ data }) => { setSkills(data || []); setLoading(false); });
  }, []);

  return (
    <div>
      {/* Toast */}
      {submitted === "1" && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-card border-2 border-green-200 shadow-[4px_4px_0px_rgba(34,197,94,0.15)] text-green-700 dark:text-green-300 font-medium text-sm">
            <CheckCircle className="h-4 w-4" />
            提交成功！你的 Skill 正在等待审核
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

        <div className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Tagline badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold shadow-[2px_2px_0px_rgba(108,92,231,0.1)]">
              <Sparkles className="h-3.5 w-3.5" />
              Claude Code Skills 生态
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              发现让 AI
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"> 更聪明 </span>
              的技能
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              不再去 GitHub 翻仓库。浏览、搜索、一键安装——
              <span className="text-foreground font-medium">让每个学生都能用上 AI 技能。</span>
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mb-12">
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">{skills.length}</span> 个技能
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">{skills.reduce((s, sk) => s + sk.downloads, 0)}</span> 次安装
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills grid */}
      <section className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl border-2 border-primary/20 border-t-primary animate-spin" />
            <p className="text-muted-foreground">加载中...</p>
          </div>
        ) : (
          <SkillList skills={skills} />
        )}
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center py-32 text-muted-foreground">加载中...</div>}>
      <HomeContent />
    </Suspense>
  );
}
