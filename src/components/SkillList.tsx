"use client";

import { useState, useMemo } from "react";
import { SkillCard } from "@/components/SkillCard";
import { SearchBar } from "@/components/SearchBar";
import { SkillCategory } from "@/types";
import { Puzzle } from "lucide-react";

interface SkillItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  authorName: string;
  downloads: number;
}

interface SkillListProps {
  skills: SkillItem[];
}

export function SkillList({ skills }: SkillListProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SkillCategory | "all">("all");

  const filtered = useMemo(() => {
    return skills.filter((skill) => {
      const matchesQuery =
        !query ||
        skill.name.toLowerCase().includes(query.toLowerCase()) ||
        skill.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || skill.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [skills, query, category]);

  if (skills.length === 0) {
    return (
      <div className="text-center py-20">
        <Puzzle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-semibold mb-2">还没有 Skills</h2>
        <p className="text-muted-foreground mb-4">
          成为第一个贡献者，提交你的 AI Skill！
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center mb-8">
        <SearchBar onSearch={setQuery} onCategoryChange={setCategory} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          没有找到匹配的 skills，试试换个关键词或分类。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <SkillCard key={skill.slug} {...skill} />
          ))}
        </div>
      )}
    </div>
  );
}
