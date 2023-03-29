import { BASE_URL } from "../../../api/context/auth/config";
import utils, { Utils } from "../../../utils/Utils";
import {
    images,
    constants,
    SIZES,
    COLORS,
    icons,
    FONTS,
} from "../../../constants";
import { Header, FormInput, TextButton, FormInputCheck, } from "../../components/FoodeaComponents";
import { Alert } from "react-native";
import React from "react";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../api/context/auth/AuthContext";
import { View, Text, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditAddress = ({ navigation }) => {

    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState();
    const [address, setAddress] = React.useState("");
    const [addressError, setAddressError] = React.useState("");
    const [city, setCity] = React.useState("");
    const [cityError, setCityError] = React.useState("");
    const [brgy, setBrgy] = React.useState("");
    const [brgyError, setBrgyError] = React.useState("");
    const [zipCode, setZipCode] = React.useState("");
    const [zipCodeError, setZipCodeError] = React.useState("");



    const getUserData = async () => {
        const userID = user.user_id;
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}app_users/${userID}`);
        setData(response.data);
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        getUserData();
    }, []);

    const handleEdit = () => {
        console.log("Saved");
    }

    const disabledButton = () => {
        return !address || !city || !brgy || !zipCode;
    };

    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 80,
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                }}
                title={"Edit Address"}
                leftComponent={
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

    return (
        <View
            style={{
                flex: 1,
                height: SIZES.height,
                width: SIZES.width,
                backgroundColor: COLORS.white,
            }}
        >
            {renderHeader()}

            <KeyboardAwareScrollView
                enableOnAndroid={true}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={"handled"}
                extraScrollHeight={-200}
                contentContainerStyle={{
                    marginTop: SIZES.base,
                    flexGrow: 1,
                    paddingBottom: SIZES.padding * 2,
                }}
            >
                <View style={{ marginTop: SIZES.padding }}>
                    <View
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            {/* Address */}
                            <FormInput
                                containerStyle={{
                                    borderRadius: SIZES.radius,
                                    marginBottom: SIZES.radius,
                                    width: 330,
                                }}
                                label="Address"
                                autoCapitalize
                                value={address}
                                maxLength={50}
                                placeholder={isLoading ? "Josh" : data[0].address}
                                onChange={(value) => {
                                    setAddress(value);
                                    utils.validateInput(value, 1, setAddressError);
                                }}
                                errorMsg={addressError}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            {/* City */}
                            <FormInput
                                containerStyle={{
                                    borderRadius: SIZES.radius,
                                    marginBottom: SIZES.radius,
                                    width: 330,
                                }}
                                autoCapitalize
                                label="City"
                                value={city}
                                maxLength={50}
                                onChange={(value) => {
                                    setCity(value);
                                    utils.validateInput(value, 1, setCityError);
                                }}
                                errorMsg={cityError}
                                appendComponent={<FormInputCheck value={city} error={cityError} />}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            {/* Barangay */}
                            <FormInput
                                containerStyle={{
                                    borderRadius: SIZES.radius,
                                    marginBottom: SIZES.radius,
                                    width: 330,
                                }}
                                autoCapitalize
                                label="Barangay"
                                value={brgy}
                                maxLength={3}
                                keyboardType="number-pad"
                                onChange={(value) => {
                                    setBrgy(value);
                                    utils.validateInput(value, 1, setBrgyError);
                                }}
                                errorMsg={brgyError}
                                appendComponent={
                                    <FormInputCheck value={brgy} error={brgyError} />
                                }
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >

                            {/* ZIP CODE */}
                            <FormInput
                                containerStyle={{
                                    borderRadius: SIZES.radius,
                                    marginBottom: SIZES.radius,
                                    width: 330,
                                }}
                                label="ZIP CODE"
                                value={zipCode}
                                maxLength={4}
                                keyboardType="number-pad"
                                onChange={(value) => {
                                    setZipCode(value);
                                    utils.validateInput(value, 1, setZipCodeError);
                                }}
                                errorMsg={zipCodeError}
                                appendComponent={
                                    <FormInputCheck value={zipCode} error={zipCodeError} />
                                }
                            />
                        </View>
                    </View>
                    
                    <View
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <TextButton
                            label="Submit"
                            disabled={disabledButton()}
                            buttonContainerStyle={{
                                height: 50,
                                width: 300,
                                marginTop: SIZES.padding,
                                alignItems: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.padding,
                                backgroundColor: !disabledButton()
                                    ? COLORS.primary
                                    : COLORS.gray,
                            }}
                            onPress={handleEdit}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}


export default EditAddress;