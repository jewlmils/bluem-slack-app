import { useNavigate } from "react-router-dom";
import { logo, people } from "@assets";

function LandingPage() {
  let navigate = useNavigate();
  return (
    <>
      <div className="h-screen">
        <div className="flex justify-between items-center px-16 py-4 border-b-2">
          <img className="w-[10rem]" src={logo} />
          <button
            className="border border-black rounded-full px-8 py-2 font-bold"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Get Started
          </button>
        </div>
        <div className="flex flex-col justify-center items-center text-center font-bolder py-4">
          <div className="text-6xl pb-2">
            <h1>Connect anytime, anywhere</h1>
          </div>
          <div className="text-md">
            <h3>
              Bluem: Redefining conversations for effortless and memorable
              communication.
            </h3>
          </div>
          <img
            className="w-[90rem] fixed bottom-0 left-[50%] transform -translate-x-1/2 flex justify-center items-center"
            src={people}
          />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
