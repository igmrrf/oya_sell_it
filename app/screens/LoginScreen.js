import React from "react";
import Screen from "../components/Screen";
import { Image, StyleSheet } from "react-native";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import * as Yup from "yup";
import authApi from "../api/auth";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Passsword"),
});

function LoginScreen(props) {
  const loginApi = useApi(authApi.login);

  const { logIn } = useAuth();

  const handleSubmit = async ({ email, password }) => {
    await loginApi.request(email, password);
    logIn(loginApi.data);
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />

      <AppForm
        validationSchema={validationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        <ErrorMessage
          error={"Invalid email or/and password"}
          visible={loginApi.error}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          keyBoardType="email-address"
          icon="email"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize={"none"}
          autoCorrect={false}
          icon="lock"
          placeholder="Password"
          secureTextEntry
          name="password"
          textContentType="password"
        />
        <SubmitButton title="login" />
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
