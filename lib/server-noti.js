import webpush from "web-push";
import { db } from "./drizzle/db";
import { noti_subscriptions } from "./drizzle/schema";
import { eq } from "drizzle-orm";

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

webpush.setVapidDetails(
  "mailto:aungmoemyintthu@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export const saveSubscriptionToDatabase = async (subscription) => {
  const noti = await db
    .insert(noti_subscriptions)
    .values({
      value: subscription,
    })
    .returning({
      id: noti_subscriptions.id,
    });
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
  await db
    .delete(noti_subscriptions)
    .where(eq(noti_subscriptions.id, subscriptionId));
}

export const sendPush = async (dataToSend) => {
  const promises = [];

  const subscriptions = await getSubscriptionsFromDatabase();
  for (let i = 0; i < subscriptions.length; i++) {
    const subscription = subscriptions[i];
    promises.push(triggerPushMsg(subscription, JSON.stringify(dataToSend)));
  }
  await Promise.all(promises);
};
