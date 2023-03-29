import { useContext } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./views/stacks/AuthStack";
import MainStack from "./views/stacks/MainStack";
import AuthContext from "./api/context/auth/AuthContext";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

export default function App() {
  const { logged_in, setLogged_in, setUser, setUserId, setUserInfo } =
    useContext(AuthContext);

  useEffect(() => {
    SecureStore.getItemAsync("user").then((response) => {
      let user = JSON.parse(response);
      if (user) {
        setUser(user);
        setLogged_in(true);
        setUserId(user.user_id);
        setUserInfo(user);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {logged_in ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
