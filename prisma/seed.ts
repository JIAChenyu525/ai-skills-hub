import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: "file:./prisma/dev.db",
  }),
});

const PAPER_WRITER_CONTENT = `---
name: paper-writer
description: >-
  Use when the user asks for help writing, structuring, or revising an academic paper,
  thesis, graduation design report, literature review, proposal, or course paper.
  Activate on mentions of: 论文, 毕业设计, 毕设, 开题报告, 文献综述, 课程论文,
  文献检索, 参考文献, 查重, 降重, 论文格式, 论文大纲, paper outline.
  Do NOT activate for: code documentation, blog posts, creative writing, or exam prep.
version: "2.0.0"
license: MIT
user-invocable: true
allowed-tools: "Read Write Edit Glob Bash"
---

# 论文写作助手

引导大学生完成论文写作全流程，最终输出**格式规范的 Word 文档**。定位是**写作教练**，不是代写工具。

核心原则：帮你理清思路、优化表达、规范格式，但内容必须是你自己的。

## 工作流程

当用户提出论文相关需求时，按以下 6 步引导。**不要跳步，不要一次性输出整篇论文。**

### Step 1: 需求收集
先问清楚：论文类型、题目、字数要求、学科领域、格式要求、当前进度。

### Step 2: 结构拆解
根据论文类型和题目，生成论文大纲。每个章节标注建议字数和写作要点。

### Step 3: 逐段写作
每段150-300字，有中心句、展开论述、过渡衔接。每段提供2个版本供选择。

### Step 4: 图表生成
用 Python 生成柱状图、折线图、散点图等，嵌入论文。

### Step 5: 格式检查
对照格式规范逐项检查：字体、字号、行距、图表编号、参考文献格式。

### Step 6: 生成 Word 文档
运行 Python 脚本生成格式规范的 .docx 文件。`;

const LAB_REPORT_CONTENT = `---
name: lab-report
description: >-
  Use when the user needs to write, review, or format a lab report, experiment report,
  or course design report for science or engineering classes.
  Activate on mentions of: 实验报告, 实验数据, 课设报告, 实验分析, 数据处理,
  误差分析, 有效数字, 实验原理, 实验结果, 实验总结.
version: "2.0.0"
license: MIT
user-invocable: true
allowed-tools: "Read Write Edit Glob Bash"
---

# 实验报告助手

帮助理工科学生高效完成实验报告和课设报告。定位是**实验分析教练**，帮你从数据中得出结论，而不是帮你编数据。

## 工作流程

### Step 1: 信息收集
实验类型、课程名称、实验名称、字数要求、格式要求、当前进度。

### Step 2: 报告结构生成
根据实验类型生成报告大纲：实验目的、原理、仪器、步骤、数据与结果、分析与讨论、结论。

### Step 3: 数据处理与分析
数据整理、有效数字检查、误差分析、图表生成建议、数据解读。

### Step 4: 各部分撰写
实验原理、实验步骤、实验分析、实验结论——每部分有具体的写作指导。

### Step 5: 格式检查与润色
检查公式编号、图表标题、单位、有效数字、引用标注。

### Step 6: 生成 Word 文档
运行 Python 脚本生成 .docx 文件，包含三线表、居中图表和公式。`;

const RESUME_OPTIMIZER_CONTENT = `---
name: resume-optimizer
description: >-
  Use when the user needs to write, optimize, or tailor their resume for job applications,
  internships, or campus recruitment.
  Activate on mentions of: 简历, resume, 求职, 校招, 秋招, 春招, 实习, 面试准备,
  JD, 岗位描述, 简历优化, 简历修改, STAR法则.
version: "2.0.0"
license: MIT
user-invocable: true
allowed-tools: "Read Write Edit Glob Bash"
---

# 简历优化助手

帮助大学生优化简历，让你的经历在 HR 眼里更有价值。定位是**简历教练**，帮你包装真实经历，不是帮你编造经历。

## 工作流程

### Step 1: 信息收集
目标岗位、JD内容、现有简历、真实经历、简历用途。

### Step 2: JD 分析
拆解岗位要求：必须具备、优先具备、关键词提取。

### Step 3: 经历梳理与 STAR 包装
用 STAR 法则（Situation-Task-Action-Result）重写每段经历，把"做了什么"变成"做到了什么"。

### Step 4: 匹配度优化
关键词映射、经历排序、技能对标、量化补充。

### Step 5: 格式检查与最终优化
控制在一页、时间倒序、动词开头、量化数据、PDF投递。

### Step 6: 生成 Word 简历
运行 Python 脚本生成格式规范的 .docx 简历。`;

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.skill.deleteMany();

  const skills = [
    {
      slug: "paper-writer",
      name: "论文写作助手",
      description:
        "引导大学生完成论文写作全流程——从选题到大纲到逐段写作，最终输出格式规范的 Word 文档。支持本科毕设、硕士论文、课程论文、开题报告等多种类型。",
      fullContent: PAPER_WRITER_CONTENT,
      category: "paper",
      authorName: "Student Skills",
      authorGithub: "JIAChenyu525",
      installCommand:
        "git clone https://github.com/JIAChenyu525/Student-Skills.git && xcopy /E /I Student-Skills\\skills\\paper-writer %USERPROFILE%\\.claude\\skills\\paper-writer",
      repoUrl: "https://github.com/JIAChenyu525/Student-Skills",
      version: "2.0.0",
      status: "approved",
      downloads: 128,
    },
    {
      slug: "lab-report",
      name: "实验报告助手",
      description:
        "帮助理工科学生高效完成实验报告和课设报告。覆盖数据处理、误差分析、三线表排版，支持物理、化学、电子、编程等多种实验类型。",
      fullContent: LAB_REPORT_CONTENT,
      category: "paper",
      authorName: "Student Skills",
      authorGithub: "JIAChenyu525",
      installCommand:
        "git clone https://github.com/JIAChenyu525/Student-Skills.git && xcopy /E /I Student-Skills\\skills\\lab-report %USERPROFILE%\\.claude\\skills\\lab-report",
      repoUrl: "https://github.com/JIAChenyu525/Student-Skills",
      version: "2.0.0",
      status: "approved",
      downloads: 95,
    },
    {
      slug: "resume-optimizer",
      name: "简历优化助手",
      description:
        "帮助大学生用 STAR 法则优化简历，对照 JD 精准匹配关键词。支持秋招、春招、实习、考公等多种场景，输出格式规范的一页简历。",
      fullContent: RESUME_OPTIMIZER_CONTENT,
      category: "career",
      authorName: "Student Skills",
      authorGithub: "JIAChenyu525",
      installCommand:
        "git clone https://github.com/JIAChenyu525/Student-Skills.git && xcopy /E /I Student-Skills\\skills\\resume-optimizer %USERPROFILE%\\.claude\\skills\\resume-optimizer",
      repoUrl: "https://github.com/JIAChenyu525/Student-Skills",
      version: "2.0.0",
      status: "approved",
      downloads: 156,
    },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
    console.log(`  ✓ Created: ${skill.name}`);
  }

  console.log(`\n✅ Seeded ${skills.length} skills`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
