import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CATEGORY_COLORS, CATEGORY_LABELS, type SkillCategory } from "@/types";
import { ArrowRight, Download, User } from "lucide-react";

interface SkillCardProps {
  slug: string;
  name: string;
  description: string;
  category: string;
  authorName: string;
  downloads: number;
}

export function SkillCard({
  slug,
  name,
  description,
  category,
  authorName,
  downloads,
}: SkillCardProps) {
  const colorClass =
    CATEGORY_COLORS[category as SkillCategory] || CATEGORY_COLORS.other;
  const label =
    CATEGORY_LABELS[category as SkillCategory] || category;

  return (
    <Link href={`/skill/${slug}`}>
      <Card className="h-full hover:shadow-md hover:border-primary/50 transition-all duration-200 group">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
            <Badge variant="secondary" className={`shrink-0 ${colorClass}`}>
              {label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {authorName}
          </span>
          <span className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            {downloads}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
