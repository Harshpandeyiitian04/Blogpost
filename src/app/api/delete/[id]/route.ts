import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id);
  if (!Number.isFinite(id))
    return NextResponse.json(
      { error: "Valid numeric ID required" },
      { status: 400 }
    );

  try {
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (e: any) {
    if (e.code === "P2025")
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    console.error("DELETE /api/delete error:", e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
};
