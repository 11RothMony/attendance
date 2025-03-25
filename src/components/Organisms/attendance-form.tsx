"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
import { CalendarCheck } from "@phosphor-icons/react";
import { useState } from "react";
import { useToast } from "../../../hooks/use-toast";

interface Student {
  id: number;
  name: string;
  email: string;
}

interface AttendanceFormProps {
  students: Student[];
}

export default function AttendanceForm({ students }: AttendanceFormProps) {
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      date: selectedDate,
      attendance: attendance,
    });

    toast({
      title: "Success",
      description: "Attendance recorded successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Date Picker */}
      <div className="flex gap-10">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                <CalendarCheck size={16} />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Present</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={attendance[student.id] || false}
                    onCheckedChange={(checked) =>
                      setAttendance((prev) => ({
                        ...prev,
                        [student.id]: checked as boolean,
                      }))
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <Button size={"sm"} type="submit">
          Update
        </Button>
      </div>
    </form>
  );
}
