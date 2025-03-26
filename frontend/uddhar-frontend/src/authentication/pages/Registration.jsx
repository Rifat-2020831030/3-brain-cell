import { useState } from "react";
import Commmon from "../../shared/ImportShared";
import { verify } from "../data/handleVerifyApi";
import { register } from "../data/regApi";
import Auth from "../ImportAuthentication";

const Registration = () => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    location: "",
    role: "",
    code: "",
    skills: []
  });

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Password didn't Matched!");
      return;
    }
    try {
      const { name, email, mobile, password, location, role } = formData;
      const data = {
        name,
        email,
        mobile,
        password,
        location,
        role,
      };
      const response = await register(data);
      if (response.status) {
        handleNext();
      } else {
        alert(response.message);
        // console.error("Error sending code:", response.message);
      }
    } catch (error) {
      console.error("An error occured", error);
    }
  };
  const handleVerify = async () => {
    try {
      const { email, code } = formData;
      const data = {
        email,
        code,
      };
      const response = await verify(data);
      if(response.status) {
        localStorage.setItem("token", response.emailVerificationToken);
        handleNext();
      }
      else {
        alert(response.message);
      }
    } catch (error) {
      setError("Invalid Code");
      console.error("Error sending code:", error);
    }
  };
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 shadow-lg to-yellow-200">
      <p className="text-4xl text-center py-5">Registration Process</p>
      <div className="flex p-10 items-start justify-center gap-x-20 max-md:flex-col">
        <Commmon.VerticalStepper currentStep={step} />
        <div className="bg-white p-8 rounded-lg shadow-lg pr-12 max-md:w-[300px] max-md:p-1 max-md:py-5">
          <div className="w-full pl-8">
            {step === 0 && (
              <Auth.PersonalDetails
                userData={formData}
                handleChange={handleChange}
                handleRegister={handleRegister}
              />
            )}
            {step === 1 && (
              <Auth.EmailVerification
                formData={formData}
                handleChange={handleChange}
                handleVerify={handleVerify}
                error={error}
              />
            )}
            {step === 2 && (
              <Auth.RoleDetails
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                handleNext={handleNext}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
