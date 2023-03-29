import axios from "axios";
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
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
  Button,
  TextInput,
} from "../../components/FoodeaComponents";
import DateTimePicker from "@react-native-community/datetimepicker";

const Names = ({ navigation }) => {
  const { user, userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(true);
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
    setIsLoading(true);

    const response = await axios.get(`${BASE_URL}app_users/${userId}`);
    setData(response.data);

    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserData();
  }, []);

  const handleEditNames = () => {
    navigation.push("EditFirstName");
  };

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
        <View
          style={{
            justifyContent: "flex-start",
          }}
        >
          {/* First Name */}
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h3,
              fontSize: 15,
              marginTop: SIZES.base,
              marginLeft: SIZES.padding,
            }}
          >
            First Name
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

        <View
          style={{
            justifyContent: "flex-start",
          }}
        >
          {/* Middle Name */}
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h3,
              fontSize: 15,
              marginTop: SIZES.base,
              marginLeft: SIZES.padding,
            }}
          >
            Middle Name
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          {/* Middle Name */}
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
              {isLoading ? "Josh" : data[0].middlename}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "flex-start",
          }}
        >
          {/* Last Name */}
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h3,
              fontSize: 15,
              marginTop: SIZES.base,
              marginLeft: SIZES.padding,
            }}
          >
            Last Name
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
              {isLoading ? "Josh" : data[0].lastname}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "flex-start",
          }}
        >
          {/* Birthday */}
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h3,
              fontSize: 15,
              marginTop: SIZES.base,
              marginLeft: SIZES.padding,
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
            <FormInput
              inputContainerStyle={styles.input}
              placeholder="Birthday"
              value={"Birthday"}
              disabled={false}
            />
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  marginLeft: SIZES.base,
                }}
              >
                <Image
                  source={require("../../../../assets/img/icons/calendar.png")}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.primary,
                  }}
                />
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
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleEditNames}>
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
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                Edit Details
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Names;

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
    textAlign: "center",
  },
});
