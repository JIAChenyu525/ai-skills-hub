export interface SkillData {
  id: string;
  slug: string;
  name: string;
  description: string;
  fullContent: string;
  category: SkillCategory;
  authorName: string;
  authorGithub: string | null;
  installCommand: string;
  repoUrl: string | null;
  version: string;
  status: "pending" | "approved" | "rejected";
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
}

export type SkillCategory = "paper" | "career" | "coding" | "exam" | "other";

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  paper: "论文写作",
  career: "求职就业",
  coding: "编程开发",
  exam: "考试备考",
  other: "其他",
};

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  paper: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  career: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  coding: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  exam: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

export interface SkillFormData {
  name: string;
  slug: string;
  description: string;
  fullContent: string;
  category: SkillCategory;
  authorName: string;
  authorGithub?: string;
  installCommand: string;
  repoUrl?: string;
}
