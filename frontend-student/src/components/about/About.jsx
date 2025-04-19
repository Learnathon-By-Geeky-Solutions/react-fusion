import React from 'react';
import { saim, naim, aboutBanner } from '@/src/assets/index';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className='bg-gradient-to-b from-gray-50 to-white'>
      {/* Hero Section */}
      <section className='relative pt-24 pb-32 overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-full'>
          <div className='absolute top-0 right-0 w-1/3 h-full bg-blue-50 clip-path-diagonal'></div>
          <div className='absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-100 opacity-50 rounded-tr-full'></div>
        </div>

        <div className='container mx-auto px-4 relative z-10'>
          <motion.div
            className='max-w-4xl mx-auto text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className='text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Transforming Education for the Digital Age
            </h1>
            <p className='text-xl text-gray-600 mb-10'>
              At EduNexus, we're on a mission to democratize learning and make
              quality education accessible to everyone, everywhere.
            </p>
            <div className='flex flex-col md:flex-row gap-4 justify-center'>
              <a
                href='#story'
                className='btn-primary px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300'
              >
                Our Story
              </a>
              <a
                href='#team'
                className='btn-secondary px-8 py-3 rounded-full bg-white text-blue-600 font-medium border border-blue-600 hover:bg-blue-50 transition duration-300'
              >
                Meet the Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id='story' className='py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <motion.div
            className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <h2 className='text-3xl font-bold mb-6 text-gray-900'>
                Our Story
              </h2>
              <div className='h-1 w-24 bg-blue-600 mb-8'></div>
              <p className='text-lg text-gray-700 mb-6 text-justify'>
                EduNexus began with a simple yet powerful insight: education
                should evolve with technology, not struggle to catch up with it.
                Founded in 2023, our platform emerged from countless
                conversations with students, educators, and institutions who all
                faced similar challenges in the digital learning landscape.
              </p>
              <p className='text-lg text-gray-700 mb-6 text-justify'>
                We observed how traditional educational methods were failing to
                engage modern learners, while advanced technologies were often
                implemented without pedagogical foundations. The disconnect was
                clear—and we set out to bridge it.
              </p>
              <p className='text-lg text-gray-700 text-justify'>
                Today, EduNexus stands as a testament to what's possible when
                technology and education are thoughtfully integrated. We've
                created a platform that doesn't just digitize learning but
                transforms it, making it more personalized, accessible, and
                effective than ever before.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className='relative'>
              <div className='absolute -top-8 -left-8 w-64 h-64 bg-blue-100 rounded-full opacity-70'></div>
              <div className='relative z-10 rounded-2xl overflow-hidden shadow-xl'>
                <img
                  src={aboutBanner}
                  alt='Students learning on EduNexus'
                  className='w-full object-cover'
                />
              </div>
              <div className='absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-100 rounded-full opacity-70'></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className='py-20 bg-blue-50'>
        <div className='container mx-auto px-4'>
          <motion.div
            className='max-w-4xl mx-auto text-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-3xl font-bold mb-8 text-gray-900'>
              Our Mission
            </h2>
            <p className='text-xl text-gray-700 italic mb-10'>
              "To empower learners worldwide by creating innovative educational
              experiences that inspire curiosity, foster growth, and prepare
              individuals for the challenges of tomorrow."
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='bg-white p-8 rounded-xl shadow-lg'>
                <div className='w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-8 w-8 text-blue-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold mb-3 text-gray-900'>
                  Accessible Learning
                </h3>
                <p className='text-gray-600'>
                  Breaking down barriers to education through technology and
                  innovative teaching methods.
                </p>
              </div>

              <div className='bg-white p-8 rounded-xl shadow-lg'>
                <div className='w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-8 w-8 text-blue-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold mb-3 text-gray-900'>
                  Quality Content
                </h3>
                <p className='text-gray-600'>
                  Delivering expertly crafted educational materials that meet
                  the highest standards of excellence.
                </p>
              </div>

              <div className='bg-white p-8 rounded-xl shadow-lg'>
                <div className='w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-8 w-8 text-blue-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold mb-3 text-gray-900'>
                  Community Connection
                </h3>
                <p className='text-gray-600'>
                  Building vibrant learning communities where collaboration and
                  shared knowledge thrive.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <motion.div
              className='text-center mb-16'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className='text-3xl font-bold mb-4 text-gray-900'>
                What Sets Us Apart
              </h2>
              <p className='text-xl text-gray-600'>
                EduNexus isn't just another learning platform. Here's what makes
                our approach different.
              </p>
            </motion.div>

            <motion.div
              className='grid grid-cols-1 md:grid-cols-2 gap-12'
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={itemVariants} className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-blue-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='text-xl font-semibold mb-2 text-gray-900'>
                    Adaptive Learning Paths
                  </h3>
                  <p className='text-gray-600'>
                    Our proprietary algorithm creates personalized learning
                    journeys that adapt in real-time to each student's progress,
                    strengths, and areas for improvement.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-blue-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='text-xl font-semibold mb-2 text-gray-900'>
                    Immersive Learning Experiences
                  </h3>
                  <p className='text-gray-600'>
                    Beyond static content, we create engaging, interactive
                    learning experiences that utilize cutting-edge technology to
                    improve knowledge retention.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-blue-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='text-xl font-semibold mb-2 text-gray-900'>
                    Expert-Led Curriculum
                  </h3>
                  <p className='text-gray-600'>
                    All our courses are developed in collaboration with industry
                    leaders and academic experts to ensure relevant, up-to-date
                    content.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-blue-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='text-xl font-semibold mb-2 text-gray-900'>
                    Comprehensive Analytics
                  </h3>
                  <p className='text-gray-600'>
                    Our detailed learning analytics provide unprecedented
                    visibility into learning patterns, helping both students and
                    educators make data-driven decisions.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id='team' className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='text-3xl font-bold mb-4 text-gray-900'>
              Meet Our Founding Team
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Behind EduNexus is a passionate team of educators, technologists,
              and lifelong learners dedicated to transforming education.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto'>
            <motion.div
              className='bg-white rounded-xl overflow-hidden shadow-lg'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className='h-80 overflow-hidden'>
                <img
                  src={saim}
                  alt='Saim - Frontend Developer'
                  className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                />
              </div>
              <div className='p-8'>
                <h3 className='text-2xl font-bold mb-2 text-gray-900'>Saim</h3>
                <p className='text-blue-600 font-medium mb-4'>
                  Frontend Developer & UX Specialist
                </p>
                <p className='text-gray-600 mb-6'>
                  With a passion for creating intuitive and engaging user
                  experiences, Saim leads our frontend development team. His
                  expertise in modern web technologies ensures that EduNexus
                  offers a seamless, accessible interface for all learners.
                </p>
                <div className='flex space-x-4'>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-blue-600 transition-colors'
                  >
                    <svg
                      className='w-6 h-6'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                    </svg>
                  </a>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-blue-600 transition-colors'
                  >
                    <svg
                      className='w-6 h-6'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-blue-600 transition-colors'
                  >
                    <svg
                      className='w-6 h-6'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className='bg-white rounded-xl overflow-hidden shadow-lg'
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className='h-80 overflow-hidden'>
                <img
                  src={naim}
                  alt='Naim - Backend Developer'
                  className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                />
              </div>
              <div className='p-8'>
                <h3 className='text-2xl font-bold mb-2 text-gray-900'>Naim</h3>
                <p className='text-blue-600 font-medium mb-4'>
                  Backend Developer & System Architect
                </p>
                <p className='text-gray-600 mb-6'>
                  As our backend wizard, Naim architects the robust systems that
                  power EduNexus. His expertise in scalable architecture and
                  data management ensures our platform can support millions of
                  learners while maintaining performance and security.
                </p>
                <div className='flex space-x-4'>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-blue-600 transition-colors'
                  >
                    <svg
                      className='w-6 h-6'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                    </svg>
                  </a>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-blue-600 transition-colors'
                  >
                    <svg
                      className='w-6 h-6'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-blue-600 transition-colors'
                  >
                    <svg
                      className='w-6 h-6'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='text-3xl font-bold mb-4 text-gray-900'>
              What Our Users Say
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Thousands of students and educators are already transforming their
              learning experience with EduNexus.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            <motion.div
              className='bg-gray-50 p-8 rounded-xl relative'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className='absolute -top-6 left-8'>
                <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                    />
                  </svg>
                </div>
              </div>
              <div className='pt-6'>
                <p className='text-gray-600 italic mb-6'>
                  "EduNexus has completely transformed how I approach my
                  studies. The personalized learning paths helped me identify
                  and overcome knowledge gaps I didn't even know I had."
                </p>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4'>
                    <img
                      src='/api/placeholder/100/100'
                      alt='Student avatar'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>
                      Sarah Johnson
                    </h4>
                    <p className='text-gray-500 text-sm'>
                      Computer Science Student
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className='bg-gray-50 p-8 rounded-xl relative'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className='absolute -top-6 left-8'>
                <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                    />
                  </svg>
                </div>
              </div>
              <div className='pt-6'>
                <p className='text-gray-600 italic mb-6'>
                  "As an educator, I've seen firsthand how EduNexus engages
                  students who previously struggled in traditional classroom
                  settings. The analytics give me insights I never had before."
                </p>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4'>
                    <img
                      src='/api/placeholder/100/100'
                      alt='Teacher avatar'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>
                      Michael Rodriguez
                    </h4>
                    <p className='text-gray-500 text-sm'>High School Teacher</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className='bg-gray-50 p-8 rounded-xl relative'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className='absolute -top-6 left-8'>
                <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                    />
                  </svg>
                </div>
              </div>
              <div className='pt-6'>
                <p className='text-gray-600 italic mb-6'>
                  "We integrated EduNexus across our entire university system.
                  The implementation was seamless, and the results have exceeded
                  our expectations in student engagement and outcomes."
                </p>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4'>
                    <img
                      src='/api/placeholder/100/100'
                      alt='Administrator avatar'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>
                      Dr. Emily Chen
                    </h4>
                    <p className='text-gray-500 text-sm'>
                      University Administrator
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-blue-600'>
        <div className='container mx-auto px-4'>
          <motion.div
            className='max-w-4xl mx-auto text-center'
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-4xl font-bold mb-6 text-white'>
              Ready to Transform Your Learning Experience?
            </h2>
            <p className='text-xl text-blue-100 mb-10'>
              Join thousands of students, educators, and institutions who are
              already harnessing the power of EduNexus to revolutionize
              education.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link to='/signup'>
                <button className='px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition'>
                  Sign Up Now
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
