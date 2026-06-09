"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索 skills..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          className="pl-9"
        />
      </div>
      <Select
        onValueChange={(value) =>
          onCategoryChange(value as SkillCategory | "all")
        }
        defaultValue="all"
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="分类筛选" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部分类</SelectItem>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
