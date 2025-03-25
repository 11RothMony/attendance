import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const dataFilePath = path.join(process.cwd(), "data", "users.json");

type Teacher = {
  id: number;
  name: string;
};

// Helper function to read data
async function readData() {
  const jsonData = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(jsonData);
}

// Helper function to write data
async function writeData(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

// GET all teachers
export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.teachers);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 }
    );
  }
}

// POST new teacher
export async function POST(request: Request) {
  try {
    const newTeacher: Teacher = await request.json();
    const data = await readData();

    // Generate new ID
    const newId = Math.max(...data.teachers.map((s: Teacher) => s.id)) + 1;
    newTeacher.id = newId;

    data.teachers.push(newTeacher);
    await writeData(data);

    return NextResponse.json(newTeacher, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create teacher" },
      { status: 500 }
    );
  }
}
