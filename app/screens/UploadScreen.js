import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import colors from "../config/colors";
import Lottieview from "lottie-react-native";

function UploadScreen({ progress = 0, visible = false, onDone }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <ProgressBar color={colors.primary} progress={progress} width={200} />
        ) : (
          <Lottieview
            onAnimationFinish={onDone}
            style={styles.animation}
            autoPlay
            loop={false}
            source={require("../animations/done.json")}
          />
        )}
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
export default UploadScreen;
