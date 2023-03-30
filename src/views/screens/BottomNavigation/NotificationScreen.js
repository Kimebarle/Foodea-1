import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { BASE_URL } from "../../../api/context/auth/config";
import axios from "axios";

const NotificationScreen = () => {
  const [vouchers, setVouchers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getVouchers();
  }, []);

  const getVouchers = async () => {
    setIsLoading(true);
    const response = await axios.get(`${BASE_URL}vouchers`);
    setVouchers(response.data);
    setIsLoading(false);
    // console.log(response.data);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        height: SIZES.height,
        width: SIZES.width,
      }}
    >
      {/* {renderHeader()} */}
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Notification"}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            marginLeft: SIZES.padding,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
            }}
          >
            Notifications
          </Text>
        </View>
        <FlatList
          data={isLoading ? constants.messages : vouchers}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity disabled>
                <View
                  style={{
                    flex: 1,
                    alignSelf: "center",
                    justifyContent: "center",
                    width: "90%",
                    height: "100%",
                    padding: SIZES.padding,
                    backgroundColor: COLORS.lightGray2,
                    flexDirection: "row",
                    marginTop: SIZES.base,
                    borderRadius: SIZES.radius,
                  }}
                >
                  <Image
                    source={require("../../../../assets/img/icons/coupon.png")}
                    style={{
                      height: 40,
                      width: 40,
                      tintColor: COLORS.primary,
                      marginTop: SIZES.radius,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: SIZES.radius,
                    }}
                  >
                    <View style={{ marginLeft: SIZES.padding }}>
                      <Text
                        style={{
                          ...FONTS.h3,
                          marginBottom: 5,
                          color: COLORS.primary,
                        }}
                      >
                        {item.voucher_name}
                      </Text>
                      <Text style={{ ...FONTS.h5 }}>{item.description}</Text>
                    </View>

                    <View
                      style={{
                        position: "absolute",
                        right: 10,
                      }}
                    >
                      <Text style={{ ...FONTS.h4 }}>{item.voucher_code}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      right: 10,
                    }}
                  >
                    <Text style={{ ...FONTS.h4 }}>{item.discount} %</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
