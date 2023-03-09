import React from "react";
import Routes from "./src/Routes";
import { AuthProvider } from "./src/api/context/auth/AuthContext";
import { useFonts } from "expo-font";
import { Provider as PaperProvider } from "react-native-paper";

const App = () => {
  let [fontsLoaded] = useFonts({
    "Poppins-Medium": require("./assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-Light": require("./assets/fonts/poppins/Poppins-Light.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/poppins/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;
