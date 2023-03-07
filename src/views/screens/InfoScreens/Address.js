import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { icons, SIZES, COLORS, dummyData, FONTS, images } from "../../../constants";
import { Header, IconButton, TextButton, CardItem, FooterTotal, LineDivider, FormInput } from "../../components/FoodeaComponents";

const Address = ({ navigation }) => {

    const [currentStep, setCurrentStep] = React.useState(1)
    const [address, setAddress] = React.useState("")


    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 80,
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                }}
                title={"Address"}
                leftComponent={
                    // Open Custom 

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

    function renderInfo() {
        return (
            <View style={{
                position: 'absolute',
                bottom: 0,
                width: "100%",

            }}>
                {/* Info Container */}
                <View style={{
                    padding: SIZES.padding,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: COLORS.white,
                }}>
                    <TouchableOpacity>
                        <Image
                            source={icons.edit}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.gray,
                                position: 'absolute',
                                right: 0,
                                bottom: -15,
                            }}
                        />
                    </TouchableOpacity>
                    {/* Address  */}
                    <FormInput
                        label="Address"
                        placeholder="Phase 7B Package 1 Block 57 Excess Lot"
                        value={address}
                        maxLength={15}
                        containerStyle={{
                            flex: 1,
                        }}
                        onChange={(value) => {
                            utils.validateInput(value, 1, setFirstNameError);
                            setFirstName(value);
                        }}
                    />

                    {/* Continue Button */}
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        height: 70,
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        paddingHorizontal: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.primary,
                    }}
                        onPress={() => navigation.navigate("AnotherOrder")}>
                        <Text style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View
            style={{
                flex: 1,
                height: SIZES.height,
                width: SIZES.width,
            }}
        >
            {/* Header */}
            {renderHeader()}
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={images.Map}
                />
            </View>

            {/* Info */}
            {renderInfo()}

        </View>
    )
}

export default Address;