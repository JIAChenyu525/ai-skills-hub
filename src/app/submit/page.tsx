"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_LABELS, type SkillCategory } from "@/types";
import { Send } from "lucide-react";

export default function SubmitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    full_content: "",
    category: "other" as SkillCategory,
    author_name: "",
    author_github: "",
    install_command: "",
    repo_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("skills").insert({
        ...form,
        status: "pending",
        downloads: 0,
        version: "1.0.0",
        author_github: form.author_github || null,
        repo_url: form.repo_url || null,
      });

      if (error) {
        if (error.code === "23505") {
          alert("Slug 已存在，请换一个。");
        } else {
          alert("提交失败：" + error.message);
        }
      } else {
        router.push("/?submitted=1");
      }
    } catch {
      alert("提交失败，请检查网络");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">提交新 Skill</h1>
        <p className="text-muted-foreground">
          分享你的 AI Skill 给更多人使用。提交后会进入审核流程。
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-semibold">Skill 信息</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">名称 *</label>
                <Input
                  required
                  placeholder="如：论文写作助手"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug *</label>
                <Input
                  required
                  placeholder="如：paper-writer"
                  value={form.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  URL 友好的英文标识，只能包含小写字母和连字符
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">分类 *</label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    updateField("category", v as SkillCategory)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">作者 *</label>
                <Input
                  required
                  placeholder="你的名字或昵称"
                  value={form.author_name}
                  onChange={(e) => updateField("author_name", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">简短描述 *</label>
              <Textarea
                required
                placeholder="用一两句话描述这个 skill 能做什么..."
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                SKILL.md 完整内容 *
              </label>
              <Textarea
                required
                placeholder="粘贴完整的 SKILL.md 内容..."
                value={form.full_content}
                onChange={(e) => updateField("full_content", e.target.value)}
                rows={10}
                className="font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">安装命令 *</label>
                <Input
                  required
                  placeholder="如：git clone https://..."
                  value={form.install_command}
                  onChange={(e) =>
                    updateField("install_command", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub 仓库</label>
                <Input
                  placeholder="https://github.com/..."
                  value={form.repo_url}
                  onChange={(e) => updateField("repo_url", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub 用户名</label>
              <Input
                placeholder="选填"
                value={form.author_github}
                onChange={(e) => updateField("author_github", e.target.value)}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              {loading ? "提交中..." : "提交审核"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
