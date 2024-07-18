import Table from "@/components/Table";
import { getEvents } from "@/lib/calendar";

export default async function Home() {
  const items = await getEvents();
  // console.log(items);
  return <Table events={items}></Table>;
}
