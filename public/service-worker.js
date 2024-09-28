async function handlePushEvent(event) {
  const data = event.data.json();
  registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    // actions : [
    //   { action: 'open_url', title: 'Open Website', icon: 'open-icon.png' },
    // ]
  });
}

self.addEventListener("push", function (event) {
  event.waitUntil(handlePushEvent(event));
});

const doSomething = async () => {
  return Promise.resolve();
};

self.addEventListener("notificationclick", function (event) {
  const clickedNotification = event.notification;
  clickedNotification.close();
  clients.openWindow("/timetable");

  // clients.matchAll({
  //   type  : "window"
  // }).then(clientList => {
  //   const client = clientList[0]
  //   if(client) client.navigate("http://192.168.100.33:3000/teacher/timetable")
  // })
  // const promiseChain = doSomething();
  // event.waitUntil(promiseChain);
});
