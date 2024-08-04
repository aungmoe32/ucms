import Datastore from "@seald-io/nedb";
import webpush from "web-push";

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

webpush.setVapidDetails(
  "mailto:aungmoemyintthu@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const db = new Datastore({
  filename: "subscription-store.db",
  //   autoload: true,
});

db.loadDatabase();

export const saveSubscriptionToDatabase = (subscription) => {
  return new Promise(function (resolve, reject) {
    db.insert(subscription, function (err, newDoc) {
      if (err) {
        reject(err);
        return;
      }

      resolve(newDoc._id);
    });
  });
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
  return new Promise(function (resolve, reject) {
    db.find({}, function (err, docs) {
      if (err) {
        reject(err);
        return;
      }

      resolve(docs);
    });
  });
};

export const triggerPushMsg = async function (subscription, dataToSend) {
  //   console.log(subscription);
  return webpush.sendNotification(subscription, dataToSend).catch((err) => {
    if (err.statusCode === 410) {
      return deleteSubscriptionFromDatabase(subscription._id);
    } else {
      console.log("Subscription is no longer valid: ", err);
    }
  });
};

function deleteSubscriptionFromDatabase(subscriptionId) {
  return new Promise(function (resolve, reject) {
    db.remove({ _id: subscriptionId }, {}, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
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
