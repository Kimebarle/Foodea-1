import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  dummyData,
  icons,
  images,
  COLORS,
  SIZES,
  constants,
  FONTS,
} from "../../../constants";
import { Header, LoadingActivity } from "../../components/FoodeaComponents";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";
import AuthContext from "../../../api/context/auth/AuthContext";

const ActivityLogScreen = ({ navigation }) => {
  const { userId, userInfo } = useContext(AuthContext);
  const [myActivityLogList, setMyActivityLogList] = React.useState(null);
  const [itemLength, setItemLength] = React.useState(true);
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [list1, setList1] = useState([]);

  const fetchOrder = async () => {
    if (userId === undefined) {
    } else {
      const response = await axios.get(
        `${BASE_URL}orders?customer_id[eq]=${userId}`
      );
      const data = response.data;
      const list = [...data];
      setItemLength(response.data.length > 0);
      setMyActivityLogList(data);
      // let price = 0;

      // const updatedList = list.forEach((item) => {
      //   // price += item.order_details.total;
      //   // item.forEach((item2) => {
      //   //   console.log(item2);
      //   // });
      //   let orderTotal = 0;
      //   for (let i = 0; i < item.order_details.length; i++) {
      //     orderTotal = orderTotal + item.order_details[i].total;
      //   }
      //   console.log(orderTotal);
      //   let newItem = { ...item, totalPrice: orderTotal };
      //   //setList1(newItem);
      //   // list.map((item) => ({
      //   //   ...item,
      //   //   totalPrice: orderTotal,
      //   // }));
      //   // const newItem = { ...item, totalPrice: orderTotal };
      //   // setList1(newItem);
      // });

      // console.log(list1);
      // const newList = list.map;
      // for (let i = 0; i < list[0].order_details[0].length; i++) {
      //   console.log(i);
      // }

      // console.log(price);
    }
  };

  const getData = async () => {
    const response = await axios.get(
      `${BASE_URL}app_users?customer_id[eq]=${userId}`
    );
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    fetchOrder();
    getData();
  }, []);

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Activity Log"}
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
        {itemLength ? (
          <FlatList
            data={myActivityLogList}
            keyExtractor={(item) => {
              `${item.order_key}`;
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignSelf: "center",
                    justifyContent: "center",
                    padding: SIZES.padding,
                    width: "90%",
                    height: "100%",
                    backgroundColor: COLORS.lightGray2,
                    flexDirection: "column",
                    marginTop: SIZES.radius,
                    borderRadius: SIZES.radius,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item.order_details);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        paddingBottom: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ ...FONTS.h3, width: 100 }}>
                        {item.order_details[0].date}{" "}
                        {/* {console.log(item.order_details[0].date)} */}
                      </Text>
                      {/* <Text style={{ ...FONTS.h3 }}>{item.time}</Text> */}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flexDirection: "column" }}>
                        <View style={{ flexDirection: "row", marginBottom: 5 }}>
                          <Image source={icons.Restaurant} />
                          <Text style={{ ...FONTS.h5 }}>
                            {
                              item.order_details[0].restaurant_details
                                .business_name
                            }
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 5 }}>
                          <Image
                            source={icons.location}
                            style={{
                              width: 22,
                              height: 22,
                              tintColor: COLORS.blue,
                            }}
                          />
                          <Text style={{ ...FONTS.h5 }}>
                            {" "}
                            {isLoading
                              ? "address"
                              : item.order_details[0].restaurant_details
                                  .address}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Image
                            source={icons.Payment}
                            style={{
                              width: 22,
                              height: 22,
                            }}
                          />
                          <Text style={{ ...FONTS.h5 }}>
                            ₱ {item.order_totalPrice}.00
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <LoadingActivity
              containerStyle={{
                width: 250,
                height: 250,
              }}
              imageStyle={{
                width: 170,
                height: 190,
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

export default ActivityLogScreen;

const styles = StyleSheet.create({});
