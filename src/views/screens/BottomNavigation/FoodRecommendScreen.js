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
  const { user } = React.useContext(AuthContext);
  const [recommendation, setRecommendation] = React.useState(null);
  const [itemId, setItemId] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dummy, setDummy] = React.useState();

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL_RECOMMENDATION}/recommendations/?id=9`
      );

      //console.log(response.data);
      setRecommendation(response.data.foods);
      // console.log(response.data.foods);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
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
          data={isLoading ? dummy : recommendation}
          keyExtractor={(item) => `${item.product_id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RecommendationComponent
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : 18,
                // marginRight: index == trending.length - 1 ? SIZES.padding : 0,
                height: 400,
                width: 250,
              }}
              item={item}
              onPress={() => {
                // setItemId(item.id);
                //console.log(item.product_id);
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
        <Button
          title={"Add All to Cart"}
          style={{
            width: 300,
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
