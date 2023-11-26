import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@assets/bluem-fullname.png";

export const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function Register() {
        try {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match')
            }

            setIsSubmitting(true)

            const item =
            {
                password,
                password_confirmation: confirmPassword,
                email
            }
            console.log(item);

            const result = await fetch
                ('http://206.189.91.54/api/v1/auth/',
                    {
                        method: 'POST',
                        body: JSON.stringify(item),
                        headers:
                        {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )

            if (!result.ok) {
                const response = await result.json()
                if (response.errors && response.errors.full_messages) {
                    const errorMsg = response.errors.full_messages.join(',')
                    throw new Error(errorMsg)
                }
                throw new Error(`Registration failed: ${result.statusText}`);
            }

            // Extract headers from the response
            const headers = result.headers;
            const accessToken = headers.get('access-token');
            const client = headers.get('client');
            const expiry = headers.get('expiry');
            const uid = headers.get('uid');

            // Save headers to localStorage
            localStorage.setItem('access-token', accessToken);
            localStorage.setItem('client', client);
            localStorage.setItem('expiry', expiry);
            localStorage.setItem('uid', uid);

            const userData = await result.json()
            localStorage.setItem('user-info', JSON.stringify(userData))
            navigate('/dashboard/chat')
        }
        catch (error) {
            console.log('Error during registration:', error.message)
            if (error.message.includes('Email has already been taken')) {
                setError('Email is already registered. Please use a different email.')
            }
            else {
                setError(`Registration failed: ${error.message}`)
            }
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <div className="register">
                <div className="registerContent">
                    <img className="registerImg" src={logo} />
                    <h1>Join the Bleum workspace </h1>
                    <p>We suggest using the
                        <span style={{ fontWeight: 'bold' }}>email address you use at work.</span>
                    </p>
                    <form className="registerForm">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="registerInput"
                            type="email"
                            placeholder="name@work-email.com"
                            required
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="registerInput"
                            type="password"
                            placeholder="password"
                            required
                        />
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="registerInput"
                            type="password"
                            placeholder="confirm password"
                            required
                        />
                        {error && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>}
                        <button
                            className="registerButton"
                            onClick={Register}
                            type="button"
                            disabled={isSubmitting}>
                            Create Account
                        </button>
                        {isSubmitting && <p>Loading...</p>}
                        <span className="registerFooter">Already using Slack?</span>
                        <span>
                            <button
                                className="registerFooterLink"
                                onClick={() => { navigate('/signin') }}>
                                Sign in to an existing workspace
                            </button>
                        </span>
                    </form>
                </div>
            </div>
        </>
    )
};
