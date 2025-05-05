// write input validation for every type of input field

export const validateText = (text, isRequired = true) => {
  if (!text && isRequired) {
    return {
      message: "This field is required",
      status: true,
    };
  }

  if (text && !/^[a-zA-Z, ]+$/.test(text)) {
    return {
      message: "This field should contain only alphabets",
      status: true,
    };
  }
  return {
    message: "",
    status: false,
  };
};

export const validateEmail = (email, isRequired = true) => {
  if (!email && isRequired) {
    return {
      message: "Email is required",
      status: true,
    };
  }

  if (
    email &&
    !isEmailValid(email)
  ) {
    return {
      message: "Invalid email format",
      status: true,
    };
  }
  return {
    message: "",
    status: false,
  }
};

function isEmailValid(email) {
  if (email.length > 254) return false; 
  
  return /^[^@\s]{1,64}@[^@\s.]{1,255}\.[a-zA-Z]{2,}$/.test(email);
}

export const validateMobile = (mobile, isRequired = true) => {
  if (!mobile && isRequired) {
    return {
      message: "Mobile number is required",
      status: true,
    };
  }

  if (mobile && !/^\d{11}$/.test(mobile)) {
    return {
      message: "Mobile number should be 11 digits",
      status: true,
    };
  }
  return {
    message: "",
    status: false,
  }
};

export const validatePassword = (password, isRequired = true) => {
  if (!password && isRequired) {
    return {
      message: "Password is required",
      status: true,
    };
  }

  if (password && password.length < 8) {
    return {
      message: "Password must be at least 8 characters",
      status: true,
    };
  }

  if (
    password &&
    (!/[A-Z]/.test(password) ||
     !/[a-z]/.test(password) ||
     !/\d/.test(password) ||
     !/[!@#$%^&*]/.test(password))
  ) {
    return {
      message: "Password must include uppercase, lowercase, number and special character",
      status: true,
    };
  }

  return {
    message: "",
    status: false,
  };
};

export const validateConfirmPassword = (
  password,
  confirmPassword,
  isRequired = true
) => {
  if (!confirmPassword && isRequired) {
    return {
      message: "Please confirm your password",
      status: true,
    };
  }

  if (password !== confirmPassword) {
    return {
      message: "Passwords do not match",
      status: true,
    };
  }

  return {
    message: "",
    status: false,
  }
};

export const validateLocation = (location, isRequired = true) => {
  if (!location && isRequired) {
    return {
      message: "Location is required",
      status: true,
    };
  }

  return {
    message: "",
    status: false,
  }
};

export const validateRole = (role, isRequired = true) => {
  if (!role && isRequired) {
    return {
      message: "Please select a role",
      status: true,
    };
  }

  return {
    message: "",
    status: false,
  }
};

export const validateCode = (code, isRequired = true) => {
  if (!code && isRequired) {
    return {
      message: "Verification code is required",
      status: true,
    };
  }

  if (code && !/^\d{4,6}$/.test(code)) {
    return {
      message: "Invalid verification code",
      status: true,
    };
  }

  return {
    message: "",
    status: false,
  }
};

export const validateWebsite = (website, isRequired = false) => {
  if (!website && isRequired) {
    return {
      message: "Website URL is required",
      status: true,
    };
  }

  if (
    website &&
    !/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
      website
    )
  ) {
    return {
      message: "Please enter a valid URL",
      status: true,
    };
  }

  return {
    message: "",
    status: false,
  }
};

export const validateSocialMedia = (url, isRequired = false) => {
  if (!url && isRequired) {
    return {
      message: "Social media link is required",
      status: true,
    };
  }

  return {
    message: "",
    status: false,
  }
};

export const validateDate = (date, isRequired = false) => {
  if (!date && isRequired) {
    return {
      message: "Date is required",
      status: true,
    };
  }

  return {
    message: "",
    status: false,
  }
};

export const validateRegNo = (regNo, isRequired = true) => {
  if (!regNo && isRequired) {
    return {
      message: "Registration number is required",
      status: true,
    };
  }

  return {
    message: "",
    status: false,
  }
};

export const validateOrganizationType = (type, isRequired = true) => {
  if (!type && isRequired) {
    return {
      message: "Organization type is required",
      status: true,
    };
  }

  return {
    message: "",
    status: false,
  }
};

export const validateSkills = (skills, isRequired = true) => {
  if ((!skills || skills.length === 0) && isRequired) {
    return {
      message: "Please select at least one skill",
      status: true,
    };
  }

  return {
    message: "",
    status: false,
  }
};

export const validateOrgForm = (formData, setErrors) => {
    const newErrors = {};

    const nameError = validateText(formData.organization_name, true);
    if (nameError) newErrors.organization_name = nameError.message;

    const typeError = validateOrganizationType(formData.type);
    if (typeError) newErrors.type = typeError.message;

    if (!formData.sector || formData.sector.length === 0) {
      newErrors.sector = "Please select at least one sector";
    }

    const locationError = validateText(formData.location, true);
    if (locationError) newErrors.location = locationError.message;

    const contactNameError = validateText(formData.secondaryContactName, true);
    if (contactNameError)
      newErrors.secondaryContactName = contactNameError.message;

    const contactTitleError = validateText(
      formData.secondaryContactTitle,
      true
    );
    if (contactTitleError)
      newErrors.secondaryContactTitle = contactTitleError.message;

    const contactMailError = validateEmail(formData.secondaryContactMail, true);
    if (contactMailError)
      newErrors.secondaryContactMail = contactMailError.message;

    const websiteError = validateWebsite(formData.website);
    if (websiteError) newErrors.website = websiteError.message;

    const socialMediaError = validateSocialMedia(formData.socialMediaLink);
    if (socialMediaError) newErrors.socialMediaLink = socialMediaError.message;

    const regNoError = validateRegNo(formData.regNo);
    if (regNoError) newErrors.regNo = regNoError.message;

    const dateError = validateDate(formData.establishedDate, true);
    if (dateError) newErrors.establishedDate = dateError.message;
    setErrors(newErrors);
    for (const key in newErrors) {
      if (newErrors[key]) {
        return false; // form contains errors
      }
    }
    return true;
  };