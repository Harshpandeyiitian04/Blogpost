import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { title, content } = body;

    const post = await prisma.blog.create({
      data: { title: title.trim(), content: content.trim() },
    });

    return NextResponse.json(
      { message: "Blog saved!", id: post.id },
      { status: 201 }
    );
  } catch (e: any) {
    if (e.name === "ZodError")
      return NextResponse.json(
        { error: "Invalid payload", details: e.errors },
        { status: 400 }
      );

    console.error("POST /api/create error:", e);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
};
