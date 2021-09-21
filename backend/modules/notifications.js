import { Expo } from "expo-server-sdk";

let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

let messages = [];

//checking that all push tokens appear valid
for (let pushToken of somePushTokens) {
  if (!Expo.isExpoPushToken(pushToken)) {
    console.log(`Push Token ${pushTokne} is not a valid Expo push token`);
    continue;
  }

  messages.push({
    to: pushToken,
    sound: "default",
    body: "This is a test notifcation",
    data: { withSome: "data" },
  });
}

let chunks = expo.chunkPushNotifications(messages);
let tickets = [];

(async () => {
  for (let chunk of chunks) {
    try {
      ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
})();

let receiptIds = [];
for (let ticket of tickets) {
  if (ticket.id) {
    receiptIds.push(ticket.id);
  }
}

let recieptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
(async () => {
  for (let chunk of receiptIdChunks) {
    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      for (let receiptId in receipts) {
        let { status, message, details } = receipts[receiptId];
        if (status === "ok") {
          continue;
        } else if (status === "error") {
          console.error(
            `There was an error sending a notification: ${message}`
          );
          if (details && details.error) {
            console.error(`The error code is ${details.error}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
})();
