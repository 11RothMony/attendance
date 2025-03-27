"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Class {
  id: number;
  subject: string;
  totalStudents: number;
}

interface ClassListProps {
  classes: Class[];
}

export default function ClassList({ classes }: ClassListProps) {
  const router = useRouter();

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {classes.map((classItem) => (
        <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">{classItem.subject}</CardTitle>
            <CardDescription className="text-lg">
              {classItem.totalStudents} Students Enrolled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push(`/attendance-form/${classItem.id}`)}
              className="w-full text-md h-11 cursor-pointer"
            >
              View Class
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
