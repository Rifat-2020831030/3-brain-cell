import React, { useState } from "react";
import axios from "axios";

function ForgetPass() {
  const [email, setEmail] = useState("");
  const [resetCode, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const handleSendCode = async () => {
    try {
      await axios.post("http://localhost:3000/auth/forgot-password", { email });
      setStep(2);
    } catch (error) {
      console.error("Error sending code:", error);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:3000/auth/reset-password", {
        resetCode,
        email,
        newPassword,
        confirmPassword
      });
      window.location.href = "/";
      alert("Password reset successfully");
      setStep(1);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 shadow-lg to-yellow-200">
        {step === 1 ? (
            <div className="bg-amber-50 w-full max-w-md p-8 rounded-lg shadow-lg">
                <div className="flex flex-col justify-between items-center">
                    <h2 className="text-xl md:text-3xl font-mono mb-4 font-bold">
                        Password Recovery
                    </h2>
                    <input
                        className="bg-transparent px-2 py-2 w-full mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-amber-700"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        onClick={handleSendCode}
                        className="w-full rounded-md bg-amber-700 text-white text-sm md:text-xl py-2"
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
                    onChange={(e) => setCode(e.target.value)}
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
                    onClick={handleResetPassword}
                    className="w-full rounded-md bg-amber-700 text-white text-sm md:text-xl py-2"
                >
                    Reset Password
                </button>
            </div>
        )}
    </div>
);
}

export default ForgetPass;
