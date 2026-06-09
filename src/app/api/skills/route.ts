import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || undefined;
    const status = searchParams.get("status") || "approved";

    const where: Record<string, unknown> = {};
    if (status !== "all") {
      where.status = status;
    }

    if (query) {
      where.OR = [
        { name: { contains: query } },
        { description: { contains: query } },
      ];
    }

    if (category && category !== "all") {
      where.category = category;
    }

    const skills = await prisma.skill.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error("GET /api/skills error:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = [
      "name",
      "slug",
      "description",
      "fullContent",
      "category",
      "authorName",
      "installCommand",
    ];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check slug uniqueness
    const existing = await prisma.skill.findUnique({
      where: { slug: body.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Slug already exists. Please choose a different slug." },
        { status: 409 }
      );
    }

    const skill = await prisma.skill.create({
      data: {
        slug: body.slug,
        name: body.name,
        description: body.description,
        fullContent: body.fullContent,
        category: body.category,
        authorName: body.authorName,
        authorGithub: body.authorGithub || null,
        installCommand: body.installCommand,
        repoUrl: body.repoUrl || null,
        status: "pending",
        downloads: 0,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("POST /api/skills error:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
