import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useContext } from "react";
import React from "react";
import {
  TextInput,
  Container,
  SafeAreaView,
  Button,
  TextButton,
  Remember,
  FormInput,
  IconButton,
} from "../../components/FoodeaComponents";

import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
} from "../../../constants";

import Colors from "../../../utils/Colors";
import AuthContext from "../../../api/context/auth/AuthContext";
import * as yup from "yup";
import { Formik } from "formik";
import utils, { Utils } from "../../../utils/Utils";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [remember, setRemember] = React.useState(false);
  const [checkValidEmail, setCheckValidEmail] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPasswod] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");
  


  const handleOnSubmit = (values) => {
    login(values.email, values.password, remember);
  };

  const handleForgotPassword = () => {
    navigation.push("Forgotpassword");
  };

  const handleWelcome = () => {
    navigation.push("Welcome");
  };

  const handleSignUpPress = () => {
    navigation.push("SignUpScreen");
  };

  const signInSchema = yup.object({
    email: yup
      .string()
      .trim()
      .email("Invalid Email")
      .required("Email is required"),
    password: yup.string().trim().required("Password is required"),
  });

  const handleCheckEmail = (value) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(value);
    if (re.test(value) || regex.test(value)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };
  

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          alignSelf: "center",
          height: 550,
          width: 300,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          elevation: 5,
        }}
      >
        <Container padding={20} center>
          <Text style={{ ...FONTS.h1, marginBottom: SIZES.padding }}>
            Log In Your Account
          </Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleOnSubmit}
            validationSchema={signInSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                {/* <TextInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email ? true : false}
                  errorMsg={touched.email && errors.email ? errors.email : ""}
                  roundness={10}
                /> */}
                {/* <TextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && errors.password ? true : false}
                  errorMsg={
                    touched.password && errors.password ? errors.password : ""
                  }
                  secureTextEntry
                  roundness={10}
                /> */}

                <FormInput
                  label="Email"
                  value={values.email}
                  autoCapitalize
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email ? true : false}
                  errorMsg={touched.email && errors.email ? errors.email : ""}
                  roundness={10}
                  appendComponent={
                    <View
                      style={{
                        position: "absolute",
                        bottom: 45,
                        right: 2,
                      }}
                    >
                      {checkValidEmail ? (
                        <Text style={styles.textFailed}>Wrong format email</Text>
                      ) : (
                        <Text style={styles.textFailed}> </Text>
                      )}
                    </View>
                  }
                />

                <FormInput
                  label="Password"
                  value={values.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && errors.password ? true : false}
                  errorMsg={
                    touched.password && errors.password ? errors.password : ""
                  }
                  secureTextEntry={!showPassword}
                  roundness={10}
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

                <Remember
                  containerStyle={{
                    marginTop: SIZES.radius,
                  }}
                  isSelected={remember}
                  onPress={() => setRemember(!remember)}
                />

                <TextButton
                  label="Login"
                  buttonContainerStyle={{
                    height: 55,
                    alignItems: "center",
                    marginTop: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary,
                    marginBottom: SIZES.base,
                  }}
                  onPress={handleSubmit}
                />

                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text
                    style={{
                      color: COLORS.primary,
                      ...FONTS.h3,
                      textAlign: "center",
                      marginBottom: SIZES.padding,
                      marginTop: SIZES.radius,
                    }}
                  >
                    Forgot Password
                  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={handleSignUpPress}> 
                  <Text>
                    Welcome
                  </Text>
                </TouchableOpacity> */}

                <Text
                  style={{
                    marginTop: SIZES.base,
                    ...FONTS.h3,
                    textAlign: "center",
                    marginTop: 50,
                  }}
                >
                  Don't have an account?
                </Text>

                <TouchableOpacity onPress={handleWelcome}>
                  <Text
                    style={{
                      color: COLORS.primary,
                      textAlign: "center",
                      ...FONTS.h2,
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </Container>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  forgotPassword: {
    marginTop: 10,
  },
  signup_text: {},
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
    position: "absolute",
    bottom: 10,
    ...FONTS.h4,
  },
});
