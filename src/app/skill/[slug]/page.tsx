"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/CopyButton";
import { CATEGORY_COLORS, CATEGORY_LABELS, type Skill, type SkillCategory } from "@/types";
import { ExternalLink, User, Calendar, Tag, Download } from "lucide-react";
import Link from "next/link";

export default function SkillDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("skills")
      .select("*")
      .eq("slug", slug)
      .eq("status", "approved")
      .single()
      .then(({ data }) => {
        setSkill(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
        加载中...
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground mb-4">Skill 未找到</p>
        <Link href="/" className="text-primary hover:underline">返回首页</Link>
      </div>
    );
  }

  const colorClass =
    CATEGORY_COLORS[skill.category as SkillCategory] || CATEGORY_COLORS.other;
  const label =
    CATEGORY_LABELS[skill.category as SkillCategory] || skill.category;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← 返回
          </Link>
          <Badge variant="secondary" className={colorClass}>{label}</Badge>
        </div>
        <h1 className="text-3xl font-bold mb-2">{skill.name}</h1>
        <p className="text-muted-foreground text-lg">{skill.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <span className="flex items-center gap-1"><User className="h-4 w-4" />{skill.author_name}{skill.author_github && <a href={`https://github.com/${skill.author_github}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">(@{skill.author_github})</a>}</span>
        <span className="flex items-center gap-1"><Tag className="h-4 w-4" />v{skill.version}</span>
        <span className="flex items-center gap-1"><Download className="h-4 w-4" />{skill.downloads} 次安装</span>
        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(skill.created_at).toLocaleDateString("zh-CN")}</span>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2"><h2 className="font-semibold">安装命令</h2></CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 bg-muted rounded-lg p-3 font-mono text-sm">
            <code className="flex-1 break-all">{skill.install_command}</code>
            <CopyButton text={skill.install_command} />
          </div>
          {skill.repo_url && (
            <a href={skill.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3">
              <ExternalLink className="h-3 w-3" />查看 GitHub 仓库
            </a>
          )}
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card>
        <CardHeader><h2 className="font-semibold">技能详情</h2></CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-muted rounded-lg p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
            {skill.full_content}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
