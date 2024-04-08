import React, { useState } from "react";
import Login from "../shared/Login";
import Signup from "../shared/Signup";
import Verification from "../shared/Verification";
import ForgotPassword from "../shared/ForgotPassword";

interface AuthProps {
  setOpen: (e: boolean) => void;
  setSignedIn: (e: boolean) => void;
}

const AuthPage = ({ setOpen, setSignedIn }: AuthProps) => {
  const [activeState, setActiveState] = useState("Login");

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === "screen") {
      setOpen(false);
    }
  };

  return (
    <div
      id="screen"
      onClick={handleClose}
      className="w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center bg-[#00000027]"
    >
      <div className="h-auto w-[30%] bg-slate-900 rounded shadow-sm p-5">
        {activeState === "Login" && (
          <Login
            setSignedIn={setSignedIn}
            setOpen={setOpen}
            setActiveState={setActiveState}
          />
        )}
        {activeState === "Signup" && <Signup setActiveState={setActiveState} />}
        {activeState === "Verification" && (
          <Verification setActiveState={setActiveState} />
        )}
        {activeState === "Forgot-Password" && (
          <ForgotPassword setActiveState={setActiveState} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
