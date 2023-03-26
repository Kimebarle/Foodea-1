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

import {
  Header,
  Button,
  VerticalFoodCard,
} from "../../components/FoodeaComponents";
import RecommendationComponent from "../../components/FoodeaComponents/RecommendationComponent";
import axios from "axios";
import {
  BASE_URL,
  BASE_URL_RECOMMENDATION,
} from "../../../api/context/auth/config";
import AuthContext from "../../../api/context/auth/AuthContext";
import { useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

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
  const [recommendation, setRecommendation] = React.useState(null);
  const [itemId, setItemId] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dummy, setDummy] = React.useState();

  const getData = async () => {
    const response = await axios.get(
      `${BASE_URL_RECOMMENDATION}/recommendations/?id=${userId}`
    );
    return response.data.foods;
  };

  const getFavorites = async () => {
    const response = await axios.get(
      `${BASE_URL}favorites?user_id[eq]=${userId}`
    );
    return response.data;
  };

  const updateWithFavorites = useCallback(async () => {
    setIsLoading(true);
    const favoritesData = await getFavorites();
    const RecommendationData = await getData();
    const favoritesList = [...favoritesData];
    const recommendationList = [...RecommendationData];

    const RecommendationWithFavorites = recommendationList.map((item) => ({
      ...item,
      isFavorite: favoritesList.some(
        (fave) => fave.product_id === item.product_id
      ),
    }));

    setRecommendation(RecommendationWithFavorites);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      updateWithFavorites();
      // getData();
      // getFavorites();
      setRecommendation();
    }, [updateWithFavorites])
  );

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
          data={isLoading ? dummy : recommendation}
          keyExtractor={(item) => `${item.product_id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RecommendationComponent
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : 18,
                height: 400,
                width: 250,
              }}
              item={item}
              user_id={userId}
              favorite={item.isFavorite}
              onPress={() => {
                navigation.navigate("FoodInfo", { itemId: item.product_id });
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
        {/* <Button
          title={"Add All to Cart"}
          style={{
            width: 300,
            height: 50,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 5,
          }}
          onPress={onPressHandler}
        /> */}
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
