import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Stack = createNativeStackNavigator();
const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={AccountScreen}
      options={{ gestureEnabled: true }}
    />
    <Stack.Screen
      options={{ gestureEnabled: true }}
      name="Messages"
      component={MessagesScreen}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
