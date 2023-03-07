import React from "react";
import { View, Text, TextInput } from 'react-native';
import { icons, SIZES, COLORS, dummyData, FONTS, images } from "../../../constants";
import IconButton from "./IconButton";

const FormInput = ({
    containerStyle,
    inputContainerStyle,
    label,
    placeholder,
    inputStyle,
    value = "",
    prependComponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType = "default",
    autoCompleteType = "off",
    autoCapitalize = "none",
    errorMsg = "",
    maxLength
}) => {
    return (
        <View style={{
            ...containerStyle
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Text style={{ color: COLORS.gray, ...FONTS.h4 }}>
                    {label}
                </Text>

                <Text style={{ color: COLORS.red, ...FONTS.h4 }}>
                    {errorMsg}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row',
                height: SIZES.height > 800 ? 55 : 45,
                paddingHorizontal: SIZES.padding,
                marginTop: SIZES.height > 800 ? SIZES.base : 0,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...inputContainerStyle
            }}>
                {
                    prependComponent
                }
                <TextInput
                    style={{ flex: 1, ...inputStyle }}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onChangeText={(text) => onChange(text)}
                />

                {
                    appendComponent
                }
            </View>
        </View>
    )
}

export default FormInput;