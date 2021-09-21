import React, { useEffect } from "react";
import expoPushTokenApi from "../api/expoPushToken";
import * as Notifications from "expo-notifications";
import navigation from "../navigator/rootNavigator";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default useNotifications = (notificationListener) => {
  const registerForPushNotifications = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notifications");
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;

      await expoPushTokenApi.registerToken(token);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    registerForPushNotifications();
    if (notificationListener)
      Notifications.addNotificationReceivedListener(notificationListener);
  }, []);
};
