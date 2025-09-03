import React, { useState } from "react";

const SignUpForm = () => {
  const [status, setStatus] = useState("pregnant");

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

      {/* Full Name */}
      <input
        type="text"
        placeholder="Full Name"
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-pink-500"
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-pink-500"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-pink-500"
      />

      {/* Pregnant / Postpartum */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg border ${
            status === "pregnant"
              ? "bg-pink-500 text-white"
              : "bg-gray-100  text-gray-600"
          }`}
          onClick={() => setStatus("pregnant")}
        >
          Pregnant
        </button>
        <button
          className={` px-4 py-2 rounded-lg border ${
            status === "postpartum"
              ? "bg-pink-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
          onClick={() => setStatus("postpartum")}
        >
          Postpartum
        </button>
      </div>

      {/* Pregnancy month */}
      {status === "pregnant" && (
        <div className="mb-4">
          <label className="block text-sm mb-1">
            Which month of pregnancy are you in (1–9)?
          </label>
          <select className="w-full border px-4 py-2 rounded-lg focus:outline-pink-500">
            {[...Array(9)].map((_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
        </div>
      )}

      {/* Postpartum month */}
      {status === "postpartum" && (
        <div className="mb-4">
          <label className="block text-sm mb-1">
            How many months since delivery (1–12)?
          </label>
          <select className="w-full border px-4 py-2 rounded-lg focus:outline-pink-500">
            {[...Array(12)].map((_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
        </div>
      )}

      {/* Sign Up button */}
      <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
        Sign Up
      </button>

      {/* Log In link */}
      <p className="text-center text-sm mt-4 text-gray-600">
        Already have an account?{" "}
        <a href="#" className="text-pink-500 hover:underline">
          Log In
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;
