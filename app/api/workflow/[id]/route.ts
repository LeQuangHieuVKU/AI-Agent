import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await getKindeServerSession();
    const user = await session?.getUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const workflow = await prisma.workflow.findFirst({
      where: { id, userId: user.id },
    });

    if (!workflow) {
      return NextResponse.json(
        { error: "Workflow not found" },
        { status: 404 },
      );
    }

    const flowObject = JSON.parse(workflow.flowObject);
    return NextResponse.json({
      success: true,
      data: {
        id: workflow.id,
        name: workflow.name,
        flowObject: flowObject,
      },
    });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch workflows",
      },
      { status: 500 },
    );
  }
}
