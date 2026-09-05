import React, { useEffect, useState } from "react";
import TextInput from "../../components/inputs/textInput/TextInput";
import PasswordInput from "../../components/inputs/textInput/PasswordInput";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import loginAxiosInstance from "../../utils/loginAxiosInstance";
import { checkInternetConnection } from "../../utils/systemChecks";
import LoginEmailInput from "../../components/inputs/loginEmailInput/LoginEmailInput";
import { setNavigate } from "../../utils/navigate";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState({ isShown: false, type: "error", message: "" });
  const [showLoading, setLoading] = useState(false);
  const [isDiabled, setIsDisabled] = useState(true);
  const { authState, authDispatch } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  //Login Api Call
  const onLogin = async (email, password) => {
    const redrictUrl = location.state?.from ? location.state.from : "/home";

    try {
      if (!email) {
        return setShowToast({ isShown: true, type: "error", message: "Username not provided" });
      }

      if (!password) {
        return setShowToast({ isShown: true, type: "error", message: "Password not provided" });
      }

      const loginDetails = { email, password };

      const response = await loginAxiosInstance.post("/login", loginDetails);

      if (response?.data && !response?.data?.error) {
        //Store user details to session storage
        sessionStorage.setItem("currentUser", JSON.stringify({ fullName: response.data.fullName, role: response.data.role, id: response.data.id, token: response.data.token }));

        authDispatch({ type: "LOGIN", payload: response.data });

        navigate(redrictUrl, { replace: true });

        return setShowToast({ isShown: true, type: "success", message: "Login successful" });
      }
    } catch (error) {
      /* if (!isOnline) {
        return checkInternetConnection(isOnline, setShowToast);
      } else*/ if (error.response?.data && error.response?.data?.error) {
        return setShowToast({ isShown: true, type: "error", message: error.response.data.message });
      } else {
        return setShowToast({ isShown: true, type: "error", message: "An unexpected error occured, please try again." });
      }
    }
  };

  const toggleIsDisbaled = () => {
    if (password === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    //checkInternetConnection(isOnline, setShowToast);
    toggleIsDisbaled();
    setNavigate(navigate);
  }, [password]);

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      // Check if the key pressed was 'Enter'
      if (event.key === "Enter") {
        if (email || password) onLogin(email, password);
      }
    };

    // Add listener when component mounts
    window.addEventListener("keydown", handleGlobalKeyDown);

    // Clean up: Remove listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [email, password]);

  return (
    <div className="w-screen h-svh flex items-center justify-center ">
      <div className="w-full h-svh">
        <img src="/library_2.jpg" alt="" className="w-full" />
      </div>
      <div className="w-[150px] h-[150px] rounded-full absolute z-10 top-10 left-10 ">
        <img src="/SPU 1.png" alt="" srcSet="" />
      </div>
      <div className="w-[400px] h-[350px] bg-white flex flex-col p-3 gap-10 rounded-md shadow-md absolute">
        <span className="font-bold text-md login-heading">SIGN IN</span>
        <div className="flex flex-col gap-5">
          <LoginEmailInput label={"Email"} value={email} setOnChange={setEmail} type={"email"} />
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
            disabled={isDiabled}
            className={`${isDiabled ? "bg-slate-300" : "bg-red-600"} text-white text-sm font-semibold rounded-md p-1`}
            onClick={() => {
              onLogin(email, password);
            }}
          >
            SIGN IN
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
