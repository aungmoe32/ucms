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

const EventTypeSwitcher = ({ eventType, setEventType, eventTypes }) => {

    return (
        <div>

            <Select
                defaultValue={eventType.id}
                onValueChange={(id) => {
                    // console.log(
                    //   id,
                    //   teacher_subjects.find((ts: any) => ts.subject.semester.id == id)
                    //     .subject.semester
                    // );
                    if (id == "0") {
                        setEventType({ name: "All", id: "0" })
                        return
                    }
                    setEventType(eventTypes.find((et) => et.id == id));
                }}
            >
                <SelectTrigger className="">
                    <SelectValue placeholder="Select Event Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Event Type</SelectLabel>
                        <SelectItem value={"0"}>All</SelectItem>
                        {eventTypes.map((et: any) => (
                            <SelectItem key={et.id} value={et.id}>
                                {et.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    )
}

export default EventTypeSwitcher