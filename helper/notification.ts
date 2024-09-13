export async function notification() {
  Notification.requestPermission().then(function (result) {
    console.log(result);
  });
}
