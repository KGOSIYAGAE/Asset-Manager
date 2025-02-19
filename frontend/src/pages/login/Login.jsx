import React, { useState } from "react";
import TextInput from "../../components/inputs/textInput/TextInput";
import PasswordInput from "../../components/inputs/textInput/PasswordInput";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import loginAxiosInstance from "../../utils/loginAxiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState({ isShown: false, type: "error", message: "" });
  const [showLoading, setLoading] = useState(false);
  const { authState, authDispatch } = useAuthContext();
  const navigate = useNavigate();

  const onLogin = async (email, password_hash) => {
    try {
      if (!email) {
        return setShowToast({ isShown: true, type: "error", message: "Username not provided" });
      }

      if (!password_hash) {
        return setShowToast({ isShown: true, type: "error", message: "Password not provided" });
      }

      const loginDetails = { email, password_hash };

      const response = await loginAxiosInstance.post("auth/login", loginDetails);

      if (response.data && !response.data.error) {
        //localStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("currentUser", JSON.stringify({ username: response.data.username, role: response.data.role, token: response.data.token }));

        authDispatch({ type: "LOGIN", payload: response.data });

        navigate("/");
        return setShowToast({ isShown: true, type: "add", message: "Login successful" });
      }
    } catch (error) {
      if (error.response.data && error.response.data.error) {
        return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
      } else {
        return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, please try again." });
      }
    }
  };

  return (
    <div className="w-screen h-svh flex items-center justify-center ">
      <div className="w-[400px] h-[300px] flex flex-col border p-3 gap-10 rounded-md shadow-md">
        <span>Admin Login</span>
        <div className="flex flex-col gap-5">
          <TextInput label={"Email"} value={email} setOnChange={setEmail} type={"email"} />
          <PasswordInput label={"Password"} value={password} setOnChange={setPassword} type={"password"} />
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />
              <span className="text-sm text-zinc-500">Remember me</span>
            </div>
            <span className="text-sm cursor-pointer">Forgot Password?</span>
          </div>
          <button
            type="button"
            value=""
            className="bg-blue-900 text-white rounded-md p-1"
            onClick={() => {
              onLogin(email, password);
            }}
          >
            Sign in
          </button>
        </div>
      </div>
      <ToastMessage
        isShown={showToast.isShown}
        type={showToast.type}
        message={showToast.message}
        onClose={() => {
          setShowToast({ isShown: false });
        }}
      />
    </div>
  );
}

export default Login;
