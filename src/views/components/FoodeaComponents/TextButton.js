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

const TextButton = ({ label, labelStyle, disabled, buttonContainerStyle, onPress, label2 = "", label2Style }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                ...buttonContainerStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text style={{
                color: COLORS.white,
                ...FONTS.h3, ...labelStyle,
            }}>
                {label}
            </Text>

            {label2 != "" &&
                <Text style = {{
                    flex: 1, 
                    textAlign: 'center',
                    color: COLORS.white,
                    ...FONTS.h3,
                    ...label2Style, 
                    marginLeft: 130
                }}>
                    {label2}
                </Text>}

        </TouchableOpacity>
    )
}

export default TextButton;