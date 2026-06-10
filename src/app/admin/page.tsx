"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CATEGORY_LABELS, CATEGORY_COLORS, type Skill, type SkillCategory } from "@/types";
import { Check, X, RefreshCw, Shield, User, Calendar, Clock, ThumbsUp } from "lucide-react";

export default function AdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    setLoading(true);
    const { data } = await supabase.from("skills").select("*").order("created_at", { ascending: false });
    setSkills(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchSkills(); }, []);

  const updateStatus = async (slug: string, status: "approved" | "rejected") => {
    const { error } = await supabase.from("skills").update({ status }).eq("slug", slug);
    if (error) { alert("操作失败：" + error.message); }
    else { setSkills(prev => prev.map(s => s.slug === slug ? { ...s, status } : s)); }
  };

  const pending = skills.filter(s => s.status === "pending");
  const approved = skills.filter(s => s.status === "approved");
  const rejected = skills.filter(s => s.status === "rejected");

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-[3px_3px_0px_rgba(108,92,231,0.1)]">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">管理后台</h1>
          </div>
          <p className="text-muted-foreground text-sm ml-12">审核新提交的 Skills</p>
        </div>
        <button onClick={fetchSkills}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-border text-sm font-semibold hover:bg-muted hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 shadow-[2px_2px_0px_rgba(26,26,46,0.04)]">
          <RefreshCw className="h-4 w-4" />刷新
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 mx-auto mb-3 rounded-2xl border-2 border-primary/20 border-t-primary animate-spin" />
          <p className="text-muted-foreground text-sm">加载中...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Pending */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="font-bold text-lg">{pending.length} 个待审核</h2>
            </div>
            {pending.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 bg-card border-2 border-dashed border-border rounded-2xl text-center">暂无待审核的 Skill 🎉</p>
            ) : (
              <div className="space-y-3">
                {pending.map(skill => {
                  const colorClass = CATEGORY_COLORS[skill.category as SkillCategory] || CATEGORY_COLORS.other;
                  const label = CATEGORY_LABELS[skill.category as SkillCategory] || skill.category;
                  return (
                    <div key={skill.id} className="bg-card border-2 border-border rounded-2xl p-5 shadow-[3px_3px_0px_rgba(26,26,46,0.04)]">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{skill.name}</h3>
                            <Badge className={`text-xs ${colorClass}`}>{label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{skill.description}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><User className="h-3 w-3" />{skill.author_name}</span>
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(skill.created_at).toLocaleDateString("zh-CN")}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => updateStatus(skill.slug, "approved")}
                            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-[2px_2px_0px_rgba(108,92,231,0.3)] hover:shadow-[4px_4px_0px_rgba(108,92,231,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all">
                            <Check className="h-3.5 w-3.5" />通过
                          </button>
                          <button onClick={() => updateStatus(skill.slug, "rejected")}
                            className="flex items-center gap-1 px-3.5 py-2 rounded-xl border-2 border-border text-sm font-semibold hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-all">
                            <X className="h-3.5 w-3.5" />拒绝
                          </button>
                        </div>
                      </div>
                      <pre className="text-xs bg-muted rounded-xl p-3 max-h-32 overflow-y-auto font-mono whitespace-pre-wrap">
                        {skill.full_content.slice(0, 400)}{skill.full_content.length > 400 && "..."}
                      </pre>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Separator />

          {/* Approved */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="font-bold text-lg">{approved.length} 个已通过</h2>
            </div>
            <div className="divide-y divide-border bg-card border-2 border-border rounded-2xl shadow-[3px_3px_0px_rgba(26,26,46,0.04)] overflow-hidden">
              {approved.map(skill => {
                const colorClass = CATEGORY_COLORS[skill.category as SkillCategory] || CATEGORY_COLORS.other;
                const label = CATEGORY_LABELS[skill.category as SkillCategory] || skill.category;
                return (
                  <div key={skill.id} className="flex items-center justify-between py-3 px-5 hover:bg-muted/50 transition-colors text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{skill.name}</span>
                      <Badge className={`text-xs ${colorClass}`}>{label}</Badge>
                      <span className="text-muted-foreground">by {skill.author_name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(skill.created_at).toLocaleDateString("zh-CN")}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
