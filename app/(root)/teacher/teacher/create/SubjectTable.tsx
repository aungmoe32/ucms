import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AddSubjectBtn from "./AddSubjectBtn";

const SubjectTable = () => {
  return (
    <div>
      <div className="flex justify-between">
        <FormLabel className="text-lg font-semibold">
          Teaching Subjects
        </FormLabel>

        <AddSubjectBtn></AddSubjectBtn>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Major</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Semester Term</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>IT</TableCell>
            <TableCell>Second</TableCell>
            <TableCell>Second</TableCell>
            <TableCell>DLD</TableCell>
            <TableCell>
              <Button className="text-white bg-red-500" type={"button"}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SubjectTable;
