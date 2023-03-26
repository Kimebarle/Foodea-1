import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
    FlatList,
} from "react-native";
import React, { useEffect } from "react";
import {
    TextButton,
    FormInput,
    FormInputCheck,
    IconButton,
    Header,
} from "../../components/FoodeaComponents";
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    constants,
    dummyData,
    images,
} from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import utils, { Utils } from "../../../utils/Utils";
import axios from "axios";
import { BASE_URL } from "../../../api/context/auth/config";
import { Alert } from "react-native";

const SignupName = ({ navigation, route }) => {
    const [Name, setName] = React.useState("");
    const [NameError, setNameError] = React.useState("");
    const [MiddleName, setMiddleName] = React.useState("");
    const [MiddleNameError, setMiddleNameError] = React.useState("");
    const [LastName, setLastName] = React.useState("");
    const [LastNameError, setLastNameError] = React.useState("");
    const [day, setDay] = React.useState("");
    const [dayError, setDayError] = React.useState("");
    const [month, setMonth] = React.useState("");
    const [monthError, setMonthError] = React.useState("");
    const [year, setYear] = React.useState("");
    const [yearError, setYearError] = React.useState("");

    const disabledButton = () => {
        return !Name || !LastName;
    };

    const handleSignUpPress = () => {
        navigation.push("SignUpScreen");
    };

    function renderDetails() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    height: 650,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        width: SIZES.width - SIZES.padding * 2,
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                        elevation: 5,
                    }}
                >
                    <Text
                        style={{
                            width: "100%",
                            color: COLORS.black,
                            ...FONTS.h1,
                        }}
                    >
                        Sign up your information
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h5,
                        }}
                    >
                        Input your First Name, Middle Name (optional), Last Name, Birthday.
                    </Text>

                    {/* First Name */}
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                            marginBottom: SIZES.radius,
                            marginTop: SIZES.radius
                        }}
                        label="First Name"
                        value={Name}
                        maxLength={10}
                        onChange={(value) => {
                            setName(value);
                            utils.validateInput(value, 1, setNameError);
                        }}
                        errorMsg={NameError}
                        appendComponent={
                            <FormInputCheck value={Name} error={NameError} />
                        }
                    />

                    {/* Middle Name */}
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                            marginBottom: SIZES.radius,
                        }}
                        label="Middle Name"
                        placeholder={"optional"}
                        value={MiddleName}
                        maxLength={10}
                        onChange={(value) => {
                            setMiddleName(value);
                            utils.validateInput(value, 1, setMiddleNameError);
                        }}
                    />

                    {/* Last Name */}
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                            marginBottom: SIZES.radius,
                        }}
                        label="Last Name"
                        value={LastName}
                        maxLength={10}
                        onChange={(value) => {
                            setLastName(value);
                            utils.validateInput(value, 1, setLastNameError);
                        }}
                        errorMsg={LastNameError}
                        appendComponent={
                            <FormInputCheck value={LastName} error={LastNameError} />
                        }
                    />

                    <TextButton
                        label="Next"
                        disabled={disabledButton()}
                        onPress={() => navigation.navigate("PersonalInfo")}
                        buttonContainerStyle={{
                            marginTop: SIZES.padding,
                            height: 55,
                            borderRadius: SIZES.radius,
                            backgroundColor: !disabledButton()
                                ? COLORS.primary
                                : COLORS.transparentPrimray,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                        }}
                    />
                </View>
            </View>
        );
    }

    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 80,
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                }}
                leftComponent={
                    // Open Custom Drawer
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
                        <Image
                            source={icons.backarrow}
                            style={{
                                borderRadius: SIZES.radius,
                                color: COLORS.gray2,
                            }}
                        />
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

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: SIZES.padding,
                }}
            >
                <Image
                    source={images.Foodea_new_logo}
                    resizeMode="contain"
                    style={{
                        width: 200,
                    }}
                />
            </View>
        );
    }
    return (
        <View
            style={{
                alignItems: "center",
                height: SIZES.height,
                width: SIZES.width,
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Logo
            {renderLogo()} */}

            {/* Email Address */}
            {renderDetails()}
        </View>
    );
};

export default SignupName;

const styles = StyleSheet.create({
    forgotPassword: {
        marginTop: 10,
    },
    signup_text: {},
});