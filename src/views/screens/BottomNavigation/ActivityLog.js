import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
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
  const { userId } = useContext(AuthContext);
  const [myActivityLogList, setMyActivityLogList] = React.useState(null);
  const [itemLength, setItemLength] = React.useState(true);

  const fetchOrder = async () => {
    if (userId === undefined) {
    } else {
      const response = await axios.get(
        `${BASE_URL}orders?customer_id[eq]=${userId}&status[eq]=Paid`
      );
      const data = response.data;
      setItemLength(response.data.length > 0);
      setMyActivityLogList(data);
    }

    //console.log(myActivityLogList);
  };

  useEffect(() => {
    fetchOrder();
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
            keyExtractor={(item, index) => {
              return index.toString();
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
                  <TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingBottom: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ ...FONTS.h3, width: 100 }}>
                        {item.date}{" "}
                      </Text>
                      {/* <Text style={{ ...FONTS.h3 }}>{item.time}</Text> */}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flexDirection: "column" }}>
                        <View style={{ flexDirection: "row", marginBottom: 5 }}>
                          <Image source={icons.Restaurant} />
                          <Text style={{ ...FONTS.h5 }}>
                            {item.product_details.product_name}
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
                          <Text style={{ ...FONTS.h5 }}> Celina Homes</Text>
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
                            {" "}
                            {item.product_details.price}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          top: 70,
                          left: 215,
                          flexDirection: "column",
                          position: "absolute",
                        }}
                      >
                        <TouchableOpacity onPress={() => {}}>
                          <Image source={icons.delete_icon} style={{}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => {}}>
                          <Text
                            style={{
                              ...FONTS.h3,
                              fontSize: 12,
                              color: COLORS.primary,
                            }}
                          >
                            Order Again
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <View style={{
            flex: 1,
            alignSelf: "center",
            justifyContent: "center",
          }}>
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
