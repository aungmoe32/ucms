import { db } from "@/lib/drizzle/db";
import { semesters, students, teachers, users } from "@/lib/drizzle/schema";

const page = async () => {
  // const user = await db.insert(users).values({
  //   name: "hacker",
  //   email: "student@gmail.com",
  //   password: "1234",
  //   major: "IT",
  //   role: "student",
  // });
  // await db.insert(semesters).values({
  //   year: "2",
  //   major: "IT",
  //   term: "First",
  // });
  // await db.insert(students).values({
  //   year: "2",
  //   semesterId: "4b0b4c19-fcff-4015-bd22-878bf01b16ee",
  //   userId: "42a1855b-b9a9-4443-b2cc-550845af325d",
  // });
  // console.log(user);
  // await db.insert(teachers).values({
  //   year: "2",
  //   semesterId: "4b0b4c19-fcff-4015-bd22-878bf01b16ee",
  //   userId: "42a1855b-b9a9-4443-b2cc-550845af325d",
  // });

  const users = await db.query.teachers.findMany({
    with: {
      user: true,
      teacher_semester: {
        columns: {},
        with: {
          semester: true,
        },
      },
    },
  });
  console.log(users[0].teacher_semester);
  return <div></div>;
};

export default page;
