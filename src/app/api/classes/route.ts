import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const dataFilePath = path.join(process.cwd(), "data", "classes.json");

type Class = {
  id: number;
  subject: string;
  totalStudents: number;
  teacherId: string | number;
  duration: string;
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

// GET all classes
export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.classes);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}

// POST new class
export async function POST(request: Request) {
  try {
    const newClass: Class = await request.json();
    const data = await readData();

    // Generate new ID
    const newId = Math.max(...data.classes.map((s: Class) => s.id)) + 1;
    newClass.id = newId;

    data.classes.push(newClass);
    await writeData(data);

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create class" },
      { status: 500 }
    );
  }
}
