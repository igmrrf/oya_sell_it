import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Alert,
  TouchableOpacity,
} from "react-native";
import Screen from "../components/Screen";
import Swipeable from "react-native-gesture-handler/Swipeable";

const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"],
  },
];

const Item = ({ title, num, setNumAgain }) => (
  <Swipeable renderRightActions={setNumAgain("left", Number(num) + 1)}>
    <TouchableOpacity>
      <View style={styles.item}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  </Swipeable>
);

function TestScreen(props) {
  const [num, setNum] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const setNumHere = (side, num1) => {
    console.log(`This is the ${side} at number ${num1}`);
  };
  return (
    <Screen>
      <SectionList
        style={styles.container}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Item num={num} setNumAgain={setNumHere} title={item} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        refreshing={refreshing}
        onRefresh={() => console.log("Refreshing")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    backgroundColor: "skyblue",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    margin: 2,
    marginTop: 10,
    fontSize: 40,
    color: "yellow",
  },
});
export default TestScreen;
