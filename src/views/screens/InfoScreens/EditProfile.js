import React from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
    Header,
    EditButton,
    TextButton,
    TextInput,
    FormInput,
    FormInputCheck,
    IconButton,
    CheckBox,
} from "../../components/FoodeaComponents";
import { icons, SIZES, COLORS, dummyData, FONTS, images } from "../../../constants";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditProfile = ({ navigation, route }) => {

    const [showPassword, setShowPasswod] = React.useState(false)
    const [resetshowPassword, setResetShowPasswod] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [name, setName] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [resetpassword, setResetPassword] = React.useState("")
    const [termsChecked, setTermsChecked] = React.useState(false)
    const [reshowPassword, setReShowPasswod] = React.useState(false);
    const [firstname, setFirstName] = React.useState("");
    const [firstNameError, setFirstNameError] = React.useState("");
    const [middlename, setMiddleName] = React.useState("");
    const [middleNameError, setMiddleNameError] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [lastNameError, setLastNameError] = React.useState("");
    const [height, setHeight] = React.useState("");
    const [heightError, setHeightError] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [weightError, setWeightError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [phoneError, setPhoneError] = React.useState("");
    const [reenterpassword, setReEnterPassword] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [genderError, setGenderError] = React.useState("");
    const [bmi, setBmi] = React.useState();




    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 80,
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                }}
                title={"Edit Profile"}
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
                    <View style={{
                        width: 40,
                    }}>
                    </View>
                }
            />
        )
    }

    function renderForm() {
        return (
            <View style={{
                flex: 1,
                width: 350,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
            }}>
                <View style={{
                    marginBottom: SIZES.base
                }}>
                    <Text style={{
                        width: "100%",
                        lineHeight: 60,
                        color: COLORS.dark,
                        ...FONTS.h1
                    }}>
                        Edit your details
                    </Text>
                </View>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps={"handled"}
                    extraScrollHeight={-200}
                    contentContainerStyle={{
                        marginTop: SIZES.base,
                        flexGrow: 1,
                        paddingBottom: SIZES.padding * 2
                    }}
                >
                    {/* First Name */}
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                        }}
                        label="First Name"
                        value={firstname}
                        onChange={(value) => {
                            utils.validateInput(value, 1, setFirstNameError);
                            setFirstName(value);
                        }}
                        errorMsg={firstNameError}
                        appendComponent={
                            <FormInputCheck value={firstname} error={firstNameError} />
                        }
                    />

                    {/* MIDDLE NAME */}
                    <FormInput
                        label="Middle Name"
                        value={middlename}
                        containerStyle={{
                            flex: 1,
                        }}
                        onChange={(value) => {
                            utils.validateInput(value, 1, setMiddleNameError);
                            setMiddleName(value);
                        }}
                        errorMsg={middleNameError}
                        appendComponent={
                            <FormInputCheck value={middlename} error={middleNameError} />
                        }
                    />

                    {/* LAST NAME */}
                    <FormInput
                        label="Last Name"
                        value={lastname}
                        containerStyle={{
                            flex: 1,
                        }}
                        onChange={(value) => {
                            utils.validateInput(value, 1, setLastNameError);
                            setLastName(value);
                        }}
                        errorMsg={lastNameError}
                        appendComponent={
                            <FormInputCheck value={lastname} error={lastNameError} />
                        }
                    />

                    {/* Gender */}
                    <FormInput
                        label="Gender"
                        placeholder="M or F"
                        value={gender}
                        maxLength={6}
                        containerStyle={{
                            flex: 1,
                        }}
                        onChange={(value) => {
                            utils.validateInput(value, 1, setGenderError);
                            setGender(value);
                        }}
                        errorMsg={genderError}
                        appendComponent={
                            <FormInputCheck value={gender} error={genderError} />
                        }
                    />

                    {/* Height and Weight */}
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: SIZES.radius,
                        }}
                    >
                        <FormInput
                            label="Height"
                            value={height}
                            placeholder="cm"
                            keyboardType="number-pad"
                            maxLength={3}
                            containerStyle={{
                                flex: 1,
                            }}
                            onChange={(value) => {
                                utils.validateInput(value, 1, setHeightError);
                                setHeight(value);
                            }}
                            errorMsg={heightError}
                            appendComponent={
                                <FormInputCheck value={height} error={heightError} />
                            }
                        />

                        <FormInput
                            label="Weight"
                            value={weight}
                            maxLength={2}
                            placeholder="kg"
                            keyboardType="number-pad"
                            containerStyle={{
                                flex: 1,
                                marginLeft: SIZES.radius,
                            }}
                            onChange={(value) => {
                                utils.validateInput(value, 1, setWeightError);
                                setWeight(value);
                            }}
                            errorMsg={weightError}
                            appendComponent={
                                <FormInputCheck value={weight} error={weightError} />
                            }
                        />
                    </View>

                    {/* Email */}
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                        }}
                        label="Email"
                        value={email}
                        onChange={(value) => {
                            utils.validateInput(value, 1, setEmailError);
                            setEmail(value);
                        }}
                        errorMsg={emailError}
                        appendComponent={
                            <FormInputCheck value={email} error={emailError} />
                        }
                    />

                    {/* Phone Number */}
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                        }}
                        label="Phone Number"
                        value={phone}
                        maxLength={13}
                        keyboardType="number-pad"
                        onChange={(value) => {
                            setPhone(
                                value
                                    .replace(/\s/g, "")
                                    .replace(/(\d{4})/g, "$1 ")
                                    .trim()
                            );
                            utils.validateInput(value, 13, setPhoneError);
                        }}
                        errorMsg={phoneError}
                        appendComponent={
                            <FormInputCheck value={phone} error={phoneError} />
                        }
                    />

                    {/* Password */}
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                        }}
                        label="Password"
                        value={password}
                        secureTextEntry={!showPassword}
                        onChange={(text) => setPassword(text)}
                        appendComponent={
                            <IconButton
                                icon={showPassword ? icons.disable_eye : icons.eye}
                                iconStyle={{
                                    tintColor: COLORS.gray,
                                    width: 20,
                                    height: 20,
                                    marginLeft: SIZES.base,
                                    position: "absolute",
                                    right: 0,
                                    top: 12,
                                }}
                                onPress={() => setShowPasswod(!showPassword)}
                            />
                        }
                    />


                    {/* Re-Enter Password */}
                    <FormInput
                        containerStyle={{
                            borderRadius: SIZES.radius,
                        }}
                        label="Re-Enter Password"
                        value={reenterpassword}
                        secureTextEntry={!reshowPassword}
                        onChange={(text) => setReEnterPassword(text)}
                        appendComponent={
                            <IconButton
                                icon={reshowPassword ? icons.disable_eye : icons.eye}
                                iconStyle={{
                                    tintColor: COLORS.gray,
                                    width: 20,
                                    height: 20,
                                    marginLeft: SIZES.base,
                                    position: "absolute",
                                    right: 0,
                                    top: 12,
                                }}
                                onPress={() => setReShowPasswod(!reshowPassword)}
                            />
                        }
                    />
                    <TextButton
                        label="Save Details"
                        buttonContainerStyle={{
                            marginTop: SIZES.radius,
                            marginBottom: SIZES.padding,
                            height: 55,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary,
                        }}
                        onPress={() => console.log("Saved Details")}
                    />

                </KeyboardAwareScrollView >

            </View >
        )
    }

    function renderImage() {
        return (
            <View style={{
                marginTop: SIZES.padding,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: SIZES.padding,
            }}>
                <Image
                    source={require("../../../../assets/img/images/Sample.png")}
                    resizeMode="contain"
                    style={{
                        width: 130
                    }}
                />
            </View>
        )
    }

    return (
        <View
            style={{
                alignItems: 'center',
                height: SIZES.height,
                width: SIZES.width,
            }}
        >
            {/* Header */}
            {renderHeader()}

            <ScrollView>
                {/* Form */}
                {renderForm()}
            </ScrollView>

        </View>
    )
}

export default EditProfile;
