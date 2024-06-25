import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { logo } from "@assets";
import { Eye, EyeOff } from "lucide-react";
import { SIGNIN_URL } from "@utils";

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInLoading, setIsSignLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/b/chat");
    }
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function Login() {
    try {
      if (!email || !isValidEmail(email)) {
        setError("Please provide a valid email address.");
        return;
      }

      setIsSignLoading(true);

      const itemSignIn = {
        email,
        password,
      };

      const resultSignIn = await fetch(SIGNIN_URL, {
        method: "POST",
        body: JSON.stringify(itemSignIn),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!resultSignIn.ok) {
        const responseSignIn = await resultSignIn.text();
        console.log("Login failed:", resultSignIn.status, responseSignIn);

        if (result.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("An error occurred during login. Please try again later.");
        }
      }

      localStorage.setItem(
        "access-token",
        resultSignIn.headers.get("access-token")
      );
      localStorage.setItem("client", resultSignIn.headers.get("client"));
      localStorage.setItem("expiry", resultSignIn.headers.get("expiry"));
      localStorage.setItem("uid", resultSignIn.headers.get("uid"));

      const userDataSignIn = await resultSignIn.json();
      localStorage.setItem("user-info", JSON.stringify(userDataSignIn));
      navigate("/b/chat");
    } catch (error) {
      console.log("Error during login", error.message);
      setError("An error occurred during login. Please try again later.");
    } finally {
      setIsSignLoading(false);
    }
  }
  return (
    <>
      {isSignInLoading ? (
        <PropagateLoader
          loading={isSignInLoading}
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
                  Sign in
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
                        type={passwordVisible ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
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

                  <div className="!mt-8">
                    <button
                      onClick={Login}
                      disabled={isSignInLoading}
                      type="button"
                      className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Sign in
                    </button>
                  </div>
                  <p className="text-gray-800 text-sm !mt-8 text-center">
                    Don't have an account?{" "}
                    <span
                      onClick={() => {
                        navigate("/signup");
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

export default SignIn;
