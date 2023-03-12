import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import {
    dummyData,
    icons,
    images,
    COLORS,
    SIZES,
    constants,
    FONTS,
} from "../../../constants";
import { Header } from "../../components/FoodeaComponents";


const MyCartScreen = ({ navigation }) => {
    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 80,
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                }}
                title={"My Cart"}
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

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                height: SIZES.height,
                width: SIZES.width,
            }}
        >
            {renderHeader()}

            <TouchableOpacity
                onPress={() => navigation.navigate("CartScreen")}
                style={{
                    marginBottom: SIZES.base,
                }}>
                <View style={{
                    position: 'absolute',
                    right: 20,
                }}>
                    <Text style={{
                        ...FONTS.h3,
                        color: COLORS.primary
                    }}>
                        Go to cart
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={{
                flex: 1,
            }}>
                <FlatList
                    data={dummyData.my_cart}
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{
                                marginTop: SIZES.radius,
                            }}>
                                <View
                                    style={{
                                        flex: 1,
                                        alignSelf: "center",
                                        justifyContent: "center",
                                        width: "90%",
                                        height: 100,
                                        backgroundColor: COLORS.lightGray2,
                                        flexDirection: "row",
                                        marginTop: SIZES.base,
                                        borderRadius: SIZES.radius
                                    }}
                                >
                                    
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <View style={{ marginRight: SIZES.base}}>
                                            <Text style={{ ...FONTS.h3, marginBottom: 5, color: COLORS.primary }}>
                                                {item.name}
                                            </Text>
                                            <Text style={{ ...FONTS.h5 }}>
                                                {item.quantity} item • {item.time} mins • {item.distance} km
                                            </Text>
                                        </View>
                                    </View>

                                    <Image
                                        source={item.icon}
                                        style={{
                                            height: 80,
                                            width: 80,
                                            alignSelf: 'center',
                                            marginLeft: 40,
                                        }}
                                    />

                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default MyCartScreen;

const styles = StyleSheet.create({});
