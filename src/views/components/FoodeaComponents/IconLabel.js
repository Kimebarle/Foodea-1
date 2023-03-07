import React from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';

import { FONTS, SIZES } from "../../../constants/theme";

const IconLabel = ({ containerStyle, icon, iconStyle, label, labelStyle }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                paddingVertical: SIZES.base,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                ...containerStyle,
            }}
        >
            <Image source = {icon} 
            style = {{
                width: 25,
                height: 25,
                ...iconStyle, 
            }}/>

            <Text
            style = {{
                maringLeft: SIZES.base,
                fontSize: 15,
                ...labelStyle,
                paddingLeft: 10,
            }}>
                {label}
            </Text>
        </View>
    )
}

export default IconLabel;