import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Container,
  SafeAreaView,
  Button,
  Text,
  TextButton,
} from "../../components/FoodeaComponents";
import MapView, {
  Callout,
  Circle,
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Location from "expo-location";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
  images,
} from "../../../constants";
import AuthContext from "../../../api/context/auth/AuthContext";

const MapsView = ({ navigation, route }) => {
  // const { setAddress } = useContext(AuthContext);
  // const [isLoading, setIsLoading] = React.useState(true);
  const { selectedCard, passedValues } = route.params;
  const [pin, setPin] = React.useState({
    latitude: 0.0,
    longitude: 0.0,
  });

  const handleLocation = () => {
    const list = [...passedValues];
    const updated = list.map((item) => ({
      ...item,
      longitude: pin.longitude,
      latitude: pin.latitude,
    }));

    //console.log('location.coords.longitude');
    // setAddress({
    //     latitude: pin.latitude,
    //     longitude: pin.longitude,
    // })

    navigation.navigate("CheckOut", {
      passedValues: updated,
      selectedCard: selectedCard,
    });
  };

  useEffect(() => {
    displayData();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const displayData = () => {
    console.log("my_location");
  };

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const my_location = {
    latitude: pin.latitude,
    longitude: pin.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Container style={styles.topContainer} top padding={3}>
        <View style={styles.Map}>
          <View style={styles.mapcontainer}>
            <MapView
              style={styles.map}
              // ref={map}
              provider={PROVIDER_GOOGLE}
              initialRegion={my_location}
              showsUserLocation={true}
            >
              <Marker coordinate={my_location} pinColor="red">
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
                position: "absolute",
                bottom: 10,
                right: 25,
                borderRadius: SIZES.radius,
                marginBottom: SIZES.padding,
                backgroundColor: COLORS.primary,
              }}
              onPress={handleLocation}
            />
          </View>
        </View>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#FAFAFA",
    flex: 1,
    height: Dimensions.get("window").height,
  },
  Map: {
    height: "100%",
    width: window.width,
    backgroundColor: "#fff",
    borderColor: "#F54748",
  },
  button: {
    marginTop: 20,
    bottom: 0,
    alignItems: "center",
  },
  mapcontainer: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
});

export default MapsView;
