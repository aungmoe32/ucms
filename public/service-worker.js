async function handlePushEvent(event) {
  const data = event.data.json();
  registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
  });
}

self.addEventListener("push", function (event) {
  event.waitUntil(handlePushEvent(event));
});

const doSomething = () => {
  return Promise.resolve();
};

// This is here just to highlight the simple version of notification click.
// Normally you would only have one notification click listener.
/**** START simpleNotification ****/
self.addEventListener("notificationclick", function (event) {
  const clickedNotification = event.notification;
  clickedNotification.close();

  // Do something as the result of the notification click
  const promiseChain = doSomething();
  event.waitUntil(promiseChain);
});
/**** END simpleNotification ****/
