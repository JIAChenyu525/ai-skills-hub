"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORY_LABELS, type SkillCategory } from "@/types";
import { Send, FileText, Sparkles } from "lucide-react";

export default function SubmitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", slug: "", description: "", full_content: "",
    category: "other" as SkillCategory, author_name: "",
    author_github: "", install_command: "", repo_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("skills").insert({
        ...form, status: "pending", downloads: 0, version: "1.0.0",
        author_github: form.author_github || null, repo_url: form.repo_url || null,
      });
      if (error) {
        alert(error.code === "23505" ? "Slug 已存在，请换一个。" : "提交失败：" + error.message);
      } else {
        router.push("/?submitted=1");
      }
    } catch { alert("提交失败，请检查网络"); }
    finally { setLoading(false); }
  };

  const updateField = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl animate-fade-in">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold shadow-[2px_2px_0px_rgba(108,92,231,0.08)]">
          <Sparkles className="h-3.5 w-3.5" />
          贡献你的第一个 Skill
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">提交新 Skill</h1>
        <p className="text-muted-foreground">分享你的 AI Skill，让更多学生用上它。</p>
      </div>

      {/* Form card */}
      <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_rgba(26,26,46,0.06)]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">名称 <span className="text-accent">*</span></label>
              <Input required placeholder="如：论文写作助手" value={form.name} onChange={e => updateField("name", e.target.value)}
                className="h-11 rounded-xl border-2 border-border bg-muted focus-visible:border-primary focus-visible:ring-0 transition-colors" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Slug <span className="text-accent">*</span></label>
              <Input required placeholder="如：paper-writer" value={form.slug} onChange={e => updateField("slug", e.target.value)}
                className="h-11 rounded-xl border-2 border-border bg-muted focus-visible:border-primary focus-visible:ring-0 transition-colors font-mono" />
              <p className="text-xs text-muted-foreground">URL 标识，只能用小写字母和连字符</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">分类 <span className="text-accent">*</span></label>
              <Select value={form.category} onValueChange={v => updateField("category", v as SkillCategory)}>
                <SelectTrigger className="h-11 rounded-xl border-2 border-border bg-muted focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {Object.entries(CATEGORY_LABELS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">作者 <span className="text-accent">*</span></label>
              <Input required placeholder="你的名字或昵称" value={form.author_name} onChange={e => updateField("author_name", e.target.value)}
                className="h-11 rounded-xl border-2 border-border bg-muted focus-visible:border-primary focus-visible:ring-0 transition-colors" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold">简短描述 <span className="text-accent">*</span></label>
            <Textarea required placeholder="用一两句话描述这个 skill 能做什么..." value={form.description} onChange={e => updateField("description", e.target.value)}
              rows={2} className="rounded-xl border-2 border-border bg-muted focus-visible:border-primary focus-visible:ring-0 transition-colors" />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              SKILL.md 完整内容 <span className="text-accent">*</span>
            </label>
            <Textarea required placeholder="粘贴完整的 SKILL.md 内容..." value={form.full_content} onChange={e => updateField("full_content", e.target.value)}
              rows={10} className="font-mono text-sm rounded-xl border-2 border-border bg-muted focus-visible:border-primary focus-visible:ring-0 transition-colors" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">安装命令 <span className="text-accent">*</span></label>
              <Input required placeholder="git clone https://..." value={form.install_command} onChange={e => updateField("install_command", e.target.value)}
                className="h-11 rounded-xl border-2 border-border bg-muted focus-visible:border-primary focus-visible:ring-0 transition-colors font-mono text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">GitHub 仓库</label>
              <Input placeholder="https://github.com/..." value={form.repo_url} onChange={e => updateField("repo_url", e.target.value)}
                className="h-11 rounded-xl border-2 border-border bg-muted focus-visible:border-primary focus-visible:ring-0 transition-colors" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold">GitHub 用户名</label>
            <Input placeholder="选填" value={form.author_github} onChange={e => updateField("author_github", e.target.value)}
              className="h-11 rounded-xl border-2 border-border bg-muted focus-visible:border-primary focus-visible:ring-0 transition-colors" />
          </div>

          <Button type="submit" disabled={loading}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-[3px_3px_0px_rgba(108,92,231,0.3)] hover:shadow-[5px_5px_0px_rgba(108,92,231,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150">
            <Send className="h-4 w-4 mr-2" />
            {loading ? "提交中..." : "提交审核"}
          </Button>
        </form>
      </div>
    </div>
  );
}
