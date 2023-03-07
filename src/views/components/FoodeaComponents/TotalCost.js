import React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { FONTS, SIZES, COLORS } from '../../../constants';
import LinearGradient from "react-native-linear-gradient";

const TotalCost = ({ total, onPress }) => {
    return (
        <View>
            {/* Order Details */}
            <View style={{ padding: SIZES.padding, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: COLORS.white, elevation: 5}}>
                <View style={{ paddingLeft: 5}}>
                    <Text style = {{fontSize: 30, fontWeight: 'bold'}}>
                        Total
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 1, paddingBottom: 40}}>
                    <View style={{ height: 50, width: 150, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', borderRadius: SIZES.radius, elevation: 5}}>
                        <Text style={{ fontSize: 20, }}>
                            $ 300
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{ height: 50, width: 150, backgroundColor: '#F54748', justifyContent: 'center', alignItems: 'center', borderRadius: SIZES.radius, }}>
                            <Text style={{
                                fontWeight: 'bold', fontSize: 20, color: COLORS.white,
                            }}>
                                Buy Now
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default TotalCost;