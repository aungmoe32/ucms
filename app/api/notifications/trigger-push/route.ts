import {
  getSubscriptionsFromDatabase,
  triggerPushMsg,
} from "@/lib/server-noti";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const dataToSend = await request.json();

  const promises = [];

  const subscriptions = await getSubscriptionsFromDatabase();
  //   console.log(subscriptions);
  for (let i = 0; i < subscriptions.length; i++) {
    const subscription = subscriptions[i];
    promises.push(triggerPushMsg(subscription, JSON.stringify(dataToSend)));
  }
  await Promise.all(promises);

  return NextResponse.json({ id: 1 });
}
