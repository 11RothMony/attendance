import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const dataFilePath = path.join(process.cwd(), "data", "students.json");

type Student = {
  id: number;
  name: string;
  classId: number;
};

async function readData() {
  const jsonData = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(jsonData);
}

async function writeData(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

// GET single student
export async function GET(request: Request, { params }: any) {
  try {
    const data = await readData();
    const student = data.students.find(
      (s: Student) => s.id === Number(params.id)
    );

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

// UPDATE student
export async function PUT(request: Request, { params }: any) {
  try {
    const updatedData: Partial<Student> = await request.json();
    const data = await readData();
    const index = data.students.findIndex(
      (s: Student) => s.id === Number(params.id)
    );

    if (index === -1) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    data.students[index] = { ...data.students[index], ...updatedData };
    await writeData(data);

    return NextResponse.json(data.students[index]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

// DELETE student
export async function DELETE(request: Request, { params }: any) {
  try {
    const data = await readData();
    const initialLength = data.students.length;
    data.students = data.students.filter(
      (s: Student) => s.id !== Number(params.id)
    );

    if (data.students.length === initialLength) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    await writeData(data);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
