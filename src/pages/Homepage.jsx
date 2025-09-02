import { useNavigate } from "react-router-dom";

import HeroImage from "../components/Landing/HeroImage";
import LandingNav from "../components/Landing/LandingNav";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <LandingNav>
        <div className="space-x-4 mr-3">
          <button className="bg-pink-550 text-white py-2 px-4 rounded-[10px]"
          onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="bg-pink-550 text-white py-2 px-4 rounded-[10px]"
          onClick={() => navigate("/select")}>
            Get Started
          </button>
        </div>
      </LandingNav>
      <HeroImage />
    </>
  );
}
