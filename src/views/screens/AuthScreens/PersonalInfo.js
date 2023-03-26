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
import { SelectList } from "react-native-dropdown-select-list";

const PersonalInfo = ({ navigation, route }) => {

    const [height, setHeight] = React.useState();
    const [heightError, setHeightError] = React.useState("");
    const [weight, setWeight] = React.useState();
    const [weightError, setWeightError] = React.useState("");

    const [selected, setSelected] = React.useState("");
    const data = [
        { key: "M", value: "Male" },
        { key: "F", value: "Female" },
    ];

    const disabledButton = () => {
        return !height || !weight || !data;
    };

    const handleSignUpPress = () => {
        navigation.push("SignUpScreen");
    };

    function renderDetails() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    height: 550,
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
                        Personal Info
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h5,
                        }}
                    >
                        Input your Height, Weight and Gender.
                    </Text>

                    <FormInput
                        label="Height"
                        value={height}
                        placeholder="cm"
                        keyboardType="number-pad"
                        maxLength={3}
                        containerStyle={{
                            borderRadius: SIZES.radius,
                            marginBottom: SIZES.radius,
                            marginTop: SIZES.radius
                        }}
                        onChange={(value) => {
                            utils.validateInput(value, 1, setHeightError);
                            setHeight(value);
                        }}
                        errorMsg={heightError}
                    />

                    <FormInput
                        label="Weight"
                        value={weight}
                        maxLength={2}
                        placeholder="kg"
                        keyboardType="number-pad"
                        containerStyle={{
                            borderRadius: SIZES.radius,
                            marginBottom: SIZES.radius,
                        }}
                        onChange={(value) => {
                            utils.validateInput(value, 1, setWeightError);
                            setWeight(value);
                        }}
                        errorMsg={weightError}
                    />

                    <View>
                        <Text
                            style={{
                                color: COLORS.gray,
                                ...FONTS.h3,
                                fontSize: 15,
                            }}
                        >
                            Gender
                        </Text>

                        <SelectList
                            data={data}
                            placeholder={"Select Gender"}
                            setSelected={setSelected}
                            onPress={console.log(data.value)}
                            notFoundText='No Data Exists, Please Input Suitable Gender'
                            boxStyles={{
                                backgroundColor: COLORS.lightGray2,
                                alignItems: 'center',
                                flexDirection: 'row',
                                height: SIZES.height > 800 ? 55 : 45,
                                marginTop: SIZES.height > 800 ? SIZES.base : 0,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.lightGray2,
                            }}
                        />
                    </View>
                    <TextButton
                        label="Next"
                        disabled={disabledButton()}
                        onPress={() => navigation.navigate("Location")}
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

            {/* Logo */}
            {renderLogo()}

            {/* Email Address */}
            {renderDetails()}
        </View>
    );
};

export default PersonalInfo;

const styles = StyleSheet.create({
    forgotPassword: {
        marginTop: 10,
    },
    signup_text: {},
});
