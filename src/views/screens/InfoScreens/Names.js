import axios from "axios";
import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import AuthContext from "../../../api/context/auth/AuthContext";
import { BASE_URL } from "../../../api/context/auth/config";
import {
    images,
    constants,
    SIZES,
    COLORS,
    icons,
    FONTS,
} from "../../../constants";
import {
    Header,
    TextButton,
    FormInput,
    IconButton,
    CheckBox,
    FormInputCheck,
    EditButton,
} from "../../components/FoodeaComponents";

const Names = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState();
    const [next, setNext] = React.useState();
    const getUserData = async () => {
        const userID = user.user_id;
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}app_users/${userID}`);
        setData(response.data);
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        getUserData();
    }, []);

    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 80,
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                }}
                title={"Name's"}
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: 1,
                            borderColor: COLORS.gray2,
                            borderRadius: SIZES.radius,
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={icons.backarrow} style={{ color: COLORS.gray2 }} />
                    </TouchableOpacity>
                }
                rightComponent={
                    <View
                        style={{
                            width: 40,
                        }}
                    ></View>
                }
            />
        );
    }



    return (
        <View
            style={{
                flex: 1,
                height: SIZES.height,
                width: SIZES.width,
            }}
        >
            {/* HEADER */}
            {renderHeader()}

            <View style={{ flex: 1, marginTop: SIZES.padding }}>

                <View style={{
                    alignItems: 'center',
                    marginBottom: SIZES.padding
                }}>
                    {/* First Name */}
                    <Text
                        style={{
                            color: COLORS.black,
                            ...FONTS.h3,
                            fontSize: 15,
                            marginTop: SIZES.base
                        }}
                    >
                        First Name
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.Name}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                                position: "absolute",
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h3, color: COLORS.black }}>
                            {isLoading ? "Josh" : data[0].firstname}
                        </Text>
                    </View>
                </View>

                <View style={{
                    alignItems: 'center',
                    marginBottom: SIZES.padding,
                }}>

                    <Text
                        style={{
                            color: COLORS.black,
                            ...FONTS.h3,
                            fontSize: 15,
                            marginTop: SIZES.base
                        }}
                    >
                        Middle Name
                    </Text>

                    {/* Middle Name */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            marginTop: SIZES.base,
                            borderRadius: SIZES.radius,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.Name}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                                position: "absolute",
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h3, color: COLORS.black }}>
                            {isLoading ? "Josh" : data[0].middlename}
                        </Text>
                    </View>
                </View>

                <View style={{
                    alignItems: "center",
                }}>
                    <Text
                        style={{
                            color: COLORS.black,
                            ...FONTS.h3,
                            fontSize: 15,
                            marginTop: SIZES.base
                        }}
                    >
                        Last Name
                    </Text>

                    {/* Last Name */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 300,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            marginTop: SIZES.base,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={icons.Name}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.black,
                                position: "absolute",
                                left: 5,
                                right: 0,
                            }}
                        />
                        <Text style={{ ...FONTS.h3, color: COLORS.black }}>
                            {isLoading ? "Josh" : data[0].lastname}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};


export default Names;