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
import React, { useState } from "react";
import {
  Header,
  HorizontalFoodCard,
  VerticalFoodCard,
  FilterModal,
  SearchFoodCard
} from "../../components/FoodeaComponents";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";

function search() {
  navigation.push("Search");
}

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>

        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>Show All</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {children}
    </View>
  );
};

const SearchScreen = ({ navigation }) => {
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

  const filteredItems = async (text) => {
    const list = await getFoodData();
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

  const handleOnPress = () => {
    console.log("Search Food Card")
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
      <View style = {{
        marginTop: SIZES.padding,
      }}>
        <FlatList
          data={isLoading ? trending : display}
          keyExtractor={(item) => `${item.product_id}`}
          vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <SearchFoodCard
              item={item}
              onPress={handleOnPress}
            />
          )}
        />
        </View>
    );
  }

  function renderFoodCategories() {
    return (
      <FlatList
        data={dummyData.Restaurant}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 55,
              marginTop: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor:
                selectedCategoryId == item.id
                  ? COLORS.primary
                  : COLORS.lightGray2,
            }}
            onPress={() => {
              setSelectedCategoryId(item.id);
              handleChangeCategory(item.id, selectedMenuType);
            }}
          >
            <Image
              source={item.icon}
              style={{ marginTop: 5, height: 40, width: 40, marginRight: 5 }}
            />
            <Text
              style={{
                alignSelf: "center",
                marginRight: SIZES.base,
                color:
                  selectedCategoryId == item.id ? COLORS.white : COLORS.gray,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
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
