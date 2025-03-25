import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const dataFilePath = path.join(process.cwd(), "data", "users.json");

type User = {
  id: number;
  email: string;
  password: number;
};

// Helper function to read data
async function readData() {
  if (!fs.existsSync(dataFilePath)) {
    return { notFound: true };
  }
  const jsonData = await fs.readFileSync(dataFilePath, "utf8");

  return JSON.parse(jsonData);
}

// Helper function to write data
async function writeData(data: any) {
  await fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// GET all users
export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.users);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST new user
export async function POST(request: Request) {
  try {
    const newUser: User = await request.json();
    const data = await readData();

    // Generate new ID
    const newId = Math.max(...data.users.map((s: User) => s.id)) + 1;
    newUser.id = newId;

    data.users.push(newUser);
    await writeData(data);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
