import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

function NewListingButton({ onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          color={colors.white}
          size={35}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 80,
    width: 80,
    bottom: 20,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    borderColor: colors.white,
  },
});
export default NewListingButton;
