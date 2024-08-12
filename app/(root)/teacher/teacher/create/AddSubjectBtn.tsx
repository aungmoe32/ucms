import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SubjectSelectForm } from "./SubjectSelectForm";
const AddSubjectBtn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Subject</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Subject</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <SubjectSelectForm></SubjectSelectForm>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubjectBtn;
