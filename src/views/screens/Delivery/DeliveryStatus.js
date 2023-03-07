import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { Header, LineDivider, TextButton, TextIconButton } from "../../components/FoodeaComponents";
import { icons, SIZES, COLORS, dummyData, FONTS, images } from "../../../constants";

const DeliveryStatus = ({ navigation, onPress }) => {

    const [currentStep, setCurrentStep] = React.useState(1)

    function renderHeader() {
        return (
            <Header
                title="Delivery Status"
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 20
                }} />
        )
    }

    function renderInfo() {
        return (
            <View style={{
                marginTop: SIZES.radius,
                paddingHorizontal: SIZES.padding
            }}>
                <Text style={{
                    textAlign: 'center', color: COLORS.gray, ...FONTS.h4
                }}>Estimated Delivery Time</Text>

                <Text style={{
                    textAlign: 'center', ...FONTS.h2
                }}>Febuary 18, 2023 / 5:00 pm</Text>
            </View>
        )
    }

    function renderTrackOrder() {
        return (
            <View style={{
                marginTop: SIZES.radius,
                paddingVertical: SIZES.padding,
                borderRadius: SIZES.radius,
                borderWidth: 2,
                borderColor: COLORS.lightGray2,
                backgroundColor: COLORS.white2
            }}>
                {/* Track Order */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    paddingHorizontal: SIZES.padding
                }}>
                    <Text style={{
                        ...FONTS.h3
                    }}>Track Order</Text>
                    <Text style={{
                        color: COLORS.gray, ...FONTS.h3,
                    }}>NGI012345</Text>
                </View>

                <LineDivider
                    lineStyle={{
                        backgroundColor: COLORS.lightGray2,
                    }} />

                {/* Status */}
                <View style={{
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}>
                    {dummyData.track_order_status.map((item, index) => {
                        return (
                            <View key={`StatusList-${index}`}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: -5
                                }}>
                                    <Image
                                        source={icons.check_circle}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            tintColor: index <= currentStep ? COLORS.primary : COLORS.lightGray1
                                        }}
                                    />
                                    <View style={{
                                        marginLeft: SIZES.radius
                                    }}>
                                        <Text style={{
                                            ...FONTS.h3
                                        }}>{item.title}</Text>
                                        <Text style={{
                                            color: COLORS.gray, ...FONTS.h4
                                        }}>{item.sub_title}</Text>
                                    </View>
                                </View>
                                {index < dummyData.track_order_status.length - 1 &&
                                    <View>
                                        {index < currentStep &&
                                            <View style={{
                                                height: 50,
                                                width: 3,
                                                marginLeft: 18,
                                                backgroundColor: COLORS.primary,
                                                zIndex: -1
                                            }}
                                            />
                                        }
                                        {index >= currentStep &&
                                            <Image
                                                source={icons.dottedline}
                                                resizeMode="cover"
                                                style={{
                                                    width: 4,
                                                    height: 50,
                                                    marginLeft: 17
                                                }}
                                            />
                                        }
                                    </View>
                                }
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View style={{
                marginTop: SIZES.radius,
                marginBottom: SIZES.padding
            }}>
                {currentStep < dummyData.track_order_status.length - 1 &&
                    <View style={{
                        flexDirection: 'row',
                        height: 55
                    }}>
                        {/* Cancel */}
                        <TextButton
                            buttonContainerStyle={{
                                width: "40%",
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.lightGray2
                            }}
                            label="Cancel"
                            labelStyle={{
                                color: COLORS.primary
                            }}
                            onPress={() => navigation.goBack()}
                        />
                        {/* Map */}
                        <TextIconButton
                            containerStyle={{
                                flex: 1,
                                marginLeft: SIZES.radius,
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.primary
                            }}
                            label="View Map"
                            labelStyle={{
                                color: COLORS.white,
                                ...FONTS.h3
                            }}
                            icons={icons.map}
                            iconsPosition="LEFT"
                            iconsStyle={{
                                width: 25,
                                height: 25,
                                marginRight: SIZES.base,
                                tintColor: COLORS.white,
                            }}
                            onPress={() => navigation.navigate("Map")}
                        />
                    </View>
                }

                {currentStep == dummyData.track_order_status.length - 1 &&
                    <TextButton
                        buttonContainerStyle={{
                            height: 55,
                            borderRadius: SIZES.base
                        }}
                        label="DONE"
                        onPress={() => navigation.navigate("FoodInfo")}
                    />
                }
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Info */}
            {renderInfo()}

            {/* Track Order */}
            <ScrollView
                showsHorizontalScrollIndicator={false}
            >
                {renderTrackOrder()}
            </ScrollView>

            {/* Footer */}
            {renderFooter()}

        </View>
    )
}

export default DeliveryStatus;