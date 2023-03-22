function isValidEmail(value) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
  if (value == "") {
    setEmailError("");
  } else if (isValidEmail(value)) {
    setEmailError("");
  } else {
    setEmailError("Invalid Email");
  }
}

function validatePassword(value, setPasswordError) {
  if (value.length < 9) {
    setPasswordError("Password needs 9 characters");
  } else {
    setPasswordError("");
  }
}

function revalidatePassword(value, setNewConfirmPasswordError) {
  if (value.length < 9) {
    setNewConfirmPasswordError("Enter new password");
  } else {
    setNewConfirmPasswordError("");
  }
}

function validateInput(value, minLength, setError) {
  if (value.length < minLength) {
    setError("Required Information");
  } else {
    setError("");
  }
}

function calculateAngle(coordinates) {
  let startLat = coordinates[0]["latitude"];
  let startLng = coordinates[0]["longitude"];
  let endLat = coordinates[1]["latitude"];
  let endLng = coordinates[1]["longitude"];
  let dx = endLat - startLat;
  let dy = endLng - startLng;

  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

const utils = {
  revalidatePassword,
  isValidEmail,
  validateEmail,
  validatePassword,
  validateInput,
  calculateAngle,
};

export default utils;
