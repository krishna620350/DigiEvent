const validateAuthInput = (name, value, formInfo, setErrorMessage) => {
  let flag = 1;
  if (name === "password") {
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    if (!value.match(paswd)) {
      setErrorMessage((prev) => ({
        ...prev,
        [name]:
          "Password must be between 7 to 15 characters which contain atleast one numeric digit & a special character",
      }));
      flag &= 0;
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  }
  if (name === "confirmPassword") {
    if (value !== formInfo.password) {
      setErrorMessage((prev) => ({ ...prev, [name]: "Password didn't match" }));
      flag &= 0;
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  }

  return flag;
};

export default validateAuthInput;
