export const validateForm = ({ email, password, setErrors }) => {
  let valid = true;
  const newErrors = { email: "", password: "" };
  // email validation
  const { valid: emailStatus, error: emailError } = emailValidation({ email });
  if (!emailStatus) {
    newErrors.email = emailError;
    valid = false;
  }
  // password validation
  const { valid: status, error: passwordError } = passwordValidation({ password });
  if (!status) {
    newErrors.password = passwordError;
    valid = false;
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
  } else if (!isEmailValid(email)) {
    error = "Email is invalid";
    valid = false;
  }
  return {
    valid,
    error,
  };
};

function isEmailValid(email) {
  if (email.length > 254) return false; 
  
  return /^[^@\s]{1,64}@[^@\s.]{1,255}\.[a-zA-Z]{2,}$/.test(email);
}

export const passwordValidation = ({ password }) => {
  let valid = true;
  let error = "";
  if (!password) {
    error = "Password is required";
    valid = false;
  } else if (password.length < 8) {
    error = "Password must be at least 8 characters long";
    valid = false;
  } else if (!isPasswordValid(password)) {
    error = "Password must contain uppercase, lowercase letters, special character and a number";
    valid = false;
  }
  return {
    valid,
    error,
  };
};

function isPasswordValid(password) {
  return (
      /[a-z]/.test(password) &&      // lowercase
      /[A-Z]/.test(password) &&      // uppercase
      /\d/.test(password) &&         // digit
      /[!@#$%^&*]/.test(password) && // special character
      password.length >= 8           // minimum length
  );
}
