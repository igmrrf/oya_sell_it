import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Icon from "../Icon";
import { default as defaultStyles } from "../../config/styles";

function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {/* {icon && (
        <MaterialCommunityIcons
          style={styles.icon}
          name={icon}
          size={20}
          color={colors.medium}
        />
      )} */}
      {icon && (
        <Icon
          name="email"
          backgroundColor="white"
          iconColor={defaultStyles.colors.medium}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        clearButtonMode="always"
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
