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
} from "../../components/FoodeaComponents";

const CardPayment = ({ navigation, route }) => {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const { passingValue } = route.params;

  const onPressHandler = () => {
    const newList = [...passingValue];

    navigation.navigate("CheckOut", {
      selectedCard: selectedCard,
      passedValues: newList,
    });
  };

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"PAYMENT CARDS"}
        leftComponent={
          // Open Custom

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
          <View
            style={{
              width: 40,
            }}
          ></View>
        }
      />
    );
  }

  function renderCardPayment() {
    return (
      <View>
        {dummyData.myCard.map((item, index) => {
          return (
            <CardItem
              key={`CardPayment-${item.id}`}
              item={item}
              isSelected={
                `${selectedCard?.key}-${selectedCard?.id}` ==
                `CardPayment-${item.id}`
              }
              onPress={() => setSelectedCard({ ...item, key: "CardPayment" })}
            />
          );
        })}
      </View>
    );
  }

  function renderAddNewCard() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3 }}>Add new card</Text>

        {dummyData.newCard.map((item, index) => {
          return (
            <CardItem
              key={`NewCard-${item.id}`}
              item={item}
              isSelected={
                `${selectedCard?.key}-${selectedCard?.id}` ==
                `NewCard-${item.id}`
              }
              onPress={() => setSelectedCard({ ...item, key: "NewCard" })}
            />
          );
        })}
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          paddingTop: SIZES.radius,
          paddingBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TextButton
          disabled={selectedCard == null}
          buttonContainerStyle={{
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor:
              selectedCard == null ? COLORS.gray : COLORS.primary,
          }}
          label={
            selectedCard?.key == "NewCard" ? "Add Card" : "Place your order"
          }
          onPress={onPressHandler}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/* Header*/}
      {renderHeader()}

      {/* Carts */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius,
        }}
      >
        {/* Card Payment */}
        {renderCardPayment()}
      </ScrollView>

      {/* Footer*/}
      {renderFooter()}
    </View>
  );
};

export default CardPayment;

const style = StyleSheet.create({});
