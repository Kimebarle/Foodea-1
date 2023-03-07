import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
    FlatList,
} from "react-native";
import React from "react";
import {
    TextButton,
    FormInput,
    FormInputCheck,
    IconButton,
    Header
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

const Resetpassword = ({ navigation }) => {
    const [newpassword, setNewPassword] = React.useState("");
    const [confirmpassword, setConfirmPassword] = React.useState("");
    const [showPassword, setShowPasswod] = React.useState(false);

    function renderEmail() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    height: SIZES.height * 0.55,
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
                        Reset Password
                    </Text>
                    <Text style={{
                        ...FONTS.h5
                    }}>
                        Password must be at least 6 characters long. Password can contain letters, numbers and punctuation.
                    </Text>


                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps={"handled"}
                        extraScrollHeight={-200}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: SIZES.padding,
                            justifyContent: "center",
                        }}
                    >
                        {/* New Password */}
                        <FormInput
                            containerStyle={{
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.white,
                            }}
                            placeholder="New Password"
                            value={newpassword}
                            onChange={(text) => setNewPassword(text)}
                            prependComponent={
                                <Image
                                    source={icons.Lock}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        marginRight: SIZES.base,
                                        alignSelf: "center",
                                    }}
                                />
                            }
                        />

                        {/* Confirm Password */}
                        <FormInput
                            containerStyle={{
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.white,
                            }}
                            placeholder="Confirm Password"
                            value={confirmpassword}
                            secureTextEntry={!showPassword}
                            onChange={(text) => setConfirmPassword(text)}
                            prependComponent={
                                <Image
                                    source={icons.Lock}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        marginRight: SIZES.base,
                                        alignSelf: "center",
                                    }}
                                />
                            }
                            appendComponent={
                                <IconButton
                                    icon={showPassword ? icons.disable_eye : icons.eye}
                                    iconStyle={{
                                        tintColor: COLORS.gray,
                                        position: "absolute",
                                        height: 25,
                                        width: 25,
                                        top: 10,
                                        right: 0,
                                    }}
                                    onPress={() => setShowPasswod(!showPassword)}
                                />
                            }
                        />
                        <View
                            style={{
                                alignItems: "flex-end",
                            }}
                        >
                        </View>
                        <TextButton
                            label="Sign In"
                            onPress={() => navigation.navigate("SurveyScreen")}
                            buttonContainerStyle={{
                                marginTop: SIZES.padding,
                                height: 55,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary,
                            }}
                            labelStyle={{
                                ...FONTS.h3,
                            }}
                        />
                    </KeyboardAwareScrollView>
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
                title={"New Password"}
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
                justifyContent: "center",
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
            {renderEmail()}
        </View>
    );
};

export default Resetpassword;

const styles = StyleSheet.create({
    forgotPassword: {
        marginTop: 10,
    },
    signup_text: {},
});
