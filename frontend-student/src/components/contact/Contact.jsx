import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';

function ContactUs() {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required')
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form values:', values);

    setTimeout(() => {
      setSubmitting(false);
      resetForm();
      toast.success('Message sent successfully!');
    }, 500);
  };

  return (
    <div className='bg-gray-50 min-h-screen pt-16 pb-12'>
      <div className='container mx-auto px-4 max-w-6xl'>
        {/* Page Header */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl md:text-4xl font-bold text-blue-600 mb-2'>
            Contact Us
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Have questions or need assistance? We're here to help. Reach out to
            us using the form below or through our contact information.
          </p>
        </div>

        {/* Main Content */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='md:flex'>
            {/* Left Side - Contact Information */}
            <div className='md:w-2/5 bg-blue-600 text-white p-8 md:p-12'>
              <h2 className='text-2xl font-bold mb-6'>Get in Touch</h2>

              <div className='space-y-8'>
                {/* Address */}
                <div className='flex items-start'>
                  <div className='mr-4 mt-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg text-left'>Address</h3>
                    <p className='mt-1 text-left'>123 Education Street</p>
                    <p className='text-left'>Learning District</p>
                    <p className='text-left'>New York, NY 10001</p>
                  </div>
                </div>

                {/* Phone */}
                <div className='flex items-start'>
                  <div className='mr-4 mt-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg text-left'>Phone</h3>
                    <p className='mt-1 text-left'>Main: (555) 123-4567</p>
                    <p className='text-left'>Support: (555) 987-6543</p>
                  </div>
                </div>

                {/* Email */}
                <div className='flex items-start'>
                  <div className='mr-4 mt-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg text-left'>Email</h3>
                    <p className='mt-1 text-left'>info@edunexus.example</p>
                    <p className='text-left'>support@edunexus.example</p>
                  </div>
                </div>

                {/* Hours */}
                <div className='flex items-start'>
                  <div className='mr-4 mt-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg text-left'>Hours</h3>
                    <p className='mt-1 text-left'>Monday - Friday: 9AM - 5PM</p>
                    <p className='text-left'>Saturday: 10AM - 2PM</p>
                    <p className='text-left'>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className='mt-12'>
                <h3 className='font-semibold text-lg mb-4'>Connect With Us</h3>
                <div className='flex space-x-4 justify-center'>
                  <a
                    href='#'
                    className='bg-white/20 hover:bg-white/30 rounded-full p-2 transition'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </a>
                  <a
                    href='#'
                    className='bg-white/20 hover:bg-white/30 rounded-full p-2 transition'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                    </svg>
                  </a>
                  <a
                    href='#'
                    className='bg-white/20 hover:bg-white/30 rounded-full p-2 transition'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className='md:w-3/5 p-8 md:p-12'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                Send Us a Message
              </h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className='space-y-6'>
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Your Name
                      </label>
                      <Field
                        type='text'
                        id='name'
                        name='name'
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                        placeholder='John Doe'
                      />
                      <ErrorMessage
                        name='name'
                        component='div'
                        className='mt-1 text-sm text-red-600'
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Email Address
                      </label>
                      <Field
                        type='email'
                        id='email'
                        name='email'
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                        placeholder='your@email.com'
                      />
                      <ErrorMessage
                        name='email'
                        component='div'
                        className='mt-1 text-sm text-red-600'
                      />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label
                        htmlFor='subject'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Subject
                      </label>
                      <Field
                        type='text'
                        id='subject'
                        name='subject'
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                        placeholder='How can we help you?'
                      />
                      <ErrorMessage
                        name='subject'
                        component='div'
                        className='mt-1 text-sm text-red-600'
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor='message'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Message
                      </label>
                      <Field
                        as='textarea'
                        id='message'
                        name='message'
                        rows='5'
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Write your message here...'
                      />
                      <ErrorMessage
                        name='message'
                        component='div'
                        className='mt-1 text-sm text-red-600'
                      />
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-blue-400'
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
