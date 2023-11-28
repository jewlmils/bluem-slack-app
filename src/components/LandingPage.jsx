import { useNavigate } from "react-router-dom";
import logo from "@assets/bluem-fullname.png";
import people from '@assets/people-01.png'
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
                            navigate("/signin");
                        }}
                    >
                        Get Started
                    </button>
                </div>
                <div className="lp-content">
                <div className="lp-intro">
                    <h1>Connect anytime, anywhere</h1>
                </div>
                <div className="lp-subintro">
                    <h3>
                    Bluem: Redefining conversations for effortless and memorable communication.
                    </h3>
                    </div>
                    <img className="lp-hero" src={people} alt="" />
                </div>
            </div>
           
        </>
    );
}
