import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/CopyButton";
import { CATEGORY_COLORS, CATEGORY_LABELS, type SkillCategory } from "@/types";
import { ExternalLink, User, Calendar, Tag, Download } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params;

  const skill = await prisma.skill.findUnique({
    where: { slug },
  });

  if (!skill || skill.status !== "approved") {
    notFound();
  }

  const colorClass =
    CATEGORY_COLORS[skill.category as SkillCategory] || CATEGORY_COLORS.other;
  const label =
    CATEGORY_LABELS[skill.category as SkillCategory] || skill.category;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← 返回
          </Link>
          <Badge variant="secondary" className={colorClass}>
            {label}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold mb-2">{skill.name}</h1>
        <p className="text-muted-foreground text-lg">{skill.description}</p>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <span className="flex items-center gap-1">
          <User className="h-4 w-4" />
          {skill.authorName}
          {skill.authorGithub && (
            <a
              href={`https://github.com/${skill.authorGithub}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              (@{skill.authorGithub})
            </a>
          )}
        </span>
        <span className="flex items-center gap-1">
          <Tag className="h-4 w-4" />
          v{skill.version}
        </span>
        <span className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          {skill.downloads} 次安装
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date(skill.createdAt).toLocaleDateString("zh-CN")}
        </span>
      </div>

      {/* Install command */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <h2 className="font-semibold">安装命令</h2>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 bg-muted rounded-lg p-3 font-mono text-sm">
            <code className="flex-1 break-all">{skill.installCommand}</code>
            <CopyButton text={skill.installCommand} />
          </div>
          {skill.repoUrl && (
            <a
              href={skill.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3"
            >
              <ExternalLink className="h-3 w-3" />
              查看 GitHub 仓库
            </a>
          )}
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Full SKILL.md content */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">技能详情</h2>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-muted rounded-lg p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
            {skill.fullContent}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
