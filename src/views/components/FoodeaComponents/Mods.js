import React from 'react';
import {
    View,
    StyleSheet,
    Button,
    Modal,
    Image,
    Text,
    TouchableOpacity,
    Animated,
    Touchable,
} from 'react-native';
import {
    images,
    constants,
    SIZES,
    COLORS,
    icons,
    FONTS,
} from "../../../constants";

const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        toggleModal();
    }, [visible]);
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <Animated.View
                    style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

const Mods = ({ navigation }) => {
    const [visible, setVisible] = React.useState(true);
    const [isSelected, setSelected] = React.useState(true);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ModalPoup visible={visible}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Image
                                source={require('../../../../assets/img/icons/cross.png')}
                                style={{ height: 30, width: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../../../assets/img/icons/check_mark.png')}
                        style={{ height: 150, width: 150, marginVertical: 10 }}
                    />
                </View>

                <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                    Please scan your details thoroughly.
                </Text>

                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                }}>
                    <View style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 30,
                        backgroundColor: isSelected ? COLORS.primary : "gray",
                        fontWeight: "bold",
                        borderRadius: 10,
                        marginRight: 50,
                    }}>
                        <TouchableOpacity style={{ alignItems: 'center', }}
                            onPress={() => console.log("Confirm")}>
                            <Text style={{
                                color: "white",
                                fontWeight: "bold",
                            }}>
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 30,
                        backgroundColor: isSelected ? COLORS.primary : "gray",
                        fontWeight: "bold",
                        borderRadius: 10,
                    }}>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                        }} onPress={() => console.log("Cancel")}>

                            <Text style={{
                                color: "white",
                                fontWeight: 'bold'
                            }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ModalPoup>
        </View>
    );
};

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});

export default Mods;