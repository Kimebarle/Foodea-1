import React from "react";
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

const Map = ({ navigation }) => {
  const [currentStep, setCurrentStep] = React.useState(1);

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
          {/* Status */}

          <View
            style={{
              flexDirection: "row",
              marginBottom: SIZES.base,
            }}
          >
            {dummyData.track_order_status.map((item, index) => {
              return (
                <View style={{}} key={`StatusList-${index}`}>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      flex: 1,
                      alignItems: "center",
                      width: 105,
                    }}
                  >
                    <Image
                      source={icons.check_circle}
                      style={{
                        width: 40,
                        height: 40,
                        tintColor:
                          index <= currentStep
                            ? COLORS.primary
                            : COLORS.lightGray1,
                      }}
                    />
                    <View
                      style={{
                        marginLeft: SIZES.radius,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <LineDivider />

          {/* Delivery Time  */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: SIZES.base,
            }}
          >
            <Image
              source={icons.Waiting_Time}
              style={{
                width: 25,
                height: 25,
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
                Your Delivery Time
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                }}
              >
                35 mins
              </Text>
            </View>
          </View>

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
                Phase 7B Package 1 Block 57 Excess Lot
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
