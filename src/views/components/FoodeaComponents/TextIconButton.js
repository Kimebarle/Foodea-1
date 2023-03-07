import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { icons, SIZES, COLORS, dummyData, FONTS, images } from "../../../constants";

const TextIconButton = ({
    containerStyle,
    label,
    labelStyle,
    icons,
    iconsStyle,
    iconsPosition,
    onPress
}) => {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            ...containerStyle
        }}
            onPress={onPress}
        >
            {iconsPosition == "LEFT" &&
                <Image
                    source={icons}
                    style={{
                        ...styles.image,
                        ...iconsStyle
                    }}
                />
            }

            <Text style = {{
                ...FONTS.body3,
                ...labelStyle,
            }}>
                {label}
            </Text>

            {iconsPosition == "RIGHT" && 
            <Image
            source={icons}
            style = {{
                ...styles.image,
                ...iconsStyle
            }}
            />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        marginLeft: 5,
        width: 20,
        height: 20,
        tintColor: COLORS.black,
    }
})
export default TextIconButton;
