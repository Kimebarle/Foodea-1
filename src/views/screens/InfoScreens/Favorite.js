import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useContext, useEffect } from "react";
import {
  images,
  constants,
  SIZES,
  COLORS,
  icons,
  FONTS,
  dummyData,
} from "../../../constants";
import {
  Header,
  IconButton,
  LoadingActivity,
} from "../../components/FoodeaComponents";
import AuthContext from "../../../api/context/auth/AuthContext";
import { BASE_URL } from "../../../api/context/auth/config";
import axios from "axios";
import { Alert } from "react-native";

const Favorite = ({ navigation, data }) => {
  const { userId } = useContext(AuthContext);
  const [favorite, setFavorite] = React.useState();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [itemLength, setItemLength] = React.useState(false);

  const fetchFavorite = async () => {
    if (userId === undefined) {
    } else {
      try {
        const response = await axios.get(
          `${BASE_URL}favorites?user_id[eq]=${userId}`
        );
        setFavorite(response.data);
        setIsLoading(false);
        //console.log(`${BASE_URL}favorites?user_id[eq]=${userId}`);
        setItemLength(response.data.length > 0);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchFavorite();
  }, []);

  const showAlertWithBooleanResponse = () => {
    return new Promise((resolve) => {
      Alert.alert(
        "Do you want to remove this item from your cart?",
        "",
        [
          {
            text: "Cancel",
            onPress: () => resolve(false),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  async function removeFavorite(id) {
    const shouldContinue = await showAlertWithBooleanResponse();

    if (shouldContinue) {
      setIsLoading(true);
      const response = await axios.delete(`${BASE_URL}favorites/${id}`);
      console.log(response.data);
      let newFavorite = [...favorite];
      const index = newFavorite.findIndex((Favorites) => Favorites.id === id);
      newFavorite.splice(index, 1);
      setFavorite(newFavorite);
      setIsLoading(false);
      setItemLength(newFavorite.length > 0);
    } else {
      console.log("no");
    }
  }

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Favorite"}
        // leftComponent={
        //   <TouchableOpacity
        //     style={{
        //       width: 40,
        //       height: 40,
        //       alignItems: "center",
        //       justifyContent: "center",
        //       borderWidth: 1,
        //       borderColor: COLORS.gray2,
        //       borderRadius: SIZES.radius,
        //     }}
        //     onPress={navigation.goBack}
        //   >
        //     <Image
        //       source={icons.backarrow}
        //       style={{
        //         borderRadius: SIZES.radius,
        //         color: COLORS.gray2,
        //       }}
        //     />
        //   </TouchableOpacity>
        // }
        // rightComponent={
        //   <View
        //     style={{
        //       width: 40,
        //     }}
        //   ></View>
        // }
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        height: SIZES.height,
        width: SIZES.width,
        alignItems: "center",
      }}
    >
      {/* Header */}
      {renderHeader()}

      <View
        style={{
          flex: 1,
        }}
      >
        {itemLength ? (
          <FlatList
            data={favorite}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: SIZES.radius,
                    borderRadius: 15,
                    backgroundColor: "#FAF9F6",
                    height: 130,
                    width: 350,
                  }}
                >
                  {/* image */}
                  <Image
                    source={{ uri: item.product_details.product_image }}
                    style={{
                      marginTop: 20,
                      marginLeft: 20,
                      height: 100,
                      width: 100,
                    }}
                  />
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    {/* name */}
                    <Text
                      style={{
                        fontSize: 15,
                        marginLeft: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {item.product_details.product_name}
                    </Text>
                    {/* price */}
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginLeft: 10,
                        marginTop: 5,
                      }}
                    >
                      ₱ {item.product_details.price}
                    </Text>

                    {/* images */}
                    <View style={{ position: "absolute", top: 0, right: 23 }}>
                      <IconButton
                        icon={isFavorite ? icons.favourite : icons.love}
                        iconStyle={{
                          tintColor: COLORS.primary,
                          position: "absolute",
                          height: 25,
                          width: 25,
                          top: 20,
                          right: 7,
                        }}
                        onPress={() => removeFavorite(item.id)}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
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

export default Favorite;
