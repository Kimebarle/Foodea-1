import { useContext } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./views/stacks/AuthStack";
import MainStack from "./views/stacks/MainStack";
import AuthContext from "./api/context/auth/AuthContext";

export default function App() {
  const { logged_in } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/* <MainStack /> */}
      <AuthStack />
      {/* {logged_in ? <MainStack /> : <AuthStack />} */}
    </NavigationContainer>
  );
}
