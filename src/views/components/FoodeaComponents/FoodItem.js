import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { icons, SIZES, COLORS, images, dummyData, FONTS } from "../../../constants";
import { StepperInput } from "../../components/FoodeaComponents/StepperInput";
const FoodItem = ({
    image,
    containerStyle, item, imageStyle,
}) => {
    return (
        <ScrollView>
            <View style={{ paddingTop: 20, }}>
                <View
                    style={{
                        flexDirection: "row",
                        borderRadius: 15,
                        backgroundColor: "#FAF9F6",
                        ...containerStyle,
                    }}
                >
                    {/* image */}
                    <Image source={require("../../../../assets/img/dummyData/hamburger.png")} style={imageStyle} />
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        {/* price */}
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "bold",
                            }}
                        >
                            $ 15.99
                            {'\n'}
                            {/* name */}
                            <Text style={{ fontSize: 17, marginLeft: 10, fontWeight: "bold" }}>
                                Burger
                            </Text>
                        </Text>
                        {/* Add and Minus Quantity*/}
                        <View style={{
                            bottom: 8,
                            left: 100,
                            width: SIZES.width,
                            height: 25,
                            flexDirection: "row",
                            position: "absolute",
                            flex: 1,
                        }}>
                            <TouchableOpacity
                                style={{
                                    width: 30,
                                    backgroundColor: COLORS.white,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopLeftRadius: 25,
                                    borderBottomLeftRadius: 25,

                                }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    -
                                </Text>
                            </TouchableOpacity>

                            <View style={{
                                width: 30,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    5
                                </Text>
                            </View>
                            <TouchableOpacity style={{
                                width: 30,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25,
                            }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <View
                    style={{
                        flexDirection: "row",
                        borderRadius: 15,
                        backgroundColor: "#FAF9F6",
                        ...containerStyle,
                    }}
                >
                    {/* image */}
                    <Image source={require("../../../../assets/img/dummyData/hot_tacos.png")} style={imageStyle} />
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        {/* price */}
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "bold",
                            }}
                        >
                            $ 10.99
                            {'\n'}
                            {/* name */}
                            <Text style={{ fontSize: 17, marginLeft: 10, fontWeight: "bold" }}>
                                Hot Tacos
                            </Text>
                        </Text>
                        {/* Add and Minus Quantity*/}
                        <View style={{
                            bottom: 10,
                            left: 100,
                            width: SIZES.width,
                            height: 25,
                            flexDirection: "row",
                            flex: 1,
                            position: "absolute",
                        }}>
                            <TouchableOpacity
                                style={{
                                    width: 30,
                                    backgroundColor: COLORS.white,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopLeftRadius: 25,
                                    borderBottomLeftRadius: 25,

                                }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    -
                                </Text>
                            </TouchableOpacity>

                            <View style={{
                                width: 30,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    5
                                </Text>
                            </View>
                            <TouchableOpacity style={{
                                width: 30,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25,
                            }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

                <View
                    style={{
                        flexDirection: "row",
                        borderRadius: 15,
                        backgroundColor: "#FAF9F6",
                        ...containerStyle,
                    }}
                >
                    {/* image */}
                    <Image source={require("../../../../assets/img/dummyData/veg_biryani.png")} style={imageStyle} />
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        {/* price */}
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "bold",
                            }}
                        >
                            $ 10.99
                            {'\n'}
                            {/* name */}
                            <Text style={{ fontSize: 17, marginLeft: 10, fontWeight: "bold" }}>
                                Veg Biryani
                            </Text>
                        </Text>
                        {/* Add and Minus Quantity*/}
                        <View style={{
                            bottom: 10,
                            left: 100,
                            width: SIZES.width,
                            height: 25,
                            flexDirection: "row",
                            position: "absolute",
                            flex: 1,
                        }}>
                            <TouchableOpacity
                                style={{
                                    width: 30,
                                    backgroundColor: COLORS.white,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopLeftRadius: 25,
                                    borderBottomLeftRadius: 25,

                                }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    -
                                </Text>
                            </TouchableOpacity>

                            <View style={{
                                width: 30,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    5
                                </Text>
                            </View>
                            <TouchableOpacity style={{
                                width: 30,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25,
                            }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        borderRadius: 15,
                        backgroundColor: "#FAF9F6",
                        ...containerStyle,
                    }}
                >
                    {/* image */}
                    <Image source={require("../../../../assets/img/dummyData/veg_biryani.png")} style={imageStyle} />
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        {/* price */}
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "bold",
                            }}
                        >
                            $ 10.99
                            {'\n'}
                            {/* name */}
                            <Text style={{ fontSize: 17, marginLeft: 10, fontWeight: "bold" }}>
                                Veg Biryani
                            </Text>
                        </Text>
                        {/* Add and Minus Quantity*/}
                        <View style={{
                            bottom: 10,
                            left: 100,
                            width: SIZES.width,
                            height: 25,
                            flexDirection: "row",
                            position: "absolute",
                            flex: 1,
                        }}>
                            <TouchableOpacity
                                style={{
                                    width: 30,
                                    backgroundColor: COLORS.white,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopLeftRadius: 25,
                                    borderBottomLeftRadius: 25,

                                }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    -
                                </Text>
                            </TouchableOpacity>

                            <View style={{
                                width: 30,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    5
                                </Text>
                            </View>
                            <TouchableOpacity style={{
                                width: 30,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25,
                            }}>
                                <Text style={{
                                    ...FONTS.h3
                                }}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>

    );
};

export default FoodItem;

const styles = StyleSheet.create({});
