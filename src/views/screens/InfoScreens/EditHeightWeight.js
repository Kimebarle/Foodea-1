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
import { Header, FormInput, TextButton } from "../../components/FoodeaComponents";
import { Alert } from "react-native";
import React from "react";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../api/context/auth/AuthContext";
import { View, Text, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { TextInput } from "react-native-paper";

const EditHeightWeight = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [height, setHeight] = useState();
  const [heightError, setHeightError] = useState("");
  const [weight, setWeight] = useState();
  const [weightError, setWeightError] = useState("");
  const [bmi, setBMI] = React.useState();
  const [bmiError, setBMIError] = useState("");
  const [data, setData] = useState();

  const disabledButton = () => {
    return !height || !weight;
  };

  const getUserData = async () => {
    const userID = user.user_id;
    setIsLoading(true);
    const response = await axios.get(`${BASE_URL}app_users/${userID}`);
    setHeight(response.data[0].height);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserData();
  }, []);

  const confirmAction = async () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Update Your Information",
        "Are you sure you want to update your information",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => resolve(false),
          },
          {
            text: "Confirm",
            onPress: () => resolve(true),
          },
        ]
      );
    });
  };

  const BmiCalculation = () => {
    const bmi = (weight / (height * height)) * 10000;
    return bmi;
  };

  const updateHeightWeight = async (bmi) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}app_users/${user.user_id}`,
        {
          height: height,
          weight: weight,
          bmi: bmi,
        }
      );
      console.log(response.data);
      return response.data.length > 0;
    } catch (error) {
      console.log(error);

      return false;
    }
  };

  const HandleSubmit = async () => {
    const decision = await confirmAction();
    const bmi = BmiCalculation();
    if (decision) {
      const update = await updateHeightWeight(bmi);

      Alert.alert(
        "Confirmation",
        "Your details have been successfully updated.",
        [
          {
            text: "Confirm",
            style: "cancel",
            onPress: () => {
              console.log("Confirm");
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      console.log(bmi);
    }
  };

  function renderHeader() {
    return (
      <Header
        containerStyle={{
          height: 80,
          marginHorizontal: SIZES.padding,
          alignItems: "center",
        }}
        title={"Edit Height and Weight"}
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
        backgroundColor: COLORS.white,
      }}
    >
      {/* HEADER */}
      {renderHeader()}

      <View style={{ marginTop: SIZES.padding }}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          {/* Height */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              marginBottom: SIZES.radius,
              width: 300,
            }}
            label="Height"
            keyboardType="number-pad"
            value={height}
            maxLength={3}
            onChange={(value) => {
              setHeight(value);
              utils.validateInput(value, 1, setHeightError);
            }}
          />
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          {/* Weight */}
          <FormInput
            containerStyle={{
              borderRadius: SIZES.radius,
              marginBottom: SIZES.radius,
              width: 300,
            }}
            label="Weight"
            value={weight}
            keyboardType="number-pad"
            maxLength={2}
            onChange={(value) => {
              setWeight(value);
              utils.validateInput(value, 1, setWeightError);
            }}
          />
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <TextButton
            label="Submit"
            disabled={disabledButton()}
            buttonContainerStyle={{
              height: 50,
              width: 300,
              marginTop: SIZES.padding,
              alignItems: "center",
              borderRadius: SIZES.radius,
              marginBottom: SIZES.padding,
              backgroundColor: !disabledButton()
                ? COLORS.primary
                : COLORS.gray,
            }}
            onPress={HandleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default EditHeightWeight;
