"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type Skill,
  type SkillCategory,
} from "@/types";
import { Check, X, RefreshCw, Shield, User, Calendar } from "lucide-react";

export default function AdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: false });
    setSkills(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const updateStatus = async (slug: string, status: "approved" | "rejected") => {
    const { error } = await supabase
      .from("skills")
      .update({ status })
      .eq("slug", slug);

    if (error) {
      alert("操作失败：" + error.message);
    } else {
      setSkills((prev) =>
        prev.map((s) => (s.slug === slug ? { ...s, status } : s))
      );
    }
  };

  const pending = skills.filter((s) => s.status === "pending");
  const approved = skills.filter((s) => s.status === "approved");
  const rejected = skills.filter((s) => s.status === "rejected");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">管理后台</h1>
          </div>
          <p className="text-muted-foreground text-sm">审核新提交的 Skills</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchSkills}>
          <RefreshCw className="h-4 w-4 mr-1" />
          刷新
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground py-12">加载中...</p>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900">
                {pending.length} 待审核
              </Badge>
            </h2>
            {pending.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                暂无待审核的 Skill
              </p>
            ) : (
              pending.map((skill) => {
                return (
                  <SkillReviewCard
                    key={skill.id}
                    skill={skill}
                    onApprove={() => updateStatus(skill.slug, "approved")}
                    onReject={() => updateStatus(skill.slug, "rejected")}
                  />
                );
              })
            )}
          </div>

          <Separator />

          <div>
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Badge variant="outline" className="bg-green-100 dark:bg-green-900">
                {approved.length} 已通过
              </Badge>
            </h2>
            {approved.map((skill) => (
              <SkillInfoCard key={skill.id} skill={skill} />
            ))}
          </div>

          {rejected.length > 0 && (
            <>
              <Separator />
              <div>
                <h2 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-100 dark:bg-red-900">
                    {rejected.length} 已拒绝
                  </Badge>
                </h2>
                {rejected.map((skill) => (
                  <SkillInfoCard key={skill.id} skill={skill} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SkillReviewCard({
  skill,
  onApprove,
  onReject,
}: {
  skill: Skill;
  onApprove: () => void;
  onReject: () => void;
}) {
  const colorClass =
    CATEGORY_COLORS[skill.category as SkillCategory] || CATEGORY_COLORS.other;
  const label =
    CATEGORY_LABELS[skill.category as SkillCategory] || skill.category;

  return (
    <Card className="mb-3">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{skill.name}</h3>
              <Badge variant="secondary" className={colorClass}>
                {label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {skill.description}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" onClick={onApprove}>
              <Check className="h-4 w-4 mr-1" />
              通过
            </Button>
            <Button size="sm" variant="destructive" onClick={onReject}>
              <X className="h-4 w-4 mr-1" />
              拒绝
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {skill.author_name}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(skill.created_at).toLocaleDateString("zh-CN")}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap text-xs bg-muted rounded p-3 max-h-40 overflow-y-auto font-mono">
          {skill.full_content.slice(0, 500)}
          {skill.full_content.length > 500 && "..."}
        </pre>
      </CardContent>
    </Card>
  );
}

function SkillInfoCard({ skill }: { skill: Skill }) {
  const colorClass =
    CATEGORY_COLORS[skill.category as SkillCategory] || CATEGORY_COLORS.other;
  const label =
    CATEGORY_LABELS[skill.category as SkillCategory] || skill.category;

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50 text-sm">
      <div className="flex items-center gap-2">
        <span className="font-medium">{skill.name}</span>
        <Badge variant="secondary" className={`text-xs ${colorClass}`}>
          {label}
        </Badge>
        <span className="text-muted-foreground">by {skill.author_name}</span>
      </div>
      <span className="text-xs text-muted-foreground">
        {new Date(skill.created_at).toLocaleDateString("zh-CN")}
      </span>
    </div>
  );
}
