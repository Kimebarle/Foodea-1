import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import {
  dummyData,
  icons,
  images,
  COLORS,
  SIZES,
  constants,
  FONTS,
} from "../../../constants";
import { Header } from "../../components/FoodeaComponents";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BASE_URL } from "../../../api/context/auth/config";
import AuthContext from "../../../api/context/auth/AuthContext";
import axios from "axios";
const MyCartScreen = ({ navigation }) => {
  const { userId } = useContext(AuthContext);
  const [id, setId] = React.useState();
  const [itemId, setItemId] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [cartData, setCartData] = React.useState();

  const getCart = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}carts?customer_id[eq]=${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRestaurant = async () => {
    try {
      const response = await axios.get(`${BASE_URL}restaurants`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updatedCartList = useCallback(async () => {
    setIsLoading(true);
    const cartData = await getCart();
    const restaurantData = await getRestaurant();

    const cartList = [...cartData];
    const restaurantList = [...restaurantData];

    const matchingShops = cartList
      .map((item) => item.restaurant_id)
      .filter((shopId, index, self) => self.indexOf(shopId) === index)
      .map((shopId) =>
        restaurantList.find((shop) => shop.merchant_id === shopId)
      );

    setCartData(matchingShops);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      updatedCartList();
    }, [])
  );

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"My Cart"}
        leftComponent={
          // Open Custom Drawer
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.backarrow}
              style={{
                borderRadius: SIZES.radius,
                color: COLORS.gray2,
              }}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <View
            style={{
              width: 40,
            }}
          ></View>
        }
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        height: SIZES.height,
        width: SIZES.width,
      }}
    >
      {renderHeader()}

      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={isLoading ? dummyData.my_cart : cartData}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  marginTop: SIZES.radius,
                }}
                onPress={() => {
                  setItemId(item.merchant_id);
                  console.log(item.merchant_id);
                  navigation.navigate("CartScreen", {
                    restaurantID: item.merchant_id,
                  });
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignSelf: "center",
                    justifyContent: "center",
                    width: "90%",
                    height: 100,
                    backgroundColor: COLORS.lightGray2,
                    flexDirection: "row",
                    marginTop: SIZES.base,
                    borderRadius: SIZES.radius,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ marginRight: SIZES.base }}>
                      <Text
                        style={{
                          ...FONTS.h3,
                          marginBottom: 5,
                          color: COLORS.primary,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text style={{ ...FONTS.h5 }}>
                        {item.quantity} item • {item.time} mins •{" "}
                        {item.distance} km
                      </Text>
                    </View>
                  </View>

                  <Image
                    source={item.icon}
                    style={{
                      height: 80,
                      width: 80,
                      alignSelf: "center",
                      marginLeft: 40,
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({});
