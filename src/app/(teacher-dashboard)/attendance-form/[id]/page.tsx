"use client";
import AttendanceForm from "@/components/Organisms/attendance-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@phosphor-icons/react";
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
    <div className="container max-h-screen mx-auto p-6">
      <Button onClick={() => router.push("/dashboard")} size={"sm"}>
        <ArrowLeft size={16} />
      </Button>
      <div className="flex-col mt-8 flex items-center justify-center">
        <h1 className="text-4xl font-bold mb-2">{classItem?.subject}</h1>
        <div className="flex gap-2 mb-5">
          <h2 className="font-medium">Duration</h2>
          <h2>{classItem?.duration}</h2>
        </div>
      </div>
      <AttendanceForm students={students} />
    </div>
  );
}
