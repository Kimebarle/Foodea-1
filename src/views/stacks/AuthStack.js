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
import Mods from "../components/FoodeaComponents/Mods";
import Welcome from "../screens/AuthScreens/Welcome";
import SignupName from "../screens/AuthScreens/SignupName";
import PersonalInfo from "../screens/AuthScreens/PersonalInfo";
import Location from "../screens/AuthScreens/Location";
import Email from "../screens/AuthScreens/Email";
import Captcha from "../screens/AuthScreens/Captcha";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Mods"}
        component={Mods}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Welcome"}
        component={Welcome}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"SignupName"}
        component={SignupName}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"PersonalInfo"}
        component={PersonalInfo}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Location"}
        component={Location}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Email"}
        component={Email}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Captcha"}
        component={Captcha}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
