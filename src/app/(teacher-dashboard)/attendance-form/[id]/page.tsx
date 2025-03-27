"use client";
import AttendanceForm from "@/components/Organisms/attendance-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ClassItem {
  id: number;
  subject: string;
  duration: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
}

export default function AttendanceFormPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [classItem, setClassItem] = useState<ClassItem | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classResponse = await fetch(`/api/classes/${params.id}`);
        if (!classResponse.ok) {
          throw new Error("Failed to fetch class data");
        }
        const classData = await classResponse.json();
        setClassItem(classData);

        // Fetch students data after class data is fetched
        const studentResponse = await fetch("/api/students");
        if (!studentResponse.ok) {
          throw new Error("Failed to fetch students data");
        }
        const studentData = await studentResponse.json();
        setStudents(studentData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-screen  min-h-screen p-6">
      <Button className="" onClick={() => router.push("/dashboard")}>
        <ArrowLeft size={28} />
      </Button>
      <div className="flex-col mt-8 flex items-center justify-center">
        <h1 className="text-4xl font-bold mb-2">{classItem?.subject}</h1>
        <div className="flex  text-lg gap-2 mb-5">
          <h2 className="font-medium">Duration</h2>
          <h2>{classItem?.duration}</h2>
        </div>
      </div>
      <AttendanceForm students={students} />
    </div>
  );
}
