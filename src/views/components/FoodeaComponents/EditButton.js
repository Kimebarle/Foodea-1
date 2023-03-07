import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    constants,
    dummyData,
} from "../../../constants";

const EditButton = ({ label, labelStyle, buttonContainerStyle, onPress, }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#F54748",
                ...buttonContainerStyle
            }}
            onPress={onPress}
        >
            <Text style={{
                color: COLORS.white,
                ...FONTS.h3, ...labelStyle,
            }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default EditButton;