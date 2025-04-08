import { image1, image2, image3 } from '../../assets';
import { useEffect, useRef } from 'react';

export default function Home() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const firstChild = carouselRef.current.firstElementChild;
        carouselRef.current.appendChild(firstChild.cloneNode(true));
        carouselRef.current.removeChild(firstChild);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative bg-background w-full m-0 p-0'>
      {/* Static Overlay Content */}
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-center p-6 z-10'>
        <h1 className='text-4xl md:text-6xl font-bold'>EduNexus</h1>
        <h4 className='text-lg md:text-2xl mt-2'>
          Connecting Minds, Empowering Futures.
        </h4>
        <p className='text-l md:text-l mt-2'>A Project by Team React Fusion</p>
        <button className='mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>
          Learn More
        </button>
      </div>

      {/* Image Carousel using Tailwind CSS */}
      <div className='relative w-full h-[80vh] overflow-hidden'>
        <div ref={carouselRef} className='flex w-full h-full animate-carousel'>
          {[image1, image2, image3].map((img, index) => (
            <div key='Carousel Images' className='w-full flex-shrink-0'>
              <img
                src={img}
                alt={`${index + 1}`}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
