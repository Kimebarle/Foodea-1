import React, { useState, createContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { BASE_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [logged_in, setLogged_in] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userId, setUserId] = React.useState();
  const register = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}app_users`, {
        firstname: data[0].firstname,
        middlename: data[0].middlename,
        lastname: data[0].lastname,
        weight: data[0].weight,
        height: data[0].height,
        gender: data[0].gender,
        address: data[0].address,
        age: data[0].age,
        contact_number: data[0].phone,
        bmi: data[0].bmi,
        email: data[0].email,
        password: data[0].password,
        lifestyle: data[0].lifestyle,
        preferences: data[0].preferences,
      });
      console.log(response.data);
      setUserId(response.data.user_id);
      Alert.alert("Successfully ", "Registered", [
        {
          text: "Confirm",
          onPress: () => {
            setLogged_in(true);
          },
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.log(error);
      console.log(
        data[0].firstname,
        data[0].firstname,
        data[0].lastname,
        data[0].weight,
        data[0].height,
        data[0].gender,
        data[0].address,
        data[0].age,
        data[0].phone,
        data[0].bmi,
        data[0].email,
        data[0].password,
        data[0].lifestyle,
        data[0].preferences
      );
    }
  };

  const login = async (email, password, remember = false) => {
    try {
      const response = await axios.get(
        `${BASE_URL}app_users?email[eq]=` + email
      );
      if (response.data.length > 0) {
        if (response.data[0].password == password) {
          let id = response.data[0].user_id;
          AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          setUserId(id);

          SecureStore.setItemAsync(
            "user",
            JSON.stringify(response.data.length > 0)
          );
          SecureStore.setItemAsync(
            "userId",
            JSON.stringify(response.data[0].user_id)
          );
          console.log(remember);

          setLogged_in(true);
          setUserId(id);

          if (remember) {
            SecureStore.setItemAsync("user", JSON.stringify(response.data[0]));
            SecureStore.setItemAsync(
              "userId",
              JSON.stringify(response.data[0].user_id)
            );
            setUserId(response.data[0].user_id);
            SecureStore.setItemAsync("logged_in", "true");
            console.log(remember);
          }
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
        setUser,
        userInfo,
        login,
        logout,
        user,
        logged_in,
        register,
        addToCart,
        setLogged_in,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
