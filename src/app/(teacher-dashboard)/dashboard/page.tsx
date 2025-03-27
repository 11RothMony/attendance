"use client";
import ClassList from "@/components/molecules/card-class-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [teacherName] = useState("Tith");
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [classes, setClasses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch classes data from JSON Server
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("/api/classes");

        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="max-w-screen min-h-screen flex-col bg-[#fff] justify-center">
      <div className="container mx-auto p-6">
        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome, {teacherName}</h1>
          <p className="text-muted-foreground text-md">
            {user?.email} Manage your classes and students
          </p>
        </div>
        <div className="mt-2 space-y-10">
          <Card className="flex items-center justify-between">
            <CardHeader className=" flex-col items-center gap-5">
              <CardTitle className="text-xl font-medium">
                Total Classes
              </CardTitle>
              <div className="text-2xl font-bold">{classes.length}</div>
            </CardHeader>
            <CardContent>
              <Users size={40} />
            </CardContent>
          </Card>
          <ClassList classes={classes} />
        </div>
      </div>
    </div>
  );
}
