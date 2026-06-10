"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { SkillList } from "@/components/SkillList";
import { CheckCircle } from "lucide-react";
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
    supabase
      .from("skills")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setSkills(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {submitted === "1" && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 flex items-center gap-2 max-w-md mx-auto">
          <CheckCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">提交成功！你的 Skill 正在等待审核。</p>
        </div>
      )}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3">发现好用的 AI Skills</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          浏览、搜索、一键安装 Claude Code skills。让 AI 技能触手可及。
        </p>
      </div>
      {loading ? (
        <div className="text-center py-20 text-muted-foreground">加载中...</div>
      ) : (
        <SkillList skills={skills} />
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-muted-foreground">加载中...</div>}>
      <HomeContent />
    </Suspense>
  );
}
