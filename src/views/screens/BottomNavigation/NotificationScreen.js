import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
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

const NotificationScreen = () => {
  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Notification"}
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
      <View style={{
        flex: 1,
      }}>
        <View style={{
          marginLeft: SIZES.padding,
        }}>
          <Text style={{
            ...FONTS.h3
          }}>
            Notifications
          </Text>
        </View>
        <FlatList
          data={constants.messages}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
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
                    borderRadius: SIZES.radius
                  }}
                >
                  <Image
                    source={item.icon}
                    style={{
                      height: 40,
                      width: 40,
                      tintColor: COLORS.primary,
                      marginTop: SIZES.radius,
                    }}
                  />
                  <View style={{
                    flexDirection: 'row',
                    marginLeft: SIZES.radius
                  }}>
                    <View style={{ marginLeft: SIZES.padding }}>
                      <Text style={{ ...FONTS.h3, marginBottom: 5, color: COLORS.primary }}>
                        {item.title}
                      </Text>
                      <Text style={{ ...FONTS.h5 }}>
                        {item.description}
                      </Text>
                    </View>

                    <View style={{
                      position: 'absolute',
                      right: 10,
                    }}>
                      <Text style={{ ...FONTS.h4, }}>{item.time}</Text>
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
