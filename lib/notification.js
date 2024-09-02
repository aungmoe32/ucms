function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**** START register-sw ****/
function registerServiceWorker() {
  return navigator.serviceWorker
    .register(process.env.NEXT_PUBLIC_URL + "/service-worker.js")
    .then(function (registration) {
      console.log("Service worker successfully registered.");
      return registration;
    })
    .catch(function (err) {
      console.error("Unable to register service worker.", err);
    });
}
/**** END register-sw ****/

// This is just to make sample code eaier to read.
// TODO: Move into a variable rather than register each time.
function getSWRegistration() {
  return navigator.serviceWorker.register(process.env.NEXT_PUBLIC_URL + "/service-worker.js");
}

/**** START request-permission ****/
function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(function (permissionResult) {
    if (permissionResult !== "granted") {
      throw new Error("We weren't granted permission.");
    }
  });
}
/**** END request-permission ****/

/**
 * Using `Notification.permission` directly can be slow (locks on the main
 * thread). Using the permission API with a fallback to
 * `Notification.permission` is preferable.
 * @return {Promise<String>} Returns a promise that resolves to a notification
 * permission state string.
 */
/**** START get-permission-state ****/
function getNotificationPermissionState() {
  if (navigator.permissions) {
    return navigator.permissions
      .query({ name: "notifications" })
      .then((result) => {
        return result.state;
      });
  }

  return new Promise((resolve) => {
    resolve(Notification.permission);
  });
}
/**** END get-permission-state ****/

function unsubscribeUserFromPush(pushCheckbox) {
  return registerServiceWorker()
    .then(function (registration) {
      // Service worker is active so now we can subscribe the user.
      return registration.pushManager.getSubscription();
    })
    .then(function (subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .then(function (subscription) {
      pushCheckbox.disabled = false;
      pushCheckbox.checked = false;
    })
    .catch(function (err) {
      console.error("Failed to subscribe the user.", err);
      getNotificationPermissionState().then((permissionState) => {
        pushCheckbox.disabled = permissionState === "denied";
        pushCheckbox.checked = false;
      });
    });
}

/**** START send-subscription-to-server ****/
async function sendSubscriptionToBackEnd(subscription) {
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_URL + "/api/notifications/save-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });
    // const d = await data.json();
    // console.log(d);
    // return d;
  } catch (e) {
    console.error(e);
  }
}
/**** END send-subscription-to-server ****/

/**** START subscribe-user ****/
function subscribeUserToPush() {
  return getSWRegistration()
    .then(function (registration) {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_PUBLIC_KEY
        ),
      };

      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function (pushSubscription) {
      console.log(
        "Received PushSubscription: ",
        JSON.stringify(pushSubscription)
      );
      return pushSubscription;
    });
}
/**** END subscribe-user ****/

export const sendPush = async (pushContent) => {
  return fetch("/api/notifications/trigger-push/", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(pushContent),
  });
};

export const setUpPush = async (pushCheckbox) => {
  return Promise.all([
    registerServiceWorker(),
    getNotificationPermissionState(),
  ])
    .then(function (results) {
      const registration = results[0];
      const currentPermissionState = results[1];

      if (currentPermissionState === "denied") {
        console.warn(
          "The notification permission has been blocked. Nothing we can do."
        );
        pushCheckbox.disabled = true;
        return;
      }

      pushCheckbox.addEventListener("change", function (event) {
        // Disable UI until we've handled what to do.
        event.target.disabled = true;

        if (event.target.checked) {
          // Just been checked meaning we need to subscribe the user
          // Do we need to wait for permission?
          let promiseChain = Promise.resolve();
          if (currentPermissionState !== "granted") {
            promiseChain = askPermission();
          }

          promiseChain
            .then(subscribeUserToPush)
            .then(function (subscription) {
              if (subscription) {
                return sendSubscriptionToBackEnd(subscription).then(
                  function () {
                    return subscription;
                  }
                );
              }

              return subscription;
            })
            .then(function (subscription) {
              // We got a subscription AND it was sent to our backend,
              // re-enable our UI and set up state.
              pushCheckbox.disabled = false;
              pushCheckbox.checked = subscription !== null;
            })
            .catch(function (err) {
              console.error("Failed to subscribe the user.", err);

              // An error occured while requestion permission, getting a
              // subscription or sending it to our backend. Re-set state.
              pushCheckbox.disabled = currentPermissionState === "denied";
              pushCheckbox.checked = false;
            });
        } else {
          // Just been unchecked meaning we need to unsubscribe the user
          unsubscribeUserFromPush(pushCheckbox);
        }
      });

      if (currentPermissionState !== "granted") {
        // If permission isn't granted than we can't be subscribed for Push.
        pushCheckbox.disabled = false;
        return;
      }

      return registration.pushManager
        .getSubscription()
        .then(function (subscription) {
          pushCheckbox.checked = subscription !== null;
          pushCheckbox.disabled = false;
        });
    })
    .catch(function (err) {
      console.log("Unable to register the service worker: " + err);
    });
};
