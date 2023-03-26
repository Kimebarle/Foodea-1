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

const Welcome = ({ navigation, route }) => {

    function renderDetails() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    height: 300,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        width: SIZES.width - SIZES.padding * 2,
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: SIZES.padding,
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
                        Welcome!
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h4,
                        }}
                    >
                        Welcome to the Foodea Ordering App! Please input first your information
                        in order for you to access the app. Thank you
                    </Text>

                    <View style={{
                        marginTop: SIZES.radius,
                    }}>
                        <TextButton
                            label="Next"
                            onPress={() => navigation.navigate("SignupName")}
                            buttonContainerStyle={{
                                marginTop: SIZES.padding,
                                height: 55,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary
                            }}
                            labelStyle={{
                                ...FONTS.h3,
                            }}
                        />
                    </View>
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
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: SIZES.padding,
                    marginBottom: 100
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

export default Welcome;

const styles = StyleSheet.create({
    forgotPassword: {
        marginTop: 10,
    },
    signup_text: {},
});
