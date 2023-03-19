import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPageScreen from "../screens/AuthScreens/LandingPageScreen";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import SignUpScreen from "../screens/AuthScreens/SignUpScreen";
import Forgotpassword from "../screens/AuthScreens/Forgotpassword";
import EnterOTP from "../screens/AuthScreens/EnterOTP";
import Resetpassword from "../screens/AuthScreens/Resetpassword";
import SurveyScreen from "../screens/AuthScreens/SurveyScreen";
import Terms from "../screens/AuthScreens/Terms";
import SurveyScreenInitial from "../screens/AuthScreens/SurveyScreenInitial";
import SurveyCalories from "../screens/AuthScreens/SurveyCalories";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SurveyScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name={"LandingPageScreen"}
        component={LandingPageScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LoginScreen"
        component={LoginScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUpScreen"
        component={SignUpScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Forgotpassword"
        component={Forgotpassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EnterOTP"
        component={EnterOTP}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Resetpassword"
        component={Resetpassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SurveyScreen"
        component={SurveyScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Terms"
        component={Terms}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"SurveyScreenInitial"}
        component={SurveyScreenInitial}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"SurveyCalories"}
        component={SurveyCalories}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
