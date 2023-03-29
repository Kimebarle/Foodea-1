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
import { Header, LoadingAsset } from "../../components/FoodeaComponents";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BASE_URL } from "../../../api/context/auth/config";
import AuthContext from "../../../api/context/auth/AuthContext";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

const MyCartScreen = ({ navigation }) => {
  const { userId } = useContext(AuthContext);
  const [id, setId] = React.useState();
  const [itemId, setItemId] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [cartData, setCartData] = React.useState();
  const [itemLength, setItemLength] = React.useState(false);
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

    const matchingShopIds = cartList
      .map((item) => item.restaurant_id)
      .filter((shopId, index, self) => self.indexOf(shopId) === index)
      .map((shopId) => {
        const matchingShop = restaurantList.find(
          (shop) => shop.merchant_id === shopId
        );
        const matchingCartItems = cartList.filter(
          (cartItem) => cartItem.restaurant_id === shopId
        );
        const totalItems = matchingCartItems.reduce(
          (acc, cur) => acc + cur.quantity,
          0
        );
        return { ...matchingShop, totalItems };
      });

    setCartData(matchingShopIds);
    setItemLength(matchingShopIds.length > 0);
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
      <Spinner visible={isLoading} />
      {renderHeader()}

      <View
        style={{
          flex: 1,
        }}
      >
        {itemLength ? (
          <FlatList
            data={cartData}
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
                          {item.business_name}
                        </Text>
                        <Text style={{ ...FONTS.h5 }}>
                          {item.totalItems} item • {item.time} mins •{" "}
                        </Text>
                      </View>
                    </View>

                    <Image
                      source={require("../../../../assets/img/images/kfc-logo-1.png")}
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
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingAsset
              containerStyle={{
                width: 250,
                height: 250,
              }}
              imageStyle={{
                width: "100%",
                height: "100%",
              }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({});
