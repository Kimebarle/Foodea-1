import React from 'react'
import { Text as XText } from 'react-native'
import Colors from '../../../utils/Colors'

export const Text = ({
    children,
    style,
    weight = 'light',
    color,
    center,
    size,
    numberOfLines,
    adjustsFontSizeToFit,
    flex = false,
}) => {
    let fontStyle = ''
    let fontColor = color ? { color: color } : { color: Colors.black }
    let fontSize = size ? { fontSize: size } : {}
    let fontCenter = center ? { textAlign: 'center' } : {}
    let flexStyle = flex ? { flex: 1 } : {}

    switch (weight) {
        case 'semi-bold':
            fontStyle = 'Poppins-SemiBold'
            break
        case 'bold':
            fontStyle = 'Poppins-Bold'
            break
        case 'light':
            fontStyle = 'Poppins-Light'
            break
        case 'medium':
            fontStyle = 'Poppins-Medium'
            break
        default:
            fontStyle = 'Poppins-Light'
    }

    return (
        <XText
            style={{
                ...style,
                fontFamily: fontStyle,
                ...fontColor,
                ...fontSize,
                ...fontCenter,
                ...flexStyle,
            }}
            numberOfLines={numberOfLines}
            adjustsFontSizeToFit={adjustsFontSizeToFit}
        >
            {children}
        </XText>
    )
}

export default Text
