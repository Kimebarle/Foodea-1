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
import { Header, HorizontalFoodCard, VerticalFoodCard, FilterModal } from "../../components/FoodeaComponents";

function search() {
  navigation.push("Search");
}

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}>
        <Text style={{ flex: 1, ...FONTS.h3 }}>
          {title}
        </Text>

        <TouchableOpacity
          onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
            Show All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {children}

    </View>
  )
}

const SearchScreen = ({ navigation }) => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1)
  const [selectedMenuType, setSelectedMenuType] = React.useState(1)
  const [trending, setTrending] = React.useState([])
  const [recommends, setRecommends] = React.useState([])
  const [menuList, setMenuList] = React.useState([])
  const [showFilterModal, setShowFilterModal] = React.useState(false)
  const [itemId, setItemId] = React.useState([]);

  React.useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType)
  }, [])

  // Handler

  function handleChangeCategory(categoryId, menuTypeId) {
    // Retrieve the Trending Food Menu
    let selectedTrending = dummyData.menu.find((a) => a.name == "Trending")

    // Retrieve the recommended menu
    let selectedRecommend = dummyData.menu.find((a) => a.name == "Recommended")

    // Find the menu
    let selectedMenu = dummyData.menu.find((a) => a.id == menuTypeId)

    // Set the trending menu based on the cateroryID
    setTrending(selectedTrending?.list.filter((a) => a.categories.includes(categoryId)))

    // Set the recommended menu based on the categoryID
    setRecommends(selectedRecommend?.list.filter((a) => a.categories.includes(categoryId)))
    // Set menu based on the category ID
    setMenuList(selectedMenu?.list.filter((a) => a.categories.includes(categoryId)))
  }

  // Render



  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray3
        }}>
        {/* Icon Search */}
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }} />
        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.h3
          }}
          placeholder="Search food.."
        />
        {/* Filter Button */}
        <TouchableOpacity
          onPress={() => setShowFilterModal(true)}
        >
          <Image
            source={icons.filter}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }} />
        </TouchableOpacity>
      </View>
    )
  }

  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          marginBottom: 10,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginLeft: SIZES.padding,
              marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0
            }}
            onPress={() => {
              setSelectedMenuType(item.id)
              handleChangeCategory(selectedCategoryId, item.id)
            }}
          >
            <Text
              style={{
                color: selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                ...FONTS.h3
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    )
  }

  function renderRecommendedSection() {
    return (
      <Section
        title="Recommended"
        onPress={() => console.log("Show all recommended")}
      >
        <FlatList
          data={recommends}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <HorizontalFoodCard
              containerStyle={{
                height: 180,
                width: SIZES.width * 0.85,
                marginLeft: index == 0 ? SIZES.padding : 18,
                marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                paddingRight: SIZES.radius,
                alignItems: 'center',
              }}
              imageStyle={{
                marginTop: 35,
                height: 150,
                width: 150,
              }}
              item={item}
              onPress={() => console.log("HorizontalFoodCard")}
            />
          )}

        />
      </Section>
    )
  }

  function renderTrendingSection() {
    return (
      <Section
        title="Trending Near You"
        onPress={() => console.log(" Show All Trending Near You")}
      >
        <FlatList
          data={trending}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <VerticalFoodCard
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : 18,
                marginRight: index == trending.length - 1 ? SIZES.padding : 0
              }}
              item={item}
              onPress={() => console.log("Vertical FOod Card")}
            />
          )}
        />
      </Section>
    )
  }

  function renderFoodCategories() {
    return (
      <FlatList
        data={dummyData.other_restaurant}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 55,
              marginTop: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor: selectedCategoryId == item.id ? COLORS.primary : COLORS.lightGray2
            }}
            onPress={() => {
              setSelectedCategoryId(item.id)
              handleChangeCategory(item.id, selectedMenuType)
            }}
          >
            <Image
              source={item.icon}
              style={{ marginTop: 5, height: 50, width: 50 }} />
            <Text style={{ alignSelf: 'center', marginRight: SIZES.base, color: selectedCategoryId == item.id ? COLORS.white : COLORS.gray, ...FONTS.h3 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    )
  }

  function renderOtherRestaurant() {
    return (
      <FlatList
        data={dummyData.other_restaurant}
        keyExtractor={(item) => `${item.id}`}
        vertical
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 100,
              width: 300,
              marginLeft: SIZES.padding,
              marginRight: SIZES.padding,
              marginBottom: SIZES.base,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              setItemId(item.id);
              console.log(item.id);
            }}
          >
            <Image
              source={item.icon}
              style={{
                marginTop: 5,
                height: 60,
                width: 60,
                alignSelf: "center",
                marginRight: SIZES.radius,
              }}
            />

            <View
              style={{
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  marginRight: SIZES.base,
                  color: COLORS.black,
                  ...FONTS.h2,
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.gray,
                  }}
                >
                  {item.time} mins • {item.distance} km
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    ...FONTS.h5,
                    fontSize: 10,
                    color: COLORS.gray,
                  }}
                >
                  {item.label} • {item.food} • {item.type}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <View style={{
      flex: 1, height: SIZES.height,
      width: SIZES.width,
    }}>
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
          >
          </TouchableOpacity>
        }
      />
      {/* Search Input*/}
      <View style={{ paddingTop: 10 }}>
        {renderSearch()}
      </View>

      {/* Filter Section */}
      {showFilterModal &&
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      }

      {/* List */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ paddingBottom: SIZES.padding }}>
            
            <View
              style={{
                marginLeft: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                Restaurants
              </Text>
            </View>

            {/* Other Restaurant */}
            {renderOtherRestaurant()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <View></View>
          );
        }}
      />
    </View>


  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
