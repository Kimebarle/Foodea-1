import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import {
    images,
    constants,
    SIZES,
    COLORS,
    icons,
    FONTS,
} from "../../../constants";
import { Header, TextButton, FormInput, IconButton, CheckBox, FormInputCheck } from '../../components/FoodeaComponents';

const UserDetails = ({ navigation }) => {

    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 80,
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                }}
                title={"User Details"}
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
                        <Image source={icons.backarrow}
                            style={{
                                borderRadius: SIZES.radius,
                                color: COLORS.gray2
                            }} />
                    </TouchableOpacity>
                }
                rightComponent={
                    <View style={{
                        width: 40,
                    }}></View>
                }
            />
        );
    }

    function renderLogo() {
        return (
            <View style={{
                marginTop: SIZES.padding,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: SIZES.padding,
            }}>
                <Image
                    source={images.profilepic}
                    resizeMode="contain"
                    style={{
                        width: 200,

                    }}
                />
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            height: SIZES.height,
            width: SIZES.width,
        }}>
            {/* HEADER */}
            {renderHeader()}


            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.radius,
                    paddingBottom: SIZES.padding,
                    justifyContent: 'center',
                    marginTop: SIZES.radius
                }}>
                {/* Logo */}
                {renderLogo()}
                {/* First Name */}
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: SIZES.padding }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'center',
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.Name}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                                position: 'absolute',
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h3, color: COLORS.black, }}>John</Text>
                    </View>

                    {/* Middle Name */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'center',
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            marginTop: SIZES.base,
                            borderRadius: SIZES.radius,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.Name}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                                position: 'absolute',
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h3, color: COLORS.black, }}></Text>
                    </View>

                    {/* Last Name */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'center',
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            marginTop: SIZES.base,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.Name}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                                position: 'absolute',
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h3, color: COLORS.black, }}>Dough</Text>
                    </View>

                    {/* Height */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'center',
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            marginTop: SIZES.base,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.height}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                                position: 'absolute',
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h3, color: COLORS.black, }}>167 cm</Text>
                    </View>

                    {/* Weight */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'center',
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            marginTop: SIZES.base,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.weight}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                                position: 'absolute',
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h3, color: COLORS.black, }}>65 kg</Text>
                    </View>

                    {/* Email */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'center',
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            marginTop: SIZES.base,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.at}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                                position: 'absolute',
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h3 }}>JohnDough@gmail.com</Text>
                    </View>

                    {/* Phone Number */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'center',
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            marginTop: SIZES.base,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.phone}
                            style={{
                                height: 25,
                                width: 25,
                                tintColor: COLORS.black,
                                position: 'absolute',
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h3 }}>09123456789</Text>
                    </View>

                    {/* Phone Number */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'center',
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            marginTop: SIZES.base,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.Lock}
                            style={{
                                height: 25,
                                width: 25,
                                tintColor: COLORS.black,
                                position: 'absolute',
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h3 }}>Password</Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default UserDetails;