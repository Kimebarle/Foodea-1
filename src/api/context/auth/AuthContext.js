import React, { useState, createContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { BASE_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// import { user_login } from "./user_api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [logged_in, setLogged_in] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userId, setUserId] = React.useState();

  const register = async (
    // firstname,
    // middlename,
    // lastname,
    // dummyHeight,
    // dummyWeight,
    // phone,
    // bmi,
    email,
    password
  ) => {
    const response = await axios.post(`${BASE_URL}app_users`, {
      firstname: "firstname",
      middlename: "middlename",
      lastname: "lastname",
      height: 100,
      weight: 50,
      gender: "M",
      address: "Test",
      contact_number: "1231231",
      bmi: 123,
      email: email,
      password: password,
    });
    setUserId(response.data.user_id);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.get(
        `${BASE_URL}app_users?email[eq]=` + email
      );
      if (response.data.length > 0) {
        if (response.data[0].password == password) {
          let id = response.data[0].user_id;
          AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          setUserId(id);
          setUserInfo(response.data);
          console.log(userId);
          setLogged_in(true);
        } else {
          Alert.alert("Error Login", "Wrong Password", [
            {
              text: "Confirm",
              onPress: () => console.log("Confirm"),
              style: "cancel",
            },
          ]);
        }
      } else {
        Alert.alert("Error Login", "Invalid Email", [
          {
            text: "Confirm",
            onPress: () => console.log("Confirm"),
            style: "cancel",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      console.log("An unexpected error occurred");
    }
  };

  const addToCart = async (
    userId,
    product_id,
    restaurant_id,
    quantity_product,
    total
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}carts`, {
        customer_id: userId,
        product_id: product_id,
        restaurant_id: restaurant_id,
        quantity: quantity_product,
        total: total,
        status: "pending",
        payment_type: "Cash",
      });
      console.log(response.status);
      console.log(userId, product_id, restaurant_id, quantity_product, total);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(false);
    setLogged_in(false);
    SecureStore.deleteItemAsync("user");
    SecureStore.deleteItemAsync("logged_in");
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        userInfo,
        login,
        logout,
        user,
        logged_in,
        register,
        addToCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
