import axios from "axios";
import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import AuthContext from "../../../api/context/auth/AuthContext";
import { BASE_URL } from "../../../api/context/auth/config";
import utils, { Utils } from "../../../utils/Utils";
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
    Button,
    TextInput
} from "../../components/FoodeaComponents";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditNames = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const [firstname, setFirstName] = React.useState("");
    const [firstnameError, setFirstNameError] = React.useState("");
    const [middleName, setMiddleName] = React.useState("");
    const [middleNameError, setMiddleNameError] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [lastnameError, setLastNameError] = React.useState("");
    const [data, setData] = React.useState();
    const [next, setNext] = React.useState();
    const [date, setDate] = React.useState(new Date());
    const [showPicker, setShowPicker] = React.useState(false);
    const [age, setAge] = React.useState(0);

    const handleDateChange = (event, selectedDate) => {
        setShowPicker(false);
        setDate(selectedDate);
        calculateAge(selectedDate);
    };

    const calculateAge = (birthdate) => {
        const ageInMillis = Date.now() - birthdate.getTime();
        const ageInYears = ageInMillis / 1000 / 60 / 60 / 24 / 365;
        setAge(Math.floor(ageInYears));
    };

    const showDatePicker = () => {
        setShowPicker(true);
    };

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

    const HandleSubmit = () => {
        console.log("Saved Details")
    }

    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 80,
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                }}
                title={"Edit Details"}
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
                backgroundColor: COLORS.white
            }}
        >
            {/* HEADER */}
            {renderHeader()}

            <View style={{ marginTop: SIZES.padding, }}>

                <View style={{
                    alignItems: 'center',
                }}>
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                            marginBottom: SIZES.radius,
                            width: 300
                        }}
                        label="First Name"
                        value={firstname}
                        placeholder={isLoading ? "Josh" : data[0].firstname}
                        maxLength={15}
                        onChange={(value) => {
                            setFirstName(value);
                            utils.validateInput(value, 1, setFirstNameError);
                        }}
                        errorMsg={firstnameError}
                        appendComponent={
                            <FormInputCheck value={firstname} error={firstnameError} />
                        }
                    />
                </View>

                <View style={{
                    alignItems: 'center',
                }}>

                    {/* Middle Name */}
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                            marginBottom: SIZES.radius,
                            width: 300
                        }}
                        label="Middle Name"
                        value={middleName}
                        placeholder={isLoading ? "Josh" : data[0].middlename}
                        maxLength={15}
                        onChange={(value) => {
                            setMiddleName(value);
                            utils.validateInput(value, 1, setMiddleNameError);
                        }}
                        errorMsg={middleNameError}
                        appendComponent={
                            <FormInputCheck value={middleName} error={middleNameError} />
                        }
                    />
                </View>

                <View style={{
                    alignItems: "center",
                }}>

                    {/* Last Name */}
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                            marginBottom: SIZES.radius,
                            width: 300
                        }}
                        label="Last Name"
                        value={lastname}
                        placeholder={isLoading ? "Josh" : data[0].lastname}
                        maxLength={15}
                        onChange={(value) => {
                            setLastName(value);
                            utils.validateInput(value, 1, setLastNameError);
                        }}
                        errorMsg={lastnameError}
                        appendComponent={
                            <FormInputCheck value={lastname} error={lastnameError} />
                        }
                    />
                </View>

                <View style={{
                    justifyContent: 'flex-start',
                }}>
                    {/* Birthday */}
                    <Text
                        style={{
                            color: COLORS.black,
                            ...FONTS.h3,
                            fontSize: 15,
                            marginTop: SIZES.base,
                            marginLeft: SIZES.padding
                        }}
                    >
                        Birthday
                    </Text>
                </View>

                <View
                    style={{
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Birthday"
                            editable={false}
                            value={date.toLocaleDateString()}
                        />
                        <View
                            style={{
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity style={{
                                marginLeft: SIZES.base
                            }}
                                onPress={showDatePicker}
                            >
                                <Image
                                    source={require("../../../../assets/img/icons/calendar.png")}
                                    style={{
                                        height: 25,
                                        width: 25,
                                        tintColor: COLORS.primary
                                    }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>

                <View style = {{ 
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={HandleSubmit}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 50,
                                width: 300,
                                backgroundColor: COLORS.primary,
                                borderRadius: SIZES.radius,
                                marginTop: 100,
                                elevation: 5,
                            }}
                        >
                            {/* <Image
                                source={icons.edit}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.white,
                                    position: "absolute",
                                    right: 15

                                }}
                            /> */}

                            <Text style={{ ...FONTS.h3, color: COLORS.white }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


export default EditNames;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: 270,
        height: 50,
    },
});