import React from 'react';
import { View } from 'react-native';
import { icons, SIZES, COLORS, dummyData, FONTS } from "../../../constants";

const LineDivider = ({ lineStyle }) => {
    return (
        <View style={{
            height: 2,
            width: "100%",
            backgroundColor: COLORS.lightGray1,
            ...lineStyle,
            
        }}>
        </View>
    )
}

export default LineDivider;