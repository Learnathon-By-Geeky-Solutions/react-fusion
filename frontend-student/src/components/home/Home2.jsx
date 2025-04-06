import { image1, image2, image3 } from "../../assets";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

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
    <div className="relative w-full bg-background">
      {/* Carousel */}
      <div className="relative w-full h-screen">
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

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center text-white z-10">
        <div className="text-center px-6 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            EduNexus
          </h1>
          <h4 className="text-xl md:text-2xl font-medium">
            Connecting Minds, Empowering Futures.
          </h4>
          <p className="text-md md:text-lg">
            A Project by Team React Fusion
          </p>
          <Button className="text-white text-base md:text-lg px-6 py-4 rounded-xl">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
