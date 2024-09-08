import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SemesterSwitcher = ({ currSemester, setCurrSemester, semesters }) => {

    return (
        <div>

            <Select
                defaultValue={currSemester.id}
                onValueChange={(id) => {
                    // console.log(
                    //   id,
                    //   teacher_subjects.find((ts: any) => ts.subject.semester.id == id)
                    //     .subject.semester
                    // );
                    // if (id == "0") {
                    //     setEventType({ name: "All", id: "0" })
                    //     return
                    // }
                    setCurrSemester(semesters.find((sem) => sem.id == id));
                }}
            >
                <SelectTrigger className="">
                    <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select Semester</SelectLabel>
                        {/* <SelectItem value={"0"}>All</SelectItem> */}
                        {semesters.map((sem: any) => (
                            <SelectItem key={sem.id} value={sem.id}>
                                {`${sem.major} ${sem.year} ${sem.term} Semester`}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    )
}

export default SemesterSwitcher