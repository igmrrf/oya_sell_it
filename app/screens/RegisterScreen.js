import React, { useState } from "react";
import Screen from "../components/Screen";
import { Image, StyleSheet } from "react-native";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import * as Yup from "yup";
import usersApi from "../api/users";
import useAuth from "../hooks/useAuth";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Passsword"),
});

function RegisterScreen(props) {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);

  const { logIn } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (userInfo) => {
    await registerApi.request(userInfo);
    if (registerApi.error) {
      if (registerApi.data) setError(registerApi.data.error);
      else setError("An unexpected error occurred");
      return;
    }

    await loginApi.request(userInfo.email, user.password);
    if (loginApi.error) {
      if (loginApi.data) setError(loginApi.data.error);
      else setError("An unexpected error occurred");
      return;
    }
    logIn(loginApi.data);
  };

  return (
    <React.Fragment>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />

      <Screen style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />

        <AppForm
          validationSchema={validationSchema}
          initialValues={{ email: "", password: "", name: "" }}
          onSubmit={handleSubmit}
        >
          <ErrorMessage
            error={error}
            visible={registerApi.error || loginApi.error}
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="mobile"
            name="name"
            placeholder="name"
            textContentType="name"
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
          <SubmitButton title="Register" />
        </AppForm>
      </Screen>
    </React.Fragment>
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

export default RegisterScreen;
