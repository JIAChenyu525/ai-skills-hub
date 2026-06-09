import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || undefined;
    const status = searchParams.get("status") || "approved";

    let dbQuery = supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: false });

    if (status !== "all") {
      dbQuery = dbQuery.eq("status", status);
    }

    if (query) {
      dbQuery = dbQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`);
    }

    if (category && category !== "all") {
      dbQuery = dbQuery.eq("category", category);
    }

    const { data, error } = await dbQuery;

    if (error) throw error;

    return NextResponse.json(data);
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
      "full_content",
      "category",
      "author_name",
      "install_command",
    ];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const { data, error } = await supabase
      .from("skills")
      .insert({
        slug: body.slug,
        name: body.name,
        description: body.description,
        full_content: body.full_content,
        category: body.category,
        author_name: body.author_name,
        author_github: body.author_github || null,
        install_command: body.install_command,
        repo_url: body.repo_url || null,
        status: "pending",
        downloads: 0,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Slug already exists" },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("POST /api/skills error:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
