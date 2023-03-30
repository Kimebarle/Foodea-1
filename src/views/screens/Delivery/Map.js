import React, { useContext, useEffect } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  icons,
  SIZES,
  COLORS,
  dummyData,
  FONTS,
  images,
} from "../../../constants";
import {
  Header,
  IconButton,
  TextButton,
  CardItem,
  FooterTotal,
  LineDivider,
} from "../../components/FoodeaComponents";
import AuthContext from "../../../api/context/auth/AuthContext";
import { BASE_URL } from "../../../api/context/auth/config";
import axios from "axios";

const Map = ({ navigation }) => {
  const [currentStep, setCurrentStep] = React.useState(1);

  const { userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [next, setNext] = React.useState();
  const [userData, setUserData] = React.useState(null);

  const getUserData = async () => {
    setIsLoading(true);
    const response = await axios.get(`${BASE_URL}app_users/${userId}`);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserData();
  }, []);

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 90,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"MAP"}
        leftComponent={
          <View
            style={{
              width: 40,
            }}
          ></View>
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

  function renderInfo() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        {/* Info Container */}
        <View
          style={{
            padding: SIZES.padding,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: COLORS.white,
          }}
        >
          <LineDivider />

          {/* Address  */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: SIZES.radius,
            }}
          >
            <Image
              source={icons.location}
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.black,
              }}
            />
            <View
              style={{
                marginLeft: SIZES.padding,
              }}
            >
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.h4,
                }}
              >
                Address
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                }}
              >
                {isLoading ? "address" : data[0].address}
              </Text>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 70,
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        height: SIZES.height,
        width: SIZES.width,
      }}
    >
      {/* Header */}
      {renderHeader()}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={images.Map} />
      </View>

      {/* Info */}
      {renderInfo()}
    </View>
  );
};

export default Map;
