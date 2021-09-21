import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import Icon from "./Icon";
import { default as defaultStyles } from "../config/styles";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
import colors from "../config/colors";

function AppPicker({
  icon,
  items,
  numberOfColums = 1,
  onSelectItem,
  selectedItem,
  placeholder,
  width = "100%",
  PickerItemComponent = PickerItem,
}) {
  const [modalVisible, setmodalVisible] = useState(false);
  return (
    <React.Fragment>
      <TouchableWithoutFeedback onPress={() => setmodalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              style={styles.icon}
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            style={styles.icon}
            name={"chevron-down"}
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType={"slide"}>
        <Screen>
          <Button title={"Close"} onPress={() => setmodalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.label}
            numColumns={numberOfColums}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setmodalVisible(false), onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  text: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
});

export default AppPicker;
