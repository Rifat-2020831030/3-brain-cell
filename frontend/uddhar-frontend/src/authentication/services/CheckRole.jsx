import { jwtDecode } from "jwt-decode";

export const CheckRole = (role) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return {
      result: false,
      message: "Token not found",
    };
  }
  const decoded = jwtDecode(token);
  console.log("Decoded token: ", decoded);
  if (decoded.role !== role) {
    return {
      result: false,
      message: "You are not authorized to perform this action.",
    };
  }
  return {
    result: true,
  };
};
