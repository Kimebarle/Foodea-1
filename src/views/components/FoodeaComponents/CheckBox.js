import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import {
    images,
    constants,
    SIZES,
    COLORS,
    icons,
    FONTS,
} from "../../../constants";

const CheckBox = ({ containerStyle, isSelected, onPress }) => {
    return(
        <TouchableOpacity
        style = {{
            flexDirection: 'row',
            ...containerStyle 
        }}
        onPress={onPress}
        >
            <View style = {{
                width: 25,
                height: 25,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.base,
                borderWidth: 3,
                borderColor: isSelected ? COLORS.primary : COLORS.gray,
                backgroundColor: isSelected ? COLORS.primary : null
            }}>
                {isSelected &&
                <Image
                source={icons.check}
                style = {{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.lightGray1
                }}
                />
                }
            </View>
            <Text style = {{
                flex: 1,
                marginLeft: SIZES.base,
                ...FONTS.h5,
                lineHeight: 15,
                color: COLORS.black
            }}>
                By registering, you agree to our Terms and that you have read our Data Use Policy.
            </Text>
        </TouchableOpacity>
    )
}

export default CheckBox;