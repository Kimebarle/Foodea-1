import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useContext } from "react";
import {
  TextInput,
  Container,
  SafeAreaView,
  Button,
  TextButton,
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

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);

  const handleOnSubmit = (values) => {
    login(values.email, values.password, values);
  };

  const handleForgotPassword = () => {
    navigation.push("Forgotpassword");
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
          height: 500,
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
                <TextInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email ? true : false}
                  errorMsg={touched.email && errors.email ? errors.email : ""}
                  roundness={10}
                />
                <TextInput
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
                />

                <TextButton
                  label="Sign In"
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
                      marginBottom: SIZES.padding
                    }}
                  >
                    Forgot Password
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    marginTop: SIZES.base,
                    ...FONTS.h3,
                    textAlign: "center",
                    marginTop: SIZES.padding
                  }}
                >
                  Don't have an account?{" "}
                </Text>

                <TouchableOpacity onPress={handleSignUpPress}>
                  <Text style={{ color: COLORS.primary, textAlign: 'center', ...FONTS.h2 }}>
                    Sign Up</Text>
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
});
