import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../../constants/theme';

const IconButton = ({containerStyle, icon, iconStyle, onPress}) => {
    return (
        <TouchableOpacity
        style = {{
            ...containerStyle
        }}
        onPress={onPress}
        >
            <Image source={icon}
            style = {{
                width: 30,
                height: 30,
                tintColor: COLORS.black,
                ...iconStyle
            }}/>
        </TouchableOpacity>
    )
}

export default IconButton;