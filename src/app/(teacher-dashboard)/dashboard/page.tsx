"use client";
import ClassList from "@/components/molecules/card-class-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [teacherName] = useState("Tith");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [classes, setClasses] = useState([]);
  const router = useRouter();

  // Fetch classes data from JSON Server
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:3001/classes");
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);
  console.log(classes);
  return (
    <div className="max-w-screen h-screen flex-col bg-[#fff] justify-center">
      <div className="container mx-auto p-6">
        <Button onClick={() => router.push("/auth")} size={"sm"}>
          <ArrowLeft size={16} />
        </Button>
        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome, {teacherName}</h1>
          <p className="text-muted-foreground">
            {email} Manage your classes and students
          </p>
        </div>
        <div className="mt-2 space-y-10">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Classes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classes.length}</div>
            </CardContent>
          </Card>
          <ClassList classes={classes} />
        </div>
      </div>
    </div>
  );
}
