import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@assets/bluem-fullname.png";
import imageppl from '@assets/pplcoms-01.png'
import PropagateLoader from "react-spinners/PropagateLoader";

export const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInLoading, setIsSignLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/dashboard/chat");
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

      const itemSignIn =
      {
        email,
        password,
      };

      const resultSignIn = await fetch
        ('http://206.189.91.54/api/v1/auth/sign_in',
          {
            method: 'POST',
            body: JSON.stringify(itemSignIn),
            headers:
            {
              'Content-Type': 'application/json'
            }
          }
        )

      if (!resultSignIn.ok) {
        const responseSignIn = await resultSignIn.text()
        console.log('Login failed:', resultSignIn.status, responseSignIn)

        if (result.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("An error occurred during login. Please try again later.");
        }
      }


      localStorage.setItem("access-token", resultSignIn.headers.get("access-token"));
      localStorage.setItem("client", resultSignIn.headers.get("client"));
      localStorage.setItem("expiry", resultSignIn.headers.get("expiry"));
      localStorage.setItem("uid", resultSignIn.headers.get("uid"));

      const userDataSignIn = await resultSignIn.json();
      localStorage.setItem("user-info", JSON.stringify(userDataSignIn));
      navigate("/dashboard/chat");
    }
    catch (error) {
      console.log('Error during login', error.message)
      setError('An error occurred during login. Please try again later.')
    }
    finally {
      setIsSignLoading(false)
    }
  }

  return (
    <>
      <div>
        <img className="registerBackground" src={imageppl} />
        <div className="registerContainer">
          {isSignInLoading ?
            <PropagateLoader
              loading={isSignInLoading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
              color="#7ca2d6"
            /> : (
              <div className="register">
                <div className="registerContent">
                  <img className="registerImg" src={logo} />
                  <h1>Sign in to your workspace</h1>
                  <p>We suggest using the
                    <span style={{ fontWeight: 'bold', color: '#107ec1' }}> email address you use at work.</span>
                  </p>
                  <form
                    className="registerForm"
                    onSubmit={(e) => { e.preventDefault(); Login; }}
                  >
                    <input
                      className="registerInput"
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="name@work-email.com"
                      required
                    />
                    <input
                      className="registerInput"
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="password"
                      required
                    />
                    {error && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>}
                    <button
                      className="registerButton"
                      onClick={Login}
                      type="button"
                      disabled={isSignInLoading}>
                      Sign in With Email
                    </button>
                    <span className="registerFooter">New to Slack?</span>
                    <span>
                      <button
                        className="registerFooterLink"
                        onClick={() => { navigate("/signup") }}>
                        Create an account
                      </button>
                    </span>
                  </form>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};