"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { SkillCategory, CATEGORY_LABELS } from "@/types";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: SkillCategory | "all") => void;
}

export function SearchBar({ onSearch, onCategoryChange }: SearchBarProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
      <div className="relative flex-1 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-20 group-focus-within:opacity-40 blur transition duration-300" />
        <div className="relative flex items-center">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索 skills..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
            className="pl-10 pr-4 h-12 rounded-2xl border-2 border-border bg-card text-base shadow-[3px_3px_0px_rgba(26,26,46,0.04)] focus-visible:ring-0 focus-visible:border-primary transition-all duration-200"
          />
        </div>
      </div>
      <Select onValueChange={(value) => onCategoryChange(value as SkillCategory | "all")} defaultValue="all">
        <SelectTrigger className="w-full sm:w-[170px] h-12 rounded-2xl border-2 border-border bg-card text-base shadow-[3px_3px_0px_rgba(26,26,46,0.04)] focus:ring-0">
          <SelectValue placeholder="分类筛选" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="all">🎯 全部分类</SelectItem>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <SelectItem key={key} value={key}>{label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
