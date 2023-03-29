import { View, StyleSheet, TouchableOpacity, Image, Switch, Dimensions, } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Container, SafeAreaView, Button, Text,  } from '../../components/FoodeaComponents'
import MapView, { Callout, Circle, LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    constants,
    dummyData,
    images,
} from "../../../constants";


const MapsView = ({ navigation }) => {

    const [pin, setPin] = React.useState({
        latitude: 14.7744064,
        longitude: 121.0461308,
    });


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






    return (
        
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
                    </View>
                </View>
            </Container>

    )
}

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

export default MapsView;