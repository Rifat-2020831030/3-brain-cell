export const validateForm = ({ email, password, setErrors }) => {
  let valid = true;
  const newErrors = { email: "", password: "" };
  // email validation
  const { valid: emailStatus, error: emailError } = emailValidation({ email });
  if (!emailStatus) {
    newErrors.email = emailError;
  }
  // password validation
  const { valid: status, error: passwordError } = passwordValidation({ password });
  if (!status) {
    newErrors.password = passwordError;
  }
  setErrors(newErrors);
  return valid;
};

export const emailValidation = ({ email }) => {
  let valid = true;
  let error = "";
  if (!email) {
    error = "Email is required";
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    error = "Email is invalid";
    valid = false;
  }
  return {
    valid,
    error,
  };
};

export const passwordValidation = ({ password }) => {
  let valid = true;
  let error = "";
  if (!password) {
    error = "Password is required";
    valid = false;
  } else if (password.length < 6) {
    error = "Password must be at least 6 characters long";
    valid = false;
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    error = "Password must contain uppercase, lowercase letters, and a number";
    valid = false;
  }
  return {
    valid,
    error,
  };
};
