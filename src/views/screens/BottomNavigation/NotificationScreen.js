import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ScrollView,
  Text,
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
import { Header, } from "../../components/FoodeaComponents";
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
                    alignSelf: 'center',
                    width: 330,
                    height: 80,
                    padding: SIZES.padding,
                    backgroundColor: COLORS.lightGray2,
                    marginTop: SIZES.base,
                    borderRadius: SIZES.radius,
                  }}
                >
                  <View style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                    <View style={{
                      position: 'absolute',
                      left: 10,
                    }}>
                      <Image
                        source={require("../../../../assets/img/icons/coupon.png")}
                        style={{
                          height: 40,
                          width: 40,
                          tintColor: COLORS.primary,
                          marginTop: SIZES.radius,
                        }}
                      />
                    </View>

                    <View style = {{
                      alignItems: 'center',
                    }}>
                        <Text
                          style={{
                            ...FONTS.h3,
                          }}
                        >
                          {item.voucher_name}
                        </Text>
                        <Text style={{ ...FONTS.h4, color: COLORS.primary }}>{item.voucher_code}</Text>
                        <Text style={{ ...FONTS.h5 }}>{item.description}</Text>
                    </View>

                    <View
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                      }}
                    >
                      <Text style={{ ...FONTS.h4 }}>{item.discount} %</Text>
                    </View>
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
