import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
} from "../../../constants";
import React, { useContext, useState } from "react";
import {
  Header,
  HorizontalFoodCard,
  VerticalFoodCard,
  FilterModal,
  SearchFoodCard,
} from "../../components/FoodeaComponents";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";
import AuthContext from "../../../api/context/auth/AuthContext";

const SearchScreen = ({ navigation }) => {
  const { userId } = useContext(AuthContext);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const [trending, setTrending] = React.useState([]);
  const [recommends, setRecommends] = React.useState([]);
  const [menuList, setMenuList] = React.useState();
  const [itemId, setItemId] = React.useState();
  const [data, setData] = React.useState();
  const [search, setSearch] = React.useState("");
  const [display, setDisplay] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    getFoodData();
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  const getFoodData = async () => {
    setIsLoading(true);
    const response = await axios.get(`${BASE_URL}foods`);
    setData(response.data);
    setIsLoading(false);
    return response.data;
  };

  const HandleChange = (text) => {
    setSearch(text);
    filteredItems(text);
  };

  const getFavorite = async () => {
    const response = axios.get(`${BASE_URL}favorites?user_id[eq]=${userId}`);
  };

  const filteredItems = async (text) => {
    const list = await getFoodData();
    const favorite = await getFavorite();
    const newList = [...list];

    const filteredList = newList.filter((item) => {
      return item.product_name.toLowerCase().includes(text.toLowerCase());
    });

    setDisplay(filteredList);
    return filteredList;
  };

  function handleChangeCategory(categoryId, menuTypeId) {
    // Retrieve the Trending Food Menu
    let selectedTrending = dummyData.menu.find((a) => a.name == "Trending");

    setTrending(
      selectedTrending?.list.filter((a) => a.categories.includes(categoryId))
    );
  }

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray3,
        }}
      >
        {/* Icon Search */}
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />
        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.h3,
          }}
          value={search}
          placeholder="Search food.."
          onChangeText={HandleChange}
        />
      </View>
    );
  }

  function renderTrendingSection() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <FlatList
          data={display}
          keyExtractor={(item) => `${item.product_id}`}
          vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <SearchFoodCard
              item={item}
              itemId={item.id}
              onPress={() => {
                navigation.navigate("FoodInfo", {
                  itemId: item.product_id,
                });
              }}
            />
          )}
        />
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
      <Header
        containerStyle={{
          height: 80,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Search"}
        leftComponent={
          // Back to the previous screen
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
            <Image source={icons.backarrow} style={{ color: COLORS.gray2 }} />
          </TouchableOpacity>
        }
        rightComponent={
          // Search Component
          <TouchableOpacity
            style={{
              width: 40,
            }}
          ></TouchableOpacity>
        }
      />

      {/* Search Input*/}
      <View style={{ paddingTop: 10 }}>{renderSearch()}</View>

      {/* List */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ paddingBottom: SIZES.padding }}>
            {/* Categories */}
            {/* {renderFoodCategories()} */}

            {/* Trending */}
            {renderTrendingSection()}
          </View>
        }
        renderItem={({ item, index }) => {
          return <View></View>;
        }}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
