import { BASE_URL } from "./config";
import axios from "axios";
import { useState, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "./AuthContext";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const [food, setFood] = React.useState({});
  const [cart, setCart] = React.useState({});

  const allFood = ({ userId }) => {
    try {
      axios.get(`${BASE_URL}foods?product_id[eq]=${userId}`);
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cartInfo = async ({}) => {
    try {
      const response = axios.get(`${BASE_URL}carts?customer_id[eq]=` + id);
      setFood(response);
      console.log(food);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransactionContext.Provider value={{ cartInfo, allFood }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
