import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingScreen from "../screens/ListingScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createNativeStackNavigator();
const FeedNavigator = () => (
  <Stack.Navigator screen={{ gestureEnabled: true }}>
    <Stack.Screen name="Feeds" component={ListingScreen} />
    <Stack.Screen
      name="ListingDetails"
      options={{ title: "Details" }}
      component={ListingDetailsScreen}
    />
  </Stack.Navigator>
);
export default FeedNavigator;
