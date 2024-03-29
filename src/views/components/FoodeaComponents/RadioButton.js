import React from "react";
import { TouchableOpacity, Text, Image } from 'react-native';
import { icons, SIZES, COLORS, dummyData, FONTS, images } from "../../../constants";

const RadioButton = ({ containerStyle, label, labelStyle, iconStyle, isSelected, onPress }) => {
    return(
        <TouchableOpacity style = {{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            ...containerStyle
        }}
        onPress={onPress}
        >
            <Image
            source = {isSelected ? icons.check_on : icons.check_off}
            style = {{
                marginLeft: 5,
                width: 20,
                height: 20,
                ...iconStyle,
            }}/>
            <Text style = {{
                marginLeft: SIZES.radius,
                color: COLORS.gray,
                ...FONTS.h3,
                ...labelStyle,
            }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default RadioButton;
