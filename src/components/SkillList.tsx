"use client";

import { useState, useMemo } from "react";
import { SkillCard } from "@/components/SkillCard";
import { SearchBar } from "@/components/SearchBar";
import { SkillCategory } from "@/types";
import { Puzzle } from "lucide-react";

interface SkillItem {
  slug: string; name: string; description: string;
  category: string; author_name: string; downloads: number; likes: number;
}

interface SkillListProps { skills: SkillItem[] }

export function SkillList({ skills }: SkillListProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SkillCategory | "all">("all");

  const filtered = useMemo(() => {
    return skills.filter((skill) => {
      const matchesQuery = !query || skill.name.toLowerCase().includes(query.toLowerCase()) || skill.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || skill.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [skills, query, category]);

  if (skills.length === 0) {
    return (
      <div className="text-center py-24 animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center shadow-[4px_4px_0px_rgba(108,92,231,0.15)]">
          <Puzzle className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">还没有 Skills</h2>
        <p className="text-muted-foreground mb-6">成为第一个贡献者，提交你的 AI Skill！</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-center mb-10">
        <SearchBar onSearch={setQuery} onCategoryChange={setCategory} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">没有找到匹配的 skills，试试换个关键词或分类。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((skill, i) => (
            <div key={skill.slug} className="animate-slide-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}>
              <SkillCard key={skill.slug} slug={skill.slug} name={skill.name} description={skill.description} category={skill.category} authorName={skill.author_name} downloads={skill.downloads} likes={skill.likes} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
