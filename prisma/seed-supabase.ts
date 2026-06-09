import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const PAPER_WRITER = `---
name: paper-writer
description: >-
  Use when the user asks for help writing, structuring, or revising an academic paper,
  thesis, graduation design report, literature review, proposal, or course paper.
  Activate on: 论文, 毕业设计, 毕设, 开题报告, 文献综述, 课程论文.
version: "2.0.0"
license: MIT
---

# 论文写作助手

引导大学生完成论文写作全流程，最终输出格式规范的 Word 文档。定位是写作教练，不是代写工具。

## 工作流程

### Step 1: 需求收集
先问清楚：论文类型、题目、字数要求、学科领域、格式要求、当前进度。

### Step 2: 结构拆解
根据论文类型和题目，生成论文大纲。每个章节标注建议字数和写作要点。

### Step 3: 逐段写作
每段 150-300 字，有中心句、展开论述、过渡衔接。每段提供 2 个版本供选择。

### Step 4: 图表生成
用 Python 生成柱状图、折线图、散点图等，嵌入论文。

### Step 5: 格式检查
对照格式规范逐项检查：字体、字号、行距、图表编号、参考文献格式。

### Step 6: 生成 Word 文档
运行 Python 脚本生成格式规范的 .docx 文件。`;

const LAB_REPORT = `---
name: lab-report
description: >-
  Use when the user needs to write, review, or format a lab report, experiment report,
  or course design report for science or engineering classes.
  Activate on: 实验报告, 实验数据, 课设报告, 实验分析, 数据处理.
version: "2.0.0"
license: MIT
---

# 实验报告助手

帮助理工科学生高效完成实验报告和课设报告。定位是实验分析教练。

## 工作流程

### Step 1: 信息收集
实验类型、课程名称、实验名称、字数要求、格式要求、当前进度。

### Step 2: 报告结构生成
生成大纲：实验目的、原理、仪器、步骤、数据与结果、分析与讨论、结论。

### Step 3: 数据处理与分析
数据整理、有效数字检查、误差分析、图表生成建议、数据解读。

### Step 4: 各部分撰写
实验原理、实验步骤、实验分析、实验结论——每部分有具体的写作指导。

### Step 5: 格式检查与润色
检查公式编号、图表标题、单位、有效数字、引用标注。

### Step 6: 生成 Word 文档
运行 Python 脚本生成 .docx 文件。`;

const RESUME_OPTIMIZER = `---
name: resume-optimizer
description: >-
  Use when the user needs to write, optimize, or tailor their resume for job applications,
  internships, or campus recruitment.
  Activate on: 简历, resume, 求职, 校招, 秋招, 春招, 实习, STAR法则.
version: "2.0.0"
license: MIT
---

# 简历优化助手

帮助大学生优化简历，让你的经历在 HR 眼里更有价值。定位是简历教练。

## 工作流程

### Step 1: 信息收集
目标岗位、JD 内容、现有简历、真实经历、简历用途。

### Step 2: JD 分析
拆解岗位要求：必须具备、优先具备、关键词提取。

### Step 3: 经历梳理与 STAR 包装
用 STAR 法则重写每段经历，把"做了什么"变成"做到了什么"。

### Step 4: 匹配度优化
关键词映射、经历排序、技能对标、量化补充。

### Step 5: 格式检查与最终优化
控制在一页、时间倒序、动词开头、量化数据、PDF 投递。

### Step 6: 生成 Word 简历
运行 Python 脚本生成格式规范的 .docx 简历。`;

const skills = [
  {
    slug: "paper-writer",
    name: "论文写作助手",
    description:
      "引导大学生完成论文写作全流程——从选题到大纲到逐段写作，最终输出格式规范的 Word 文档。支持本科毕设、硕士论文、课程论文、开题报告等多种类型。",
    full_content: PAPER_WRITER,
    category: "paper",
    author_name: "Student Skills",
    author_github: "JIAChenyu525",
    install_command:
      "git clone https://github.com/JIAChenyu525/Student-Skills.git && xcopy /E /I Student-Skills\\skills\\paper-writer %USERPROFILE%\\.claude\\skills\\paper-writer",
    repo_url: "https://github.com/JIAChenyu525/Student-Skills",
    version: "2.0.0",
    status: "approved",
    downloads: 128,
  },
  {
    slug: "lab-report",
    name: "实验报告助手",
    description:
      "帮助理工科学生高效完成实验报告和课设报告。覆盖数据处理、误差分析、三线表排版，支持物理、化学、电子、编程等多种实验类型。",
    full_content: LAB_REPORT,
    category: "paper",
    author_name: "Student Skills",
    author_github: "JIAChenyu525",
    install_command:
      "git clone https://github.com/JIAChenyu525/Student-Skills.git && xcopy /E /I Student-Skills\\skills\\lab-report %USERPROFILE%\\.claude\\skills\\lab-report",
    repo_url: "https://github.com/JIAChenyu525/Student-Skills",
    version: "2.0.0",
    status: "approved",
    downloads: 95,
  },
  {
    slug: "resume-optimizer",
    name: "简历优化助手",
    description:
      "帮助大学生用 STAR 法则优化简历，对照 JD 精准匹配关键词。支持秋招、春招、实习、考公等多种场景，输出格式规范的一页简历。",
    full_content: RESUME_OPTIMIZER,
    category: "career",
    author_name: "Student Skills",
    author_github: "JIAChenyu525",
    install_command:
      "git clone https://github.com/JIAChenyu525/Student-Skills.git && xcopy /E /I Student-Skills\\skills\\resume-optimizer %USERPROFILE%\\.claude\\skills\\resume-optimizer",
    repo_url: "https://github.com/JIAChenyu525/Student-Skills",
    version: "2.0.0",
    status: "approved",
    downloads: 156,
  },
];

async function main() {
  console.log("Seeding Supabase...");

  // Clear existing data
  const { error: delErr } = await supabase
    .from("skills")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) console.log("  (no existing data to clear)");

  for (const skill of skills) {
    const { error } = await supabase.from("skills").insert(skill);
    if (error) {
      console.error(`  ✗ ${skill.name}: ${error.message}`);
    } else {
      console.log(`  ✓ ${skill.name}`);
    }
  }

  console.log(`\n✅ Seeded ${skills.length} skills`);
}

main().catch(console.error);
