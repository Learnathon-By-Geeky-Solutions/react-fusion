import { image1, image2, image3 } from "../../assets";
import { useEffect, useRef } from "react";

export default function Home() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const firstChild = carouselRef.current.firstElementChild;
        carouselRef.current.appendChild(firstChild.cloneNode(true));
        carouselRef.current.removeChild(firstChild);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-base-100">
      {/* Carousel Background */}
      <div className="relative w-full h-[80vh] ">
        <div
          ref={carouselRef}
          className="flex w-full h-full transition-transform duration-1000 ease-in-out"
        >
          {[image1, image2, image3].map((img, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay with Hero Section */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 text-white flex items-center justify-center z-10">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">EduNexus</h1>
          <h4 className="text-xl md:text-2xl font-medium mb-2">
            Connecting Minds, Empowering Futures.
          </h4>
          <p className="text-md md:text-lg mb-6">A Project by Team React Fusion</p>
          <button className="btn btn-primary btn-lg normal-case text-white">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
