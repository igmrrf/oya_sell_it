const requestPermisson = async () => {
  // const result = await Permissions.askAsync(
  //   Permissions.CAMERA,
  //   Permissions.LOCATION_BACKGROUND
  // );
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!granted) alert("You need to enable permission to access the library");
};
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused
            ? "ios-information-circle"
            : "ios-information-circle-outline";
        } else if (route.name === "Settings") {
          iconName = focused ? "ios-list-box" : "ios-list";
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={Tweets} />
    <Tab.Screen name="Settings" component={Account} />
  </Tab.Navigator>
);
import React from "react";
import { Text } from "react-native";
import Screen from "./app/components/Screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { AppButton } from "./app/components/forms";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Link = () => {
  const navigation = useNavigation();
  return (
    <AppButton
      title="Back to Tweets"
      onPress={() => navigation.navigate("Tweets")}
    />
  );
};

const Tweets = ({ navigation }) => (
  <Screen>
    <Text>Tweets</Text>
    <AppButton
      title="View Tweet Details"
      onPress={() =>
        navigation.navigate("Tweet Details", { title: "Tweet Info" })
      }
    />
  </Screen>
);
const TweetDetails = ({ navigation, route }) => (
  <Screen>
    <Text> {route.params.title}</Text>
    <Link />
  </Screen>
);
const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Tweets"
    screenOptions={{
      headerStyle: { backgroundColor: "tomato" },
      headerTintColor: "white",
    }}
  >
    <Stack.Screen name="Tweets" component={Tweets} />
    <Stack.Screen name="Tweet Details" component={TweetDetails} />
  </Stack.Navigator>
);

const FeedNavigator = () => (
  <Stack.Navigator
    initialRouteName="Tweets"
    screenOptions={{
      headerStyle: { backgroundColor: "tomato" },
      headerTintColor: "white",
    }}
  >
    <Stack.Screen
      name="Tweets"
      component={Tweets}
      options={{ tabBarLabel: "Homing" }}
    />
    <Stack.Screen name="Tweet Details" component={TweetDetails} />
  </Stack.Navigator>
);

const Account = () => (
  <Screen>
    <Text>Account </Text>
  </Screen>
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveBackgroundColor: "#eee",
      tabBarActiveTintColor: "tomato",
      tabBarInactiveBackgroundColor: "#eee",
      tabBarInactiveTintColor: "#bbb",
      headerShown: false,
    }}
  >
    <Tab.Screen
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
      name="Home"
      component={FeedNavigator}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="send" size={size} color={color} />
        ),
      }}
      name="Payments"
      component={FeedNavigator}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="chart-pie" size={size} color={color} />
        ),
      }}
      name="Budget"
      component={FeedNavigator}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="credit-card"
            size={size}
            color={color}
          />
        ),
      }}
      name="Cards"
      component={FeedNavigator}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="cog" size={size} color={color} />
        ),
      }}
      name="Profile"
      component={Account}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
const listings = [
  {
    id: 1,
    title: "Red Jacket For Sale",
    price: 100,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 200,
    image: require("../assets/couch.jpg"),
  },
];
NetInfo.fetch().then((state) => {
  console.log("Connection Type", state.type);
  console.log("Is Connected", state.isConnected);
  console.log(state);
});

NetInfo.addEventListener((NetInfo) => console.log(NetInfo));

// ENDPOINTS and response
// auth 
// email & password
// if error return {error: message}

//APP NAVIGATOR
import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListEditScreen from "../screens/ListEditScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import { NONE } from "apisauce";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [registered, setRegistered] = useState(false);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
      console.log(token);
      if (token) setRegistered(true);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const schedulePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got amail",
        body: "Here is the notification body",
        data: { data: "goes her" },
      },
      trigger: { seconds: 2 },
    });
  };

  useEffect(() => {
    registerForPushNotifications();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notifcation) =>
        setNotification(notifcation)
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log(response)
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    if (registered) schedulePushNotification();
  }, [registered]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Listings"
        component={FeedNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ListingEdit"
        component={ListEditScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.LISTING_EDIT)}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
