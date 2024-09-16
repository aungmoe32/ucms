import webpush from "web-push";
import { db } from "../drizzle/db";
import { noti_semester, noti_subscriptions } from "../drizzle/schema";
import { eq, inArray } from "drizzle-orm";

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

webpush.setVapidDetails(
  "mailto:aungmoemyintthu@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export const saveSubscriptionToDatabase = async (subscription, semesterId) => {
  const noti = await db
    .insert(noti_subscriptions)
    .values({
      value: subscription,
    })
    .returning({
      id: noti_subscriptions.id,
    });
  // console.log(noti, semesterId);
  // const notiSemester = await db
  //   .insert(noti_semester)
  //   .values({
  //     semester_id: semesterId,
  //     noti_id: noti[0].id,
  //   })
  //   .returning({
  //     id: noti_semester.id,
  //   });
  return noti;
};

function getSubscriptionList() {
  return fetch("/api/get-subscriptions/", {
    method: "POST",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid response from server.");
      }
      return response.json();
    })
    .then((response) => {
      const subscriptions = response.data.subscriptions;
      const tableBody = document.querySelector(".js-subscriber-table-body");
      subscriptions.forEach((subscription) => {
        const row = document.createElement("tr");

        const idCol = document.createElement("td");
        idCol.textContent = subscription.id;
        row.appendChild(idCol);

        const endpointCol = document.createElement("td");
        endpointCol.textContent = subscription.endpoint;
        endpointCol.classList.add("endpoint");
        row.appendChild(endpointCol);

        tableBody.appendChild(row);
      });

      return subscriptions.length;
    });
}

export const getSubscriptionsFromDatabase = async () => {
  const subs = await db.query.noti_subscriptions.findMany({
    columns: {
      id: true,
      value: true,
    },
  });
  return subs;
};

export const triggerPushMsg = async function (subscription, dataToSend) {
  //   console.log(subscription);
  return webpush
    .sendNotification(subscription.value, dataToSend)
    .catch((err) => {
      if (err.statusCode === 410) {
        return deleteSubscriptionFromDatabase(subscription.id);
      } else {
        console.log("Subscription is no longer valid: ", err);
      }
    });
};

async function deleteSubscriptionFromDatabase(subscriptionId) {
  const notiSub = await db.query.noti_subscriptions.findFirst({
    where: (tb, funcs) => funcs.eq(tb.id, subscriptionId),
    with: {
      noti_semester: true,
    },
  });

  // console.log("hack", notiSub);
  if (!notiSub) return;

  const notiSems = notiSub.noti_semester.map((ns) => ns.id);

  // console.log(notiSems);

  await db.delete(noti_semester).where(inArray(noti_semester.id, notiSems));
  await db
    .delete(noti_subscriptions)
    .where(eq(noti_subscriptions.id, subscriptionId));
}

export const sendPush = async (dataToSend, subscriptions) => {
  const promises = [];
  // dataToSend.icon = "http://image.ibb.co/frYOFd/tmlogo.png";
  dataToSend.icon = "/images/Hmawbi-logo.png";

  // const subscriptions = await getSubscriptionsFromDatabase();
  for (let i = 0; i < subscriptions.length; i++) {
    const subscription = subscriptions[i];
    promises.push(triggerPushMsg(subscription, JSON.stringify(dataToSend)));
  }
  await Promise.all(promises);
};
