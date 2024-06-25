import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { logo } from "@assets";
import { Eye, EyeOff } from "lucide-react";
import { SIGNUP_URL } from "@utils";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function Register() {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      setIsSubmitting(true);

      const item = {
        password,
        password_confirmation: confirmPassword,
        email,
      };

      const result = await fetch(SIGNUP_URL, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!result.ok) {
        const response = await result.json();
        if (response.errors && response.errors.full_messages) {
          const errorMsg = response.errors.full_messages.join(",");
          throw new Error(errorMsg);
        }
        throw new Error(`Registration failed: ${result.statusText}`);
      }

      // Extract headers from the response
      const headers = result.headers;
      const accessToken = headers.get("access-token");
      const client = headers.get("client");
      const expiry = headers.get("expiry");
      const uid = headers.get("uid");

      // Save headers to localStorage
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("client", client);
      localStorage.setItem("expiry", expiry);
      localStorage.setItem("uid", uid);

      const userData = await result.json();
      localStorage.setItem("user-info", JSON.stringify(userData));
      navigate("/b/chat");
    } catch (error) {
      console.log("Error during registration:", error.message);
      if (error.message.includes("Email has already been taken")) {
        setError("Email is already registered. Please use a different email.");
      } else {
        setError(`Registration failed: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {isSubmitting ? (
        <PropagateLoader
          loading={isSubmitting}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
          color="#7ca2d6"
        />
      ) : (
        <div className="bg-gray-50 font-[sans-serif]">
          <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="max-w-md w-full">
              <a href="">
                <img src={logo} className="w-40 mb-8 mx-auto block" />
              </a>

              <div className="p-8 rounded-2xl bg-white shadow">
                <h2 className="text-gray-800 text-center text-2xl font-bold">
                  Sign Up
                </h2>
                <form
                  className="mt-8 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    Login;
                  }}
                >
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Email
                    </label>
                    <div className="relative flex items-center">
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        name="username"
                        type="text"
                        required
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter user name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        type={passwordVisible ? "text" : "password"}
                        required
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter password"
                      />
                      <div
                        className="w-4 h-4 absolute right-4 text-gray-500 cursor-pointer"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <Eye /> : <EyeOff />}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name="password"
                        type="text"
                        required
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>

                  <div className="!mt-8">
                    <button
                      onClick={Register}
                      disabled={isSubmitting}
                      type="button"
                      className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Sign in
                    </button>
                  </div>
                  <p className="text-gray-800 text-sm !mt-8 text-center">
                    Already using Bluem?{" "}
                    <span
                      onClick={() => {
                        navigate("/signin");
                      }}
                      className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                      Register here
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
