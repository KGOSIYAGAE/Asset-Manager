import React, { useState } from "react";
import TextInput from "../../components/inputs/textInput/TextInput";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-screen h-svh flex items-center justify-center border border-red-500">
      <div className="w-[400px] h-[300px] flex flex-col border p-3 gap-10 rounded-md shadow-md">
        <span>Admin Login</span>
        <div className="flex flex-col gap-5">
          <TextInput label={"Email"} value={email} setOnChange={setEmail} type={"email"} />
          <TextInput label={"Password"} value={password} setOnChange={setPassword} type={"password"} />
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />
              <span className="text-sm text-zinc-500">Remember me</span>
            </div>
            <span className="text-sm cursor-pointer">Forgot Password?</span>
          </div>
          <button type="button" value="" className="bg-blue-900 text-white rounded-md p-1">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
