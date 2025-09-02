import LandingNav from "../components/Landing/LandingNav";
export default function SelectSection() {
  return (
    <>
      <LandingNav>
        <button className="bg-pink-550 text-white py-2 px-4 rounded-[10px] mr-3">
          Sign Up
        </button>
      </LandingNav>
      <div className="flex flex-col items-center w-full max-w-[960px] h-[890px] mx-auto">
        <div className="flex flex-col items-center px-4 py-5 w-full">
          <h2 className="text-[28px] leading-[35px] font-bold text-center text-[#171217] font-lexend">
            Welcome to Her haven
          </h2>
        </div>

        <div className="flex flex-col items-center px-4 py-3 w-full">
          <p className="text-[16px] leading-[24px] text-center text-[#171217] max-w-[928px] font-lexend">
            Choose the section that best fits your needs. We're here to support
            you every step of the way.
          </p>
        </div>

        <div className="flex flex-row justify-center items-start w-full max-w-[1062px] h-[132px]">
          <div className="flex flex-wrap justify-center items-start content-center gap-3 w-[480px] h-[132px]">
            <button className="flex justify-center items-center px-5 w-[304px] h-[48px] bg-[#F042B5] rounded-xl font-lexend text-white font-bold text-[16px] leading-[24px]">
              Pregnancy & Postpartum Support
            </button>
            <button className="flex justify-center items-center px-5 w-[300px] h-[48px] bg-[#F042B5] rounded-xl font-lexend text-white font-bold text-[16px] leading-[24px]">
              Breast Cancer Detection
            </button>
          </div>
        </div>

        <div className="flex flex-row items-start p-4 w-full max-w-[960px] h-[651px] bg-white rounded-xl mt-6">
          <div className="flex gap-2 w-full h-[619px]">
            <div className="w-[456px] h-[619px] rounded-xl bg-[url('./pregnancy.png')] bg-cover bg-center" />
            <div className="w-[464px] h-[619px] rounded-xl bg-[url('./breast-cancer.png')] bg-cover bg-center" />
          </div>
        </div>
      </div>
    </>
  );
}
