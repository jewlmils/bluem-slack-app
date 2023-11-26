import { useNavigate } from "react-router-dom";
import logo from "@assets/bluem-fullname.png";
import landingpage from "@assets/landingpage.png";

export function LandingPage() {
    let navigate = useNavigate();
    return (
        <>
            <div className="lp-body">
                <div className="lp-navbar">
                    <img className="lp-logo" src={logo} />
                    <button
                        className="lp-button"
                        onClick={() => {
                            navigate("/signup");
                        }}
                    >
                        Get Started
                    </button>
                </div>
                <div className="lp-content">
                <div className="lp-intro">
                    <h1>Elevate Your Conversation</h1>
                    <h1>Anytime, Anywhere</h1>
                </div>
                <div className="lp-subintro">
                    <h3>
                        At Bluem, we believe in the power of communication. Whether you're
                        catching up with friends, collaborating with colleagues, or meeting
                        new people, our chat app is designed to make every conversation
                        memorable and effortless.
                    </h3>
                </div>
                <img className="lp-hero" src={landingpage} alt="" />
                </div>
            </div>
        </>
    );
}
