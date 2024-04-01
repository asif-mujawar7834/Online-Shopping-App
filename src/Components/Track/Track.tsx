import { FaTshirt, FaStopwatch20, FaMobileAlt, FaTv } from "react-icons/fa";

export const Track = () => {
  return (
    <section className="grid gap-6 m-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="shadow-md rounded-md bg-[#F5F7F8]">
        <div className="flex items-center justify-center h-32 bg-[#97E7E1] rounded-md">
          <FaTshirt className="text-6xl" />
        </div>
        <div className="text-center p-2">
          <h3 className="font-bold text-xl">Premium Shirts</h3>
          <p className="">
            Experience unparalleled comfort and style with meticulously crafted
            shirts from top designers.
          </p>
        </div>
      </div>
      <div className="shadow-md rounded-md bg-[#F5F7F8]">
        <div className="h-32 flex items-center bg-[#FEC7B4] rounded-md justify-center">
          <FaStopwatch20 className="text-6xl" />
        </div>
        <div className="text-center p-2">
          <h3 className="font-bold text-xl">Elite Smartwatch</h3>
          <p>
            Seamlessly blend fashion and technology with cutting-edge features
            and sleek designs.
          </p>
        </div>
      </div>
      <div className="shadow-md rounded-md bg-[#F5F7F8]">
        <div className="flex items-center justify-center h-32 bg-[#FFE382] rounded-md">
          <FaMobileAlt className="text-6xl" />
        </div>
        <div className="text-center p-2">
          <h3 className="font-bold text-xl">Cutting-Edge Smartphone</h3>
          <p>
            Stay connected and productive with high-performance devices that
            redefine mobile communication.
          </p>
        </div>
      </div>
      <div className="shadow-md rounded-md bg-[#F5F7F8]">
        <div className="flex items-center justify-center h-32 bg-[#FAAB78] rounded-md">
          <FaTv className="text-6xl" />
        </div>
        <div className="text-center p-2">
          <h3 className="font-bold text-xl">Next-Gen TV Lineup</h3>
          <p>
            Enjoy stunning visuals and immersive sound quality with
            state-of-the-art television technology.
          </p>
        </div>
      </div>
    </section>
  );
};
