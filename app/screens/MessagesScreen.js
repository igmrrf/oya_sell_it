import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeperator from "../components/ListItemSeperator";
import DeleteAction from "../components/DeleteAction";

const initialMessages = [
  {
    id: 1,
    title:
      "How did the dog meet the goat on the bridge given that they left a day after each other",
    description:
      "How did the dog meet the goat on the bridge given that they left a day after each other",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/mosh.jpg"),
  },
];

function MessagesScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [refressing, setRefressing] = useState(false);

  const handleDelete = (message) => {
    const newMessages = messages.filter((m) => m.id !== message.id);
    setMessages(newMessages);
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subtitle={item.description}
            image={item.image}
            onPress={() => console.log(item.title)}
            renderRightActions={() => (
              <DeleteAction onPress={() => console.log("Working sss")} />
            )}
            renderLeftActions={() => (
              <DeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refressing}
        onRefresh={() => setMessages(initialMessages)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
