import { BASE_URL } from "./config";
import axios from "axios";

export const getFood = async () => {
  try {
    const response = await axios.get(`${BASE_URL}foods`);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async () => {
  try {
    const response = await axios.get(`${BASE_URL}foods`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFavorite = async () => {
  try {
    const response = await axios.get(`${BASE_URL}favorites`);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}app_users`);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async () => {
  try {
    const response = await axios.get(`${BASE_URL}orders`);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
