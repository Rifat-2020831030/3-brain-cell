import { useState } from "react";
import { passwordValidation, emailValidation } from "../services/validation";
import { Toaster, toast } from 'sonner';
import { handleSendCode, handleResetPassword } from "../services/auth";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../shared/components/LoadingScreen";

function ForgetPass() {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const sendCodeHandler = async () => {
    setLoading(true);
    if(!emailValidation({ email }).valid) {
      const error = emailValidation({ email }).error;
      toast.error(error);
    }
    else {
      const response1 = await handleSendCode(email);
      if (response1.status) {
        setStep(2);
        toast.success("Code sent successfully");
      } else {
        toast.error(response1.message);
      }
    }
    setLoading(false);
  };

  const resetPasswordHandler = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if(!passwordValidation({ password: newPassword }).valid) {
      const error = passwordValidation({ password: newPassword }).error;
      toast.error(error);
    }
    else {
      setLoading(true);
      const response2 = await handleResetPassword(email, resetCode, newPassword, confirmPassword);
      setLoading(false);
      if(response2.status) {
        toast.success(response2.message);
        navigate("/sign-in");
      }
      else {
        toast.error(response2.message);
      }
    }
  };

return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 shadow-lg to-yellow-200">
        <Toaster richColors position="top-center" />
        {loading && <LoadingScreen />}
        {step === 1 ? (
            <div className="bg-amber-50 w-full max-w-md p-8 rounded-lg shadow-lg">
                <div className="flex flex-col justify-between items-center">
                    <h2 className="text-xl md:text-3xl font-mono mb-4 font-bold">
                        Password Recovery
                    </h2>
                    <input
                        className="bg-transparent px-2 py-2 w-full mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-gray-300"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        disabled={loading}
                        onClick={sendCodeHandler}
                        className="w-full rounded-md bg-amber-500 hover:bg-amber-700 text-white text-sm md:text-xl py-2 cursor-pointer"
                    >
                        Send Code
                    </button>
                </div>
            </div>
        ) : (
            <div className="bg-amber-50 w-full max-w-md p-8 rounded-lg shadow-lg">
                <h2 className="text-xl md:text-3xl font-mono mb-4 font-bold">Reset Password</h2>
                <input
                    className="bg-transparent px-2 py-2 w-full mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-amber-700"
                    type="text"
                    placeholder="Enter the code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                />
                <input
                    className="bg-transparent px-2 py-2 w-full mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-amber-700"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    className="bg-transparent px-2 py-2 w-full mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-amber-700"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    onClick={resetPasswordHandler}
                    className="w-full rounded-md bg-amber-500 hover:bg-amber-700 text-white text-sm md:text-xl py-2 cursor-pointer"
                >
                    Reset Password
                </button>
            </div>
        )}
    </div>
);
}

export default ForgetPass;
