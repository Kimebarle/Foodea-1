import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
    Header,
    EditButton,
    TextButton,
    TextInput,
} from "../../components/FoodeaComponents";
import { icons, SIZES, COLORS, dummyData, FONTS, images } from "../../../constants";

const MyAvatar = ({ navigation }) => {

    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 80,
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                }}
                title={"MY AVATAR"}
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
                    <View style={{
                        width: 40,
                    }}>

                    </View>
                }
            />
        )
    }

    function renderEditProfileButton() {
        return (
            <View style={{
                position: 'absolute',
                top: 90,
                left: 250,
            }}>
                <EditButton
                    buttonContainerStyle={{
                        width: 100,
                        borderRadius: SIZES.base,
                        backgroundColor: "#F54748"
                    }}
                    label="Edit Profile"
                    labelStyle={{
                        color: COLORS.white
                    }}
                    onPress={() => navigation.navigate("EditProfile")}

                />
            </View>
        )
    }

    function renderBody() {
        return (
            <View style={{
                marginTop: SIZES.padding,
            }}>
                <Image
                    source={images.body}
                    style={{
                        justifyContent: 'center',
                    }}
                />

                {/* HEIGHT */}
                <View style={{
                    position: 'absolute',
                    top: 40,
                }}>
                    <Text style={{
                        ...FONTS.h2
                    }}>
                        167
                        <Text> cm</Text>
                    </Text>
                    <Text style={{
                        textAlign: 'center',
                        color: COLORS.primary
                    }}> HEIGHT </Text>
                </View>

                {/* BMI */}
                <View style={{
                    position: 'absolute',
                    top: 70,
                    left: 220,
                }}>
                    <Text style={{
                        ...FONTS.h2
                    }}>
                        18.5
                    </Text>
                    <Text style={{
                        textAlign: 'center', color: COLORS.primary
                    }}>
                        BMI
                    </Text>
                </View>

                {/* WEIGHT */}
                <View style={{
                    position: 'absolute',
                    top: 230,
                }}>
                    <Text style={{
                        ...FONTS.h2
                    }}>
                        65 kg
                    </Text>
                    <Text style={{
                        textAlign: 'center', color: COLORS.primary
                    }}>
                        WEIGHT
                    </Text>
                </View>

                {/* STATUS */}
                <View style={{
                    position: 'absolute',
                    top: 250,
                    left: 210,
                }}>
                    <Text style={{
                        ...FONTS.h2
                    }}>
                        Normal
                    </Text>
                    <Text style={{
                        textAlign: 'center', color: COLORS.primary
                    }}>
                        STATUS
                    </Text>
                </View>
            </View>
        )
    }

    function renderPersonalInformation() {
        return (
            <View style={{
                alignItems: 'center',
                marginTop: SIZES.base,
            }}>
                <Text style={{
                    ...FONTS.h2, position: 'absolute', top: 0,
                }}>
                    Personal Information
                </Text>

                <View style={{
                    height: 40,
                    width: 250,
                    marginTop: 40,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    elevation: 5,
                }}>
                    <Image
                        source={icons.My_Profile}
                        style={{
                            position: 'absolute',
                            left: 2,
                            tintColor: COLORS.red,
                            height: 30,
                            width: 30
                        }} />
                    <Text style={{
                        ...FONTS.h4,
                    }}>
                        John Dough
                    </Text>
                </View>

                <View style={{
                    height: 40,
                    width: 250,
                    marginTop: 10,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    elevation: 5,
                }}>
                    <Image
                        source={icons.Email}
                        style={{
                            position: 'absolute',
                            left: 2,
                            tintColor: COLORS.red,
                            height: 30,
                            width: 30
                        }} />
                    <Text style={{
                        ...FONTS.h4,
                    }}>
                        JohnDough@gmail.com
                    </Text>
                </View>

                <View style={{
                    height: 40,
                    width: 250,
                    marginTop: SIZES.base,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    elevation: 5
                }}>
                    <Image
                        source={icons.location}
                        style={{
                            position: 'absolute',
                            left: 2,
                            tintColor: COLORS.red,
                            height: 30,
                            width: 30
                        }} />
                    <Text style={{
                        ...FONTS.h4,
                    }}>
                        Caloocan City
                    </Text>
                </View>

                <View style={{
                    height: 40,
                    width: 250,
                    marginTop: SIZES.base,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    elevation: 5
                }}>
                    <Image
                        source={icons.Phone}
                        style={{
                            position: 'absolute',
                            left: 2,
                            tintColor: COLORS.red,
                            height: 30,
                            width: 30
                        }} />
                    <Text style={{
                        ...FONTS.h4,
                    }}>
                        09155583580
                    </Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.height,
            width: SIZES.width,
        }}>
            {/* Header */}
            {renderHeader()}

            {/* Edit Profile Button */}
            {renderEditProfileButton()}

            {/* Body */}
            {renderBody()}

            {/* Personal Information */}
            {renderPersonalInformation()}
        </View>
    )
}

export default MyAvatar;