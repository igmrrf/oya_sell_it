import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { AppButton } from "./forms";

function ActivityIndicator({ visible = false, reset }) {
  if (!visible) return null;
  const animation = useRef();
  const resetAnimation = () => {
    animation.current.reset();
    animation.current.play();
  };
  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../animations/loading.json")}
        ref={animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
    opacity: 0.5,
  },
});

export default ActivityIndicator;
