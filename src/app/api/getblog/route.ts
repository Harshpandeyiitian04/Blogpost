import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      select: { id: true, title: true, content: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      { blogs },
      {
        status: 200,
        headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
      }
    );
  } catch (e) {
    console.error("GET /api/getblog error:", e);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
};
