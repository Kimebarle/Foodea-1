import React from 'react';
import { View, Text, Image } from 'react-native';
import {
    images,
    constants,
    SIZES,
    COLORS,
    icons,
    FONTS,
    dummyData
} from "../../../constants";
import TextInput from "./TextInput";


const Input = ({ label, iconName, error, password, onFocus = () => {}, ...props }) => {
    return (
        <View style = {{
            marginBottom: SIZES.radius
        }}>
            <Text style = {{
                marginVertical: 5,
                fontSize: 15,
                color: COLORS.gray
            }}>
                {label}
            </Text>
            <View style = {{
                height: 55,
                backgroundColor: COLORS.white,
                flexDirection: 'row',
                paddingHorizontal: 15,
                alignItems: 'center',
                borderRadius: SIZES.radius
            }}>
                <Image
                source={icons.Email}
                style = {{
                    height: 30,
                    width: 30,
                    tintColor: COLORS.gray
                }}/>
            <TextInput {...props}/>
            </View>
        </View>
    )
}

export default Input;