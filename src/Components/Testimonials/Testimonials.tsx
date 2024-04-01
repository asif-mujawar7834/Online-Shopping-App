import { useAppSelector } from "../../Redux/Store";

export const Testimonial = () => {
  const { mode } = useAppSelector((state) => state.Theme);
  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        <div className="container px-5 py-10 mx-auto">
          <h2
            className=" text-center text-2xl font-bold mb-10"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            What our <span className=" text-[#fb641b]">customers</span> are
            saying
          </h2>
          <div
            className={`grid gap-16 mt-40 md:gap-4 md:grid-cols-3 lg:grid-cols-3 ${
              mode === "light" ? "text-black" : "text-white"
            }`}
          >
            <div className="shadow-2xl text-center rounded-lg border border-slate-300">
              <div className="mx-auto h-20 w-20 rounded-full border border-red-500 mt-[-50px]">
                <img
                  alt="testimonial"
                  className="h-full w-full mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://cdn-icons-png.flaticon.com/128/2763/2763444.png"
                />
              </div>
              <div className="p-5">
                <h2 className="font-bold text-2xl">ABC EFG</h2>
                <span className="font-semibold text-lg">Software Engineer</span>
                <p
                  className={`italic mt-2 text-black ${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  <q>
                    I've tried many online shopping apps, but none compare to
                    the seamless experience I've had with this one. From
                    browsing to checkout, everything feels intuitive and
                    user-friendly. Plus, their customer support team is
                    incredibly responsive and helpful. I highly recommend it!
                  </q>
                </p>
              </div>
            </div>
            <div className="shadow-2xl text-center text-white bg-[#3498db] rounded-lg md:scale-110 md:mt-[-50px] md:self-start">
              <div className="mx-auto h-20 w-20 rounded-full border border-red-500 mt-[-50px]">
                <img
                  alt="testimonial"
                  className="h-full w-full mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://cdn-icons-png.flaticon.com/128/2763/2763444.png"
                />
              </div>
              <div className="p-5">
                <h2 className="font-bold text-2xl">ABC EFG</h2>
                <span className="font-semibold text-lg">Software Engineer</span>
                <p className="italic mt-2 text-white">
                  <q>
                    As a busy professional, I rely on online shopping apps to
                    simplify my life. This app has become my go-to for all my
                    shopping needs. The product selection is extensive, the
                    prices are competitive, and the delivery is always on time.
                    It's a game-changer!
                  </q>
                </p>
              </div>
            </div>
            <div className="shadow-2xl text-center border border-slate-300 rounded-lg">
              <div className="mx-auto h-20 w-20 rounded-full border border-red-500 mt-[-50px]">
                <img
                  alt="testimonial"
                  className="h-full w-full mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://cdn-icons-png.flaticon.com/128/2763/2763444.png"
                />
              </div>
              <div className="p-5">
                <h2 className="font-bold text-2xl">ABC EFG</h2>
                <span className="font-semibold text-lg">Software Engineer</span>
                <p
                  className={`italic mt-2 text-black ${
                    mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  <q>
                    I was initially skeptical about shopping for electronics
                    online, but this app changed my perception completely. Not
                    only did I find the latest gadgets at unbeatable prices, but
                    the purchasing process was secure and hassle-free. I'm a
                    satisfied customer and will definitely be returning for
                    future purchases.
                  </q>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
