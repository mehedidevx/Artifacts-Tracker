import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FiSun, FiSearch, FiHome } from "react-icons/fi";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const btns = [
    <Link to="/all-artifacts" key="all-artifacts">
      <button className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded shadow hover:opacity-90 transition">
       Explore Artifact
      </button>
    </Link>,

    
  ];

  return (
    <div className="w-full h-[420px] md:h-[520px]">
      <Swiper
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-full bg-cover bg-center flex items-center justify-center bg-[url('https://i.postimg.cc/3w80Vg1r/pngtree-traditional-wooden-shields-a-collection-of-handcrafted-armor-for-historical-reenactments-ima.jpg')]">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Content */}
            <div className="relative z-10 bg-[#2a0e61]/70 text-white p-3 md:p-12 rounded-xl shadow-lg max-w-3xl text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                <Typewriter
                  words={["Preserve Our Heritage"]}
                  loop={false}
                  cursor
                  cursorStyle="_"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
              <p className="mt-4 text-gray-200 leading-relaxed">
               Join us in documenting and safeguarding historical artifacts for future generations.
              </p>
              <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
                {btns}
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-full bg-cover bg-center flex items-center justify-center bg-[url('https://i.postimg.cc/W45qvhYG/pngtree-tanabata-history-exhibit-with-traditional-artifacts-and-scrolls-image-17418617.jpg')]">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Content */}
            <div className="relative z-10 bg-[#2a0e61]/70 text-white p-8 md:p-12 rounded-xl shadow-lg max-w-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
               <Typewriter
                  words={["Uncover Ancient Wonders"]}
                  loop={false}
                  cursor
                  cursorStyle="_"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h2>
              <p>
                Journey through time and explore artifacts that shaped civilizations.
              </p>
              <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
                {btns}
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-full bg-cover bg-center flex items-center justify-center bg-[url('https://i.postimg.cc/G298hd6Z/colorful-celebration-india-independence-day-traditional-drums-paints-cultural-artifacts-vibrant-disp.webp')]">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Content */}
            <div className="relative z-10 bg-[#2a0e61]/70 text-white p-8 md:p-12 rounded-xl shadow-lg max-w-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
               <Typewriter
                  words={["Mysteries of the Past"]}
                  loop={false}
                  cursor
                  cursorStyle="_"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h2>
              <p>
               Delve into the enigmatic stories behind lost relics and forgotten treasures.
              </p>
              <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
                {btns}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
