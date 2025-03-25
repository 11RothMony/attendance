import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const dataFilePath = path.join(process.cwd(), "data", "students.json");

type Student = {
  id: number;
  name: string;
  classId: number;
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

// GET all students
export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.students);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

// POST new student
export async function POST(request: Request) {
  try {
    const newStudent: Student = await request.json();
    const data = await readData();

    // Generate new ID
    const newId = Math.max(...data.students.map((s: Student) => s.id)) + 1;
    newStudent.id = newId;

    data.students.push(newStudent);
    await writeData(data);

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}
