import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast, Toaster } from 'sonner';
import { instructorAuthService } from '@/src/services/auth';

export default function InstructorSignup() {
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    const result = await instructorAuthService.signUpInstructor(data);
    if (result.success) {
      toast.success('Instructor Account Created.');
      navigate('/');
    } else {
      toast.error('ERROR!');
    }
  };

  const signupFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      contactNumber: '',
      experience: '',
      gender: '',
      qualification: '',
      currentWorkingPlace: '',
      designation: ''
    },
    onSubmit: handleSignUp
  });

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-xl font-semibold mb-4'>Instructor Sign Up</h2>
        <p className='text-sm text-gray-500 mb-4'>
          Enter details to create an instructor account
        </p>

        <form onSubmit={signupFormik.handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium'>
              Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className='w-full p-2 border rounded-md'
              onChange={signupFormik.handleChange}
              value={signupFormik.values.name}
              required
            />
          </div>

          <div>
            <label htmlFor='email' className='block text-sm font-medium'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='w-full p-2 border rounded-md'
              onChange={signupFormik.handleChange}
              value={signupFormik.values.email}
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              className='w-full p-2 border rounded-md'
              onChange={signupFormik.handleChange}
              value={signupFormik.values.password}
              required
            />
          </div>

          <div>
            <label
              htmlFor='contactNumber'
              className='block text-sm font-medium'
            >
              Contact No
            </label>
            <input
              type='text'
              name='contactNumber'
              id='contactNumber'
              className='w-full p-2 border rounded-md'
              onChange={signupFormik.handleChange}
              value={signupFormik.values.contactNumber}
              required
            />
          </div>

          <div>
            <label htmlFor='experience' className='block text-sm font-medium'>
              Experience (Years)
            </label>
            <input
              type='number'
              name='experience'
              id='experience'
              className='w-full p-2 border rounded-md'
              onChange={signupFormik.handleChange}
              value={signupFormik.values.experience}
              required
            />
          </div>

          <div>
            <label htmlFor='gender' className='block text-sm font-medium'>
              Gender
            </label>
            <select
              name='gender'
              id='gender'
              className='w-full p-2 border rounded-md'
              onChange={signupFormik.handleChange}
              value={signupFormik.values.gender}
              required
            >
              <option value='' disabled>
                Select Gender
              </option>
              <option value='MALE'>Male</option>
              <option value='FEMALE'>Female</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='qualification'
              className='block text-sm font-medium'
            >
              Qualification
            </label>
            <select
              name='qualification'
              id='qualification'
              className='w-full p-2 border rounded-md'
              onChange={signupFormik.handleChange}
              value={signupFormik.values.qualification}
              required
            >
              <option value='' disabled>
                Select Qualification
              </option>
              <option value='BACHELORS'>Bachelors</option>
              <option value='MASTERS'>Masters</option>
              <option value='PHD'>PhD</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='currentWorkingPlace'
              className='block text-sm font-medium'
            >
              Current Workplace
            </label>
            <input
              type='text'
              name='currentWorkingPlace'
              id='currentWorkingPlace'
              className='w-full p-2 border rounded-md'
              onChange={signupFormik.handleChange}
              value={signupFormik.values.currentWorkingPlace}
            />
          </div>

          <div>
            <label htmlFor='designation' className='block text-sm font-medium'>
              Designation
            </label>
            <input
              type='text'
              name='designation'
              id='designation'
              className='w-full p-2 border rounded-md'
              onChange={signupFormik.handleChange}
              value={signupFormik.values.designation}
            />
          </div>

          <button
            type='submit'
            className='w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition'
          >
            Sign Up
          </button>
        </form>

        <p className='text-sm mt-4'>
          Already have an account?{' '}
          <Link to='/' className='text-blue-600 hover:underline'>
            Log In
          </Link>
        </p>
      </div>

      <Toaster position='bottom-right' richColors />
    </div>
  );
}
