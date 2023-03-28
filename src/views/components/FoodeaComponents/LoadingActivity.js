import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    constants,
    dummyData,
} from "../../../constants";
import IconButton from "./IconButton";
import TextButton from "./TextButton";
import { useEffect } from "react";

const LoadingActivity = ({
    itemId,
    containerStyle,
    imageStyle,
    item,
    onPress,
    navigation
}) => {
    const [isFavorite, setIsFavorite] = React.useState(true);

    const favoriteHandler = () => {
        console.log(itemId);
        setIsFavorite(!isFavorite);
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', ...containerStyle }}>
            {/* image */}
            <Image
                source={require("../../../../assets/img/images/Banner2.png")}
                style={imageStyle}
            />
            <View style={{ flex: 1, alignItems: 'center' }}>

                {/* name */}
                <Text style={{ fontSize: 20, fontWeight: "bold", }}>
                    You don't have any activities yet
                </Text>

                {/* distance and waiting time */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>Just click the order now to discover the app. </Text>
                </View>
            </View>

            <TextButton
                label="Order Now"
                buttonContainerStyle={{
                    marginTop: SIZES.radius,
                    height: 55,
                    width: 150,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                onPress={onPress}
            />
        </View>
    );
};

export default LoadingActivity;
