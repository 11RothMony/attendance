import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const dataFilePath = path.join(process.cwd(), "data", "classes.json");

type Classroom = {
  id: number;
  name: string;
  classId: number;
};

async function readData() {
  const jsonData = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(jsonData);
}

// GET single classroom
export async function GET(request: Request, { params }: any) {
  try {
    const data = await readData();
    const classroom = data.classes.find(
      (s: Classroom) => s.id === Number(params.id)
    );

    if (!classroom) {
      return NextResponse.json(
        { error: "classroom not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(classroom);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch classroom" },
      { status: 500 }
    );
  }
}
