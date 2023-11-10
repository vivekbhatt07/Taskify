import Lottie from "lottie-react";
import LoaderLottie from "../../../Assets/Lottie/LoaderLottie.json";

const LightLoader = () => (
  <div className="w-20 h-20 mx-auto">
    <Lottie animationData={LoaderLottie} loop={true} />
  </div>
);

export default LightLoader;
