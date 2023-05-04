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
  if (name === "visitorType") {
    if (value === "") {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: "Please select VisitorType",
      }));
      flag &= 0;
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  }
  if (name === "name") {
    if (value === "") {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: "Please provide your name",
      }));
      flag &= 0;
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  }

  if (name === "email") {
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value.match(emailFormat)) {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: "Please Provide valid email",
      }));
      flag &= 0;
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  }

  if (name === "visitorType") {
    if (value === "") {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: "Please select visitor type",
      }));
      flag &= 0;
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  }

  if (name === "name") {
    if (value === "") {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: "Please provide your good name",
      }));
      flag &= 0;
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  }

  if (name === "email") {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
    if (!value.match(mailformat)) {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: "Please provide valid email",
      }));
      flag &= 0;
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  }
  return flag;
};

export default validateAuthInput;
