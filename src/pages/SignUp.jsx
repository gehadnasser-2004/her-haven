import React from "react";
import Navbar from "../components/Navbar";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
  return (
    <div class="w-screen bg-blue-500">
      <div className="min-h-screen bg-gray-50">
        <Navbar buttonText="Log In" />
        <div className="flex justify-center items-center py-12">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
