import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { dummyData, SIZES, icons, COLORS, FONTS } from "../../../constants";

import { Header, Button } from "../../components/FoodeaComponents";
import RecommendationComponent from "../../components/FoodeaComponents/RecommendationComponent";
import axios from "axios";
import { BASE_URL_RECOMMENDATION } from "../../../api/context/auth/config";
import AuthContext from "../../../api/context/auth/AuthContext";
import { useEffect } from "react";

const Section = ({ title, onPress, children, style }) => {
  return (
    <View style={{ ...style }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1 }}>{title}</Text>
      </View>

      {/* Content */}
      {children}
    </View>
  );
};

const FoodRecommendScreen = ({ navigation }) => {
  const { userId } = React.useContext(AuthContext);
  const [trending, setTrending] = React.useState([]);
  const [itemId, setItemId] = React.useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_RECOMMENDATION}/preferred_calorie/?id=8`
      );

      console.log(response.data.preferred_calorie);
    } catch (error) {}
  };

  const getFoodItems = async () => {
    try {
      const response = await axios.get();
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {/* header */}
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"RECOMMENDATION"}
      />
      <Section>
        <FlatList
          data={trending}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RecommendationComponent
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : 18,
                marginRight: index == trending.length - 1 ? SIZES.padding : 0,
                height: 400,
                width: 250,
              }}
              item={item}
              onPress={() => {
                setItemId(item.id);
                navigation.navigate("FoodInfo", { itemValue: itemId });
              }}
            />
          )}
        />
      </Section>

      {/* button temporarily removed*/}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          top: 40,
        }}
      >
        {/* <TouchableOpacity
          style={{
            backgroundColor: COLORS.lightGray2,
            borderRadius: 15,
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          
          <Image
            source={icons.reload}
            style={{
              tintColor: COLORS.primary,
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </TouchableOpacity> */}
        <Button
          title={"Buy Now"}
          style={{
            width: 200,
            height: 50,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 5,
          }}
        />
      </View>
    </View>
  );
};

export default FoodRecommendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: SIZES.height,
    width: SIZES.width,
  },
});
