import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
    FlatList,
    ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import {
    TextButton,
    FormInput,
    FormInputCheck,
    IconButton,
    Header,
    TextInput
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

const Captcha = ({ navigation }) => {
    const [Captcha, setCaptcha] = React.useState("");
    const [CaptchaError, setCaptchaError] = React.useState("");
    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 80,
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                }}
                title={"TERMS OF AGREEMENTS"}
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

    function renderTerms() {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: SIZES.radius,
                height: 300,
                width: 300,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                borderWidth: 1,
            }}>
                <ScrollView>
                    <View style={{
                        marginTop: SIZES.radius,
                        marginLeft: 5,
                        paddingHorizontal: SIZES.base,
                        paddingVertical: SIZES.base,
                    }}>
                        <Text>
                            <View style={{
                                marginBottom: SIZES.radius,
                                marginLeft: 10
                            }}>
                                <Text style={{
                                    ...FONTS.h2,
                                }}>
                                    Terms of Use

                                </Text>
                            </View>
                            {'\n'}
                            <View>
                                <Text>

                                    These Terms of Use govern your use of the 
                                    {'\n'}
                                    Foodea website and application.
                                    {'\n'}
                                </Text>
                            </View>
                            <View style={{
                                marginBottom: SIZES.radius,
                            }}>
                                <Text style={{
                                    ...FONTS.h2,
                                }}>
                                    Accounts

                                </Text>
                            </View>
                            {'\n'}
                            - You may be required to create an account to continue using our services. You are responsible in keeping your account secured, as well as maintaining the accuracy of necessary information required, and all other activities under your account. Hence, Foodea shall not be held liable if the user's account is used by another individual to use/access our services without the account owner's consent. As the account owner, you are solely responsible for safeguarding and maintaining the confidentiality of your username, email address, password, and other information.
                            Therefore, you agree not to share or permit others to use your Account or Password; or assign or transfer your Account to any other person or entity. Also, by creating an account to use/access our site and services, you are at least eighteen (18) years old.
                            {'\n'}
                            {'\n'}
                            <View style={{
                            }}>
                                <Text style={{
                                    ...FONTS.h2,
                                }}>
                                    Deliveries

                                </Text>
                            </View>
                            {'\n'}
                            - Foodea and its riders shall not be held responsible if the goods are delivered to the incorrect address. its riders and its partners try their best to prepare and package the goods for delivery. In any such event, Foodea and its riders shall not be held responsible for damages on decorations or deformation of goods. To avoid incidents involving ruined decorations or deformed goods.
                            {'\n'}
                            {'\n'}

                            <Text style={{
                                ...FONTS.h2,
                            }}>
                                WHAT DATA WE COLLECT
                                {'\n'}
                            </Text>
                            - Depending on your User type, we collect several different types of Personal Data for various purposes to provide and improve our Service to you. You provide us with personally identifiable information such as your name, email address, and physical address through various media and/or forms, such as original, notarized, and/or stamped documents in print or copies in accessible, legible, and electronic format, as may be necessary and upon our and/or our Partner's request.{'\n'}
                            Other Personal Data that we do not expressly require of you but which you willingly provide to us are collected as well. The information we collect depends on the features, functionalities, products, and Services that you request through our Platforms.
                            {'\n'}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

    function renderCaptcha() {
        return (
            <View style={{
                marginTop: SIZES.radius,
                width: 300,
                height: 150,
                borderWidth: 1,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius
            }}>
                <Image
                    source={require("../../../../assets/img/images/captcha1.png")}
                    style={{
                        height: 130,
                        width: 200,
                        borderRadius: SIZES.radius
                    }} />

            </View>
        )
    }

    function renderFooter() {
        return (
            <View style={{
                backgroundColor: COLORS.primary,
                width: 300,
                height: 50,
                borderRadius: SIZES.radius,
                alignItems: "center",
                justifyContent: "center",
                marginTop: SIZES.padding,
            }}>
                <TouchableOpacity>
                    <View>
                        <Text style={{
                            color: COLORS.white,
                            ...FONTS.h3
                        }}>
                            Submit
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{
            alignItems: "center",
        }}>
            {/* Header */}
            {renderHeader()}

            {/* Terms of Use */}
            {renderTerms()}

            {/* Captcha */}
            {renderCaptcha()}

            <TextInput
                style={{
                    ...FONTS.h3,
                    width: 300,
                    borderRadius: SIZES.radius,
                    textAlign: 'center'
                }}
                onChangeText={(value) => {
                    setCaptcha(value);
                }}
                value={Captcha}
            />

            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: SIZES.base,
                marginBottom: SIZES.padding
            }}>
                <Text style={{
                    width: 300,
                    fontWeight: 'bold',
                    ...FONTS.h4,
                    lineHeight: 15,
                }}>
                    By pressing the submit button, you agreeing to our Terms and that you have read our Data Use Policy.
                </Text>
            </View>

            {/* Submit Button */}
            {renderFooter()}

        </View>
    )
}


export default Captcha;