import { useState } from "react";
import { bannerImages } from "../../utils/StaticData";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const handleLeft = () => {
    index === 0
      ? setIndex(bannerImages.length - 1)
      : setIndex((prevIndex) => prevIndex - 1);
  };

  const handleRight = () => {
    index === bannerImages.length - 1
      ? setIndex(0)
      : setIndex((prevIndex) => prevIndex + 1);
  };
  return (
    <div className="h-80 relative">
      <img src={bannerImages[index]} className="h-full w-full" />
      <div className="absolute top-[50%] translate-y-[-50%]">
        <button
          className="bg-slate-500 p-3 rounded-full text-white"
          onClick={handleLeft}
        >
          <FaAngleLeft />
        </button>
      </div>
      <div className="absolute top-[50%] translate-y-[-50%] right-0">
        <button
          className="bg-slate-500 p-3 rounded-full text-white"
          onClick={handleRight}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};
