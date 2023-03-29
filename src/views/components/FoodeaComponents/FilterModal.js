import React from "react";
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
} from "../../../constants";
// import { IconButton, TwoPointSlider, TextButton } from "../../components/FoodeaComponents";
import IconButton from "./IconButton";
import TwoPointSlider from "./TwoPointSlider";
import TextButton from "./TextButton";

const Section = ({ containerStyle, title, children }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        ...containerStyle,
      }}
    >
      <Text style={{ ...FONTS.h3 }}>{title}</Text>
      {children}
    </View>
  );
};
const FilterModal = ({ isVisible, onClose }) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilterModal] = React.useState(isVisible);
  const [deliveryTime, setDeliveryTime] = React.useState("");
  const [tags, setTags] = React.useState("");

  React.useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });

  function renderDistance() {
    return (
      <Section title="Distance">
        <View style={{ alignItems: "center" }}>
          <TwoPointSlider
            values={[3, 10]}
            min={1}
            max={20}
            postfix="km"
            onValuesChange={(values) => console.log(values)}
          />
        </View>
      </Section>
    );
  }

  function renderDeliveryTime() {
    return (
      <Section
        title="Delivery Time"
        containerStyle={{
          marginTop: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: SIZES.radius,
          }}
        >
          {constants.delivery_time.map((item, index) => {
            return (
              <TextButton
                key={`delivery_time-${index}`}
                label={item.label}
                labelStyle={{
                  color: item.id == deliveryTime ? COLORS.white : COLORS.gray,
                  ...FONTS.h3,
                }}
                buttonContainerStyle={{
                  width: "30%",
                  height: 50,
                  margin: 5,
                  alignItems: "center",
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == deliveryTime
                      ? COLORS.primary
                      : COLORS.lightGray2,
                }}
                onPress={() => setDeliveryTime(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  }

  function renderTags() {
    return (
      <Section title="Tags">
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: SIZES.padding,
          }}
        >
          {constants.tags.map((item, index) => {
            return (
              <TextButton
                key={`Tags-${index}`}
                label={item.label}
                labelStyle={{
                  color: item.id == tags ? COLORS.white : COLORS.gray,
                  ...FONTS.h4,
                }}
                buttonContainerStyle={{
                  height: 30,
                  margin: 5,
                  paddingHorizontal: SIZES.base,
                  alignItems: "center",
                  borderRadius: SIZES.base,
                  backgroundColor:
                    tags == item.id ? COLORS.primary : COLORS.lightGray1,
                }}
                onPress={() => setTags(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  }

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
        {/* Transparent Background */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: modalY,
            width: "100%",
            height: "100%",
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
        >
          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>
              Filter your Search
            </Text>

            <IconButton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray2,
              }}
              onPress={() => setShowFilterModal(false)}
            />
          </View>

          {/* Distance */}
          {renderDistance()}

          {/* Delivery Time */}
          {renderDeliveryTime()}

          {/* Tags */}
          {renderTags()}

          {/* Apply Button */}
          <View
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.radius,
              marginTop: SIZES.padding,
            }}
          >
            <TextButton
              label="Apply Filters"
              buttonContainerStyle={{
                height: 50,
                alignItems: "center",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => console.log("Applied Filters")}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
