import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { image1, image2, image3, about, avatar } from '@/src/assets/index';

export default function Home() {
  const carouselRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    {
      icon: '🎓',
      title: 'Personalized Learning',
      description:
        "AI-powered curriculum that adapts to each student's unique learning style and pace."
    },
    {
      icon: '🌎',
      title: 'Global Classroom',
      description:
        'Connect with students and educators from around the world in real-time collaborative spaces.'
    },
    {
      icon: '📊',
      title: 'Progress Analytics',
      description:
        'Comprehensive insights to track achievements and identify areas for improvement.'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'High School Teacher',
      content:
        'EduNexus has transformed my classroom. Students are more engaged and I can track their progress effectively.'
    },
    {
      name: 'Michael Chen',
      role: 'University Student',
      content:
        'The collaborative tools helped me connect with study partners worldwide. My grades have improved significantly!'
    },
    {
      name: 'Priya Patel',
      role: 'Parent',
      content:
        "I can finally keep track of my child's education and participate meaningfully in their learning journey."
    }
  ];

  // Carousel animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const firstChild = carouselRef.current.firstElementChild;
        carouselRef.current.appendChild(firstChild.cloneNode(true));
        carouselRef.current.removeChild(firstChild);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Feature animation
  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(featureInterval);
  }, [features.length]);

  return (
    <div className='relative bg-white w-full m-0 p-0'>
      {/* Hero Section with Image Carousel */}
      <section className='relative h-screen'>
        {/* Static Overlay Content */}
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-center p-6 z-10'>
          <motion.h1
            className='text-4xl md:text-6xl font-bold'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            EduNexus
          </motion.h1>
          <motion.h4
            className='text-lg md:text-2xl mt-2'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Connecting Minds, Empowering Futures
          </motion.h4>
          <motion.p
            className='text-base mt-4 max-w-lg'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transform education through our innovative platform that bridges
            students, educators, and content in a seamless digital ecosystem
          </motion.p>
          <motion.div
            className='flex gap-4 mt-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <button className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
              Get Started
            </button>
            <button className='px-6 py-3 bg-transparent border border-white text-white rounded-lg hover:bg-white/10 transition'>
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Image Carousel using Tailwind CSS */}
        <div className='relative w-full h-full overflow-hidden'>
          <div ref={carouselRef} className='flex w-full h-full'>
            {/* Replace 'image1', 'image2', 'image3' with your actual image imports */}
            {[image1, image2, image3].map((img, index) => (
              <div key={index} className='w-full flex-shrink-0'>
                <img
                  src={img}
                  alt={`Education scene ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className='py-16 px-4 bg-gray-50'>
        <div className='container mx-auto max-w-6xl'>
          <div className='flex flex-col md:flex-row items-center gap-12'>
            <motion.div
              className='md:w-1/2'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className='text-3xl font-bold text-gray-800 mb-4'>
                Our Mission
              </h2>
              <p className='text-gray-600 mb-6'>
                At EduNexus, we believe education should be accessible,
                engaging, and effective for everyone. Our platform combines
                cutting-edge technology with proven pedagogical methods to
                create a learning experience that inspires curiosity and fosters
                growth.
              </p>
              <p className='text-gray-600 mb-6'>
                Founded by a team of educators and technologists, EduNexus
                bridges the gap between traditional education and the digital
                future, creating pathways for learners of all ages to reach
                their full potential.
              </p>
              <button className='px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
                About Us
              </button>
            </motion.div>
            <motion.div
              className='md:w-1/2 bg-blue-600 rounded-lg p-6 text-white'
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className='relative h-64 overflow-hidden rounded-lg mb-4'>
                <img
                  src={about}
                  alt='About Us'
                  className='w-full h-full object-cover'
                />
              </div>
              <h3 className='text-xl font-bold mb-2'>Team React Fusion</h3>
              <p>
                A collective of passionate developers, designers, and educators
                dedicated to revolutionizing how we learn and teach in the
                digital age.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section with Animation */}
      <section className='py-16 px-4'>
        <div className='container mx-auto max-w-6xl text-center'>
          <motion.h2
            className='text-3xl font-bold text-gray-800 mb-2'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Powerful Features
          </motion.h2>
          <motion.p
            className='text-gray-600 mb-12 max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Everything you need to create an exceptional learning experience
          </motion.p>

          <div className='grid md:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg transition-all duration-300 ${
                  activeFeature === index
                    ? 'bg-blue-50 shadow-lg scale-105'
                    : 'bg-white shadow'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='text-4xl mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-bold text-gray-800 mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-600'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16 px-4 bg-gray-50'>
        <div className='container mx-auto max-w-6xl'>
          <motion.h2
            className='text-3xl font-bold text-gray-800 mb-12 text-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>

          <div className='grid md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className='bg-white p-6 rounded-lg shadow'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='mb-4 text-blue-600'>{'★'.repeat(5)}</div>
                <p className='text-gray-600 mb-6 italic'>
                  "{testimonial.content}"
                </p>
                <div className='flex items-center'>
                  <div className='w-10 h-10 bg-gray-300 rounded-full mr-3'>
                    <img
                      src={avatar}
                      alt={testimonial.name}
                      className='w-full h-full object-cover rounded-full'
                    />
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-800'>
                      {testimonial.name}
                    </h4>
                    <p className='text-gray-600 text-sm'>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 px-4 bg-blue-600 text-white'>
        <div className='container mx-auto max-w-6xl text-center'>
          <motion.h2
            className='text-3xl font-bold mb-4'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Learning Experience?
          </motion.h2>
          <motion.p
            className='mb-8 max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of students and educators who are already
            revolutionizing how they teach and learn with EduNexus.
          </motion.p>
          <motion.div
            className='flex flex-col sm:flex-row gap-4 justify-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className='px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition'>
              Sign Up Now
            </button>
            <button className='px-8 py-3 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white/10 transition'>
              Request Demo
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
