import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';
import avatar from '../assets/avatar.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import GoogleAuth from './GoogleAuth';

// Zod validation schema
const validationSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type FormData = z.infer<typeof validationSchema>;

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors ,touchedFields } } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    
  });

  const [output, setOutput] = useState<string>('');

  // Handle form submission
  const login = async (data: FormData) => {
    setOutput(''); // Clear previous output

    try {
      const response = await axios.post('http://localhost:3005/user/login', data);
      console.log(response.data);

      if (response.data.token) {
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);

        setOutput('Login successful');
        navigate(`/${response.data.role}/dashboard`);
      }
    } catch (err: any) {
      console.error(err);
      setOutput('Invalid email or password.');
    }
  };

  return (
    <div className='flex justify-evenly min-h-screen items-center '>
      <div className='w-1/2 hidden lg:block'>
        <img src="/image/3d-render-secure-login-password-illustration_107791-16640.avif" alt="Illustration" />
      </div>

      <div className="text-center w-96 p-8 bg-white rounded-lg shadow-lg space-y-5">
        <form onSubmit={handleSubmit(login)}>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Login</h2>

          <div className="flex justify-center py-4">
            <label htmlFor="profile">
              <img src={avatar} alt="Avatar" className="h-16" />
            </label>
          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Address"
            {...register('email')}
            className="w-full px-4 py-2 my-4 text-xl bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && touchedFields.email && <span className='text-red-600'>{errors.email.message}</span>}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="w-full px-4 py-2 my-4 text-xl bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && touchedFields.password && <span className='text-red-600'>{errors.password.message}</span>}

          {/* Output Message */}
          <span className="text-red-600">{output}</span>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 my-4 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to={'/signup'} className="text-blue-600 hover:text-blue-800">
              Register here
            </Link>
          </p>

        </form>
          <div className='text-center mt-4 ml-16 hover:underline'>
            <GoogleAuth name='Login' />
          </div>
      </div>
    </div>
  );
}

export default Login;
