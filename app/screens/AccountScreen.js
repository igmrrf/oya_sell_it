import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemSeperator from "../components/ListItemSeperator";
import useAuth from "../hooks/useAuth";

const menuItems = [
  {
    title: "My Listings",
    icon: { name: "format-list-bulleted", backgroundColor: colors.primary },
    targetScreen: "Listings",
  },
  {
    title: "My Messages",
    icon: { name: "email", backgroundColor: colors.secondary },
    targetScreen: "Messages",
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subtitle={user.email}
          image={require("../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          ItemSeparatorComponent={ListItemSeperator}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <View style={styles.container}>
        <ListItem
          title={"Logout"}
          onPress={logOut}
          IconComponent={<Icon name={"logout"} backgroundColor={"#ffe66d"} />}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
