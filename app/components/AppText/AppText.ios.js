import React from "react";
import { Text, StyleSheet } from "react-native";

function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: "Avenir",
  },
});

export default AppText;
// Incase you don't want to just separate styles
// but also behavior
