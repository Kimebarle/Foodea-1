import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FormInput, Header, IconButton, TextButton, FormInputCheck, RadioButton } from "../../components/FoodeaComponents";
import { icons, SIZES, COLORS, dummyData, FONTS, images } from "../../../constants";
import utils, { Utils } from "../../../utils/Utils";


const AddCard = ({ navigation, route }) => {

    const [selectedCard, setSelectedCard] = React.useState(null)
    const [cardNumber, setCardNumber] = React.useState("")
    const [cardNumberError, setCardNumberError] = React.useState("")
    const [cardName, setCardName] = React.useState("")
    const [cardNameError, setCardNameError] = React.useState("")
    const [expiryDate, setExpiryDate] = React.useState("")
    const [expiryDateError, setExpiryDateError] = React.useState("")
    const [cvv, setCvv] = React.useState("")
    const [cvvError, setCvvError] = React.useState("")
    const [isRemember, setIsRemember] = React.useState(false)

    React.useEffect(() => {
        let { selectedCard } = route.params
        setSelectedCard(selectedCard)
    }, [])

    function isEnableAddCard() {
        return cardNumber != "" && cardName != "" && expiryDate != "" && cvv != "" && cardNumberError == "" && cardNameError == "" &&
        expiryDateError == "" && cvvError == "" 
    }

    function renderHeader() {
        return (
            <Header
                containerStyle={{
                    height: 80,
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                }}
                title={"ADD NEW CARD"}
                leftComponent={
                    // Open Custom 

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

    function renderCard() {
        return (
            <ImageBackground
                source={images.card}
                style={{
                    height: 200,
                    marginTop: SIZES.radius,
                    borderRadius: SIZES.radius,
                    overflow: 'hidden',
                }}
            >
                {/* logo */}
                <Image
                    source={selectedCard?.image}
                    resizeMode="contain"
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 20,
                        height: 70,
                        width: 80
                    }}
                />

                {/* Details */}
                <View style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 0,
                    right: 0,
                    paddingHorizontal: SIZES.padding
                }}>
                    <Text style={{
                        color: COLORS.white,
                        ...FONTS.h3
                    }}>
                        {cardName}
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
                            {cardNumber}
                        </Text>
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                            {expiryDate}
                        </Text>
                    </View>
                </View>

            </ImageBackground>
        )
    }

    function renderForm() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLORS.white,
                marginTop: SIZES.padding * 2
            }}>

                {/* Card Number */}
                <FormInput
                    label="Card Number"
                    keyboardType="number-pad"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(value) => {
                        setCardNumber(value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim())
                        utils.validateInput(value, 19, setCardNumberError)
                    }}
                    errorMsg={cardNumberError}
                    appendComponent={
                        <FormInputCheck
                            value={cardNumber}
                            error={cardNumberError} />
                    }
                />

                {/* Card Holder Name */}
                <FormInput
                    label="Card Holder Name"
                    value={cardName}
                    containerStyle={{
                        marginTop: SIZES.radius,

                    }}
                    onChange={(value) => {
                        utils.validateInput(value, 1, setCardNameError)
                        setCardName(value)
                    }}
                    errorMsg={cardNameError}
                    appendComponent={
                        <FormInputCheck
                            value={cardName}
                            error={cardNameError} />
                    }
                />

                {/* Expiration Date and CVV */}
                <View style={{
                    flexDirection: 'row',
                    marginTop: SIZES.radius,
                }}>
                    <FormInput
                        label="Expiration Date"
                        value={expiryDate}
                        placeholder="MM/YY"
                        maxLength={5}
                        containerStyle={{
                            flex: 1,
                        }}
                        onChange={(value) => {
                            utils.validateInput(value, 5, setExpiryDateError)
                            setExpiryDate(value)
                        }}
                        appendComponent={
                            <FormInputCheck
                                value={expiryDate}
                                error={expiryDateError} />
                        }
                    />

                    <FormInput
                        label="CVV"
                        value={cvv}
                        maxLength={3}
                        containerStyle={{
                            flex: 1,
                            marginLeft: SIZES.radius,
                        }}
                        onChange={(value) => {
                            utils.validateInput(value, 3, setCvvError)
                            setCvv(value)
                        }}
                        appendComponent={
                            <FormInputCheck
                                value={cvv}
                                error={cvvError} />
                        }
                    />
                </View>

                {/* Remember Radio Button */}
                <View style = {{alignItems: 'flex-start', marginTop: SIZES.padding}}>
                    <RadioButton
                    label="Remember the details."
                    isSelected={isRemember}
                    onPress={() => setIsRemember(!isRemember)}
                    />
                </View>
            </View>
        )
    }

    function renderFooter() {
        return(
            <View style = {{
                paddingTop: SIZES.radius,
                paddingBottom: SIZES.padding,
                paddingHorizontal: SIZES.padding
            }}>
                <TextButton
                label="Add Card"
                disabled={!isEnableAddCard()}
                buttonContainerStyle={{
                    height: 60,
                    borderRadius: SIZES.radius,
                    backgroundColor: isEnableAddCard() ? COLORS.primary : COLORS.transparentPrimray
                }}
                onPress={() => navigation.goBack()}
                />
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white,
        }}>
            {/* Header */}
            {renderHeader()}

            {/* Body */}
            <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* Card */}
                {renderCard()}

                {/* Form Section */}
                {renderForm()}
            </KeyboardAwareScrollView>

            {/* Footer */}
            {renderFooter()}

        </View>
    )
}

export default AddCard;