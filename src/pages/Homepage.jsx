import HeroImage from '../components/Landing/HeroImage';
import LandingNav from '../components/Landing/LandingNav';

export default function Homepage() {
  return (
    <>
      <LandingNav>
        <div className="space-x-4">
          <button className="bg-pink-550 text-white py-2 px-4 rounded-[10px]">
            Login
          </button>
          <button className="bg-pink-550 text-white py-2 px-4 rounded-[10px]">
            Get Started
          </button>
        </div>
      </LandingNav>
      <HeroImage />
    </>
  );
}
