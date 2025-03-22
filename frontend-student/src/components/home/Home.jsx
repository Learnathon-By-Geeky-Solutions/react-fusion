import { image1, image2, image3 } from "../../assets";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="relative bg-background w-full m-0 p-0">
      {/* Static Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-center p-6 z-10">
        <h1 className="text-4xl md:text-6xl font-bold">EduNexus</h1>
        <h4 className="text-lg md:text-2xl mt-2">
          Connecting Minds, Empowering Futures.
        </h4>
        <p className="text-l md:text-l mt-2">A Project by Team React Fusion</p>
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Learn More
        </button>
      </div>

      {/* Image Carousel */}
      <Carousel
        className="w-full mx-auto"
        opts={{
          loop: true,
          align: "start",
          skipSnaps: false,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
      >
        <CarouselContent className="h-[80vh]">
          {[image1, image2, image3].map((img, index) => (
            <CarouselItem key={index} className="relative">
              <img
                src={img}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
