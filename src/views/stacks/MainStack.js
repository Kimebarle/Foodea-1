import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  icons,
  SIZES,
  COLORS,
  dummyData,
  FONTS,
  images,
} from "../../constants";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TestScreen from "../screens/MainScreens/TestScreen";
import CartScreen from "../screens/BottomNavigation/CartScreen";
import FoodRecommendScreen from "../screens/BottomNavigation/FoodRecommendScreen";
import SearchScreen from "../screens/BottomNavigation/SearchScreen";
import FoodInfoScreen from "../screens/MainScreens/FoodInfoScreen";
import NotificationScreen from "../screens/BottomNavigation/NotificationScreen";
import CardPayment from "../screens/PaymentScreens/CardPayment";
import CheckOut from "../screens/Cart Screens/CheckOut";
import AddCard from "../screens/PaymentScreens/AddCard";
import Success from "../screens/Cart Screens/Success";
import DeliveryStatus from "../screens/Delivery/DeliveryStatus";
import Map from "../screens/Delivery/Map";
import MyAvatar from "../screens/InfoScreens/MyAvatar";
import EditProfile from "../screens/InfoScreens/EditProfile";
import ActivityLog from "../screens/BottomNavigation/ActivityLog";
import AccountScreen from "../screens/MainScreens/AccountScreen";
import HomeScreen from "../screens/MainScreens/HomeScreen";
import UserDetails from "../screens/InfoScreens/UserDetails";
import AnotherOrder from "../screens/Delivery/AnotherOrder";
import Favorite from "../screens/InfoScreens/Favorite";
import Address from "../screens/InfoScreens/Address";
import MyCartScreen from "../screens/BottomNavigation/MyCartScreen";
import Names from "../screens/InfoScreens/Names";
import HeightWeight from "../screens/InfoScreens/HeightWeight";
import EmailPhoneNumber from "../screens/InfoScreens/EmailPhoneNumber";
import Password from "../screens/InfoScreens/Password";
import EditNames from "../screens/InfoScreens/EditNames";
import EditHeightWeight from "../screens/InfoScreens/EditHeightWeight";
import EditEmailPhone from "../screens/InfoScreens/EditEmailPhone";
import EditFirstName from "../screens/InfoScreens/EditFirstName";
import AddressDisplay from "../screens/InfoScreens/AddressDisplay";
import EditAddress from "../screens/InfoScreens/EditAddress";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// bottom tab
const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={TestScreen}
        options={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#F54748" : COLORS.gray2,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
              
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Recommend"
        component={FoodRecommendScreen}
        options={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={icons.Restaurant}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#F54748" : COLORS.gray2,
                }}
              />
              <Text
                style={{
                  color: focused ? "#F54748" : COLORS.gray2,
                  fontSize: 12,
                  textAlign: "center",
                }}
              ></Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={icons.notification}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#F54748" : COLORS.gray2,
                }}
              />
              <Text
                style={{
                  color: focused ? "#F54748" : COLORS.gray2,
                  fontSize: 12,
                  textAlign: "center",
                }}
              ></Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={MyCartScreen}
        options={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={icons.cart}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#F54748" : COLORS.gray2,
                }}
              />
              <Text
                style={{
                  color: focused ? "#F54748" : COLORS.gray2,
                  fontSize: 12,
                  textAlign: "center",
                }}
              ></Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main Screen

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* nested Screen */}
      <Stack.Screen name={"BottomTab"} component={BottomNavigation} />
      <Stack.Screen name="FoodInfo" component={FoodInfoScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="CardPayment" component={CardPayment} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="DeliveryStatus"
        component={DeliveryStatus}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="ActivityLog" component={ActivityLog} />
      <Stack.Screen name="MyAvatar" component={MyAvatar} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="AnotherOrder" component={AnotherOrder} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Names" component={Names} />
      <Stack.Screen name="HeightWeight" component={HeightWeight} />
      <Stack.Screen name="EmailPhoneNumber" component={EmailPhoneNumber} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="EditNames" component={EditNames} />
      <Stack.Screen name="EditHeightWeight" component={EditHeightWeight} />
      <Stack.Screen name="EditEmailPhone" component={EditEmailPhone} />
      <Stack.Screen name="EditFirstName" component={EditFirstName} />
      <Stack.Screen name="AddressDisplay" component={AddressDisplay} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      
    </Stack.Navigator>
  );
};

export default MainStack;
