import { image1, image2, image3 } from "../../assets";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="bg-background">
      <Carousel
        className="w-full max-w-screen-xl mx-auto" 
        plugins={[
          Autoplay({
            delay: 3000, 
          }),
        ]}
      >
        <CarouselContent className="h-[80vh]"> 
          {[image1, image2, image3].map((img, index) => (
            <CarouselItem key={index} className="relative">
              <img src={img} alt={`Image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              
              // Contents start here
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-center p-6">
                <h1 className="text-4xl md:text-6xl font-bold">Your Big Header</h1>
                <p className="text-lg md:text-2xl mt-2">This is a subheader with some description.</p>
                <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Learn More
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
