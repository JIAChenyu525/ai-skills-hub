import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CATEGORY_COLORS, CATEGORY_LABELS, type SkillCategory } from "@/types";
import { Download, User, ArrowUpRight } from "lucide-react";

interface SkillCardProps {
  slug: string; name: string; description: string;
  category: string; authorName: string; downloads: number;
}

export function SkillCard({ slug, name, description, category, authorName, downloads }: SkillCardProps) {
  const colorClass = CATEGORY_COLORS[category as SkillCategory] || CATEGORY_COLORS.other;
  const label = CATEGORY_LABELS[category as SkillCategory] || category;

  return (
    <Link href={`/skill/${slug}`} className="group block">
      <div className="relative bg-card rounded-2xl border-2 border-border p-5 shadow-[4px_4px_0px_rgba(26,26,46,0.06)] hover:shadow-[6px_6px_0px_rgba(108,92,231,0.15)] hover:-translate-y-1 hover:border-primary/30 transition-all duration-200">
        {/* Top accent line */}
        <div className="absolute top-0 left-4 right-4 h-1 rounded-b-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
          <Badge variant="secondary" className={`shrink-0 text-xs font-semibold ${colorClass}`}>
            {label}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-3 w-3" />
            </div>
            {authorName}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Download className="h-3.5 w-3.5" />
            <span className="font-semibold text-foreground">{downloads}</span>
          </span>
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-4 right-4 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}
