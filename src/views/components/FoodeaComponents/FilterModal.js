import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  StyleSheet
} from "react-native";
import MapView, { Callout, Circle, LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
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
import Container from "./Container";
import Text from "./Text";


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
  
    

  const [isLoading, setIsLoading] = React.useState(true);
    const [pin, setPin] = React.useState({
        latitude: 14.7744064,
        longitude: 121.0461308,
    });

    const handleLocation = () => {
        console.log('location.coords.latitude');
        console.log('location.coords.longitude');
    }

    const { width, height } = Dimensions.get("window");
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const my_location = {
        latitude: pin.latitude,
        longitude: pin.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }

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

  useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log("Permission to access location was denied");
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);

        setPin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })
    })();
}, []);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });



  function renderMapView() {
    return(
      <View style={{
        flex: 1,
    }}>
        <Container style={styles.topContainer} top padding={3}>
            <View style={styles.Map}>
                <View style={styles.mapcontainer}>
                    <MapView style={styles.map}
                        // ref={map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={my_location}
                        showsUserLocation={true}
                    >
                        <Marker
                            coordinate={my_location}
                            pinColor="red"
                        >
                            <Callout>
                                <Text> My Location </Text>
                            </Callout>
                        </Marker>
                    </MapView>

                    <TextButton
                        label="Submit"
                        buttonContainerStyle={{
                            height: 50,
                            width: 300,
                            marginTop: SIZES.padding,
                            position: 'absolute',
                            bottom: 10,
                            right: 25,
                            borderRadius: SIZES.radius,
                            marginBottom: SIZES.padding,
                            backgroundColor: COLORS.primary
                        }}
                        onPress={handleLocation}
                    />
                </View>
            </View>
        </Container>
    </View>
    )
  };


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
              Map
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
          
          {/* Map View */}
          {renderMapView()}
        </Animated.View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  topContainer: {
      backgroundColor: '#FAFAFA',
      height: Dimensions.get('window').height,
  },
  Map: {
      height: '100%',
      width: window.width,
      backgroundColor: '#fff',
      borderColor: '#F54748',
  },
  button: {
      marginTop: 20,
      bottom: 0,
      alignItems: 'center'
  },
  mapcontainer: {
      flex: 1,
  },
  map: {
      width: Dimensions.get('window').width,
      height: '100%',
  },
});

export default FilterModal;
