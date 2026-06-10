"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/CopyButton";
import { CATEGORY_COLORS, CATEGORY_LABELS, type Skill, type SkillCategory } from "@/types";
import { ExternalLink, User, Calendar, Tag, Download, ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";

export default function SkillDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("skills").select("*").eq("slug", slug).eq("status", "approved").single()
      .then(({ data }) => { setSkill(data); setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-2xl border-2 border-primary/20 border-t-primary animate-spin" />
        <p className="text-muted-foreground">加载中...</p>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-32 text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center shadow-[4px_4px_0px_rgba(108,92,231,0.1)]">
          <span className="text-3xl">🔍</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Skill 未找到</h1>
        <p className="text-muted-foreground mb-6">该 Skill 不存在或尚未通过审核</p>
        <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-[3px_3px_0px_rgba(108,92,231,0.3)] hover:shadow-[5px_5px_0px_rgba(108,92,231,0.4)] hover:-translate-y-0.5 transition-all">← 返回首页</Link>
      </div>
    );
  }

  const colorClass = CATEGORY_COLORS[skill.category as SkillCategory] || CATEGORY_COLORS.other;
  const label = CATEGORY_LABELS[skill.category as SkillCategory] || skill.category;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
      {/* Back + Badge */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
          <ArrowLeft className="h-4 w-4" /> 返回
        </Link>
        <Badge className={`text-xs font-semibold ${colorClass}`}>{label}</Badge>
      </div>

      {/* Title & meta */}
      <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_rgba(26,26,46,0.06)] mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">{skill.name}</h1>
        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{skill.description}</p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center"><User className="h-3.5 w-3.5" /></div>
            {skill.author_name}
            {skill.author_github && (
              <a href={`https://github.com/${skill.author_github}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium ml-0.5">@{skill.author_github}</a>
            )}
          </span>
          <span className="flex items-center gap-1.5"><Tag className="h-4 w-4" />v{skill.version}</span>
          <span className="flex items-center gap-1.5"><Download className="h-4 w-4" /><span className="font-semibold text-foreground">{skill.downloads}</span> 次安装</span>
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{new Date(skill.created_at).toLocaleDateString("zh-CN")}</span>
        </div>
      </div>

      {/* Install command */}
      <div className="bg-card border-2 border-primary/20 rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_rgba(108,92,231,0.1)] mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Terminal className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-bold text-lg">安装命令</h2>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-muted rounded-2xl p-4">
          <code className="flex-1 font-mono text-sm leading-relaxed break-all">{skill.install_command}</code>
          <CopyButton text={skill.install_command} />
        </div>
        {skill.repo_url && (
          <a href={skill.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium mt-4 transition-colors">
            <ExternalLink className="h-3.5 w-3.5" />查看 GitHub 仓库
          </a>
        )}
      </div>

      <Separator className="my-6" />

      {/* Full content */}
      <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_rgba(26,26,46,0.06)]">
        <h2 className="font-bold text-lg mb-4">📋 技能详情</h2>
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-muted rounded-2xl p-5 overflow-x-auto max-h-[600px] overflow-y-auto">
          {skill.full_content}
        </pre>
      </div>
    </div>
  );
}
