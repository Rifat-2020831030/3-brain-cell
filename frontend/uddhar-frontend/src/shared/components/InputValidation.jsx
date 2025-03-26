// write input validation for every type of input field

export const validateText = (text, setError, isRequired) => {
  if (text === "" && isRequired) {
    setError("This field is required");
    return false;
  }
  // check if the text contains only alphabets
  if (!/^[a-zA-Z ]+$/.test(text)) {
    setError("This field should contain only alphabets");
    return false;
  }
  setError(null);
  return true;
};

export const validateEmail = (email, setError, isRequired) => {
  if (email === "" && isRequired) {
    setError("This field is required");
    return false;
  }
  // check if the email is valid
  if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
    setError("Enter a valid email address");
    return false;
  }
  setError(null);
  return true;
};
