import React, { useState, useEffect, useRef } from "react";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigator/AuthNavigator";
import myTheme from "./app/navigator/navigationTheme";
import AppNavigator from "./app/navigator/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import { getUser } from "./app/auth/storage";
import { navigationRef } from "./app/navigator/rootNavigator";
import logger from "./app/utilities/logger";

logger.start();
export default function App() {
  logger.log(new Error("Error in app"));
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = () => {
    // const user = await getUser();
    // if (user)

    const user = { name: "Francis", email: "francis.igbiriki@gmail.com" };
    setUser(user);
  };
  useEffect(() => {
    restoreUser();
    console.log(user);
  }, []);

  // if (!isReady)
  //   return (
  //     <>
  //       <AppLoading
  //         startAsync={restoreUser}
  //         onFinish={() => setIsReady(true)}
  //         onError={console.warn}
  //       />
  //     </>
  //   );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={myTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
