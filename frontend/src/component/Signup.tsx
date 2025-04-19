import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import signupimg from '../assets/sign-up.png'
import axios from 'axios'
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import GoogleAuth from './GoogleAuth'


const validate = z.object({
  name: z.string().min(3, 'Enter your name'),
  email: z.string().email('Enter Valid Email'),
  password: z.string().min(8, 'password musd be 8 character'),
  confirmPassword: z.string().min(8,'confirm password musd be 8 character')
})
const Signup: React.FC = () => {
  type formData = z.infer<typeof validate>
  const navigate = useNavigate()

  const {register,handleSubmit,formState:{errors,touchedFields}} = useForm<formData>({
 resolver: zodResolver(validate)   
  });

  const [output, setOutput] = useState<string>('');
 

  // Handle form input changes
  


  // Handle form submission
  const Signup = (formData:formData) => {
    
   
      if (formData.password == formData.confirmPassword) {
       
        const userDetails = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

        axios
          .post('http://localhost:3005/user/signup', userDetails)
          .then((response: any) => {
            if (response.data.token) {
              localStorage.setItem('name', response.data.name);
              localStorage.setItem('user_id', response.data.id);
              localStorage.setItem('token', response.data.token);
              var role = response.data.role
              localStorage.setItem('role', response.data.role);



              setOutput('User registered successfully');
              navigate(`/${role}/dashboard`);;
            } else {
              setOutput('Something went wrong');
            }
          })
          .catch(() => {
            setOutput('User already registered or an error occurred');
          });
      }
      else {

        setOutput('enter correct password')
      }

    

  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Signup Image */}
      <div className="w-full lg:w-1/2 hidden lg:block">
        <img src={signupimg} alt="Signup" className="w-full h-auto object-cover" />
      </div>
  
      {/* Signup Form */}
      <div className="bg-gradient-to-t from-white to-gray-200 w-full lg:w-1/2 p-8 rounded-lg shadow-lg mt-8 lg:mt-0 max-w-md">
        <form onSubmit={handleSubmit(Signup)} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-700">Create an Account</h2>
  
          <div className="flex justify-center py-4">
            <label htmlFor="profile" className="cursor-pointer">
              <img src={avatar} alt="avatar" className="h-16 w-16 rounded-full" />
            </label>
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-600">Full Name</label>
            {errors.name && touchedFields.name && <span className="text-red-600">{errors.name.message}</span>}
            <input
              type="text"
              {...register('name')}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-600">Email Address</label>
            {errors.email && touchedFields.email && <span className="text-red-600">{errors.email.message}</span>}
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-600">Password</label>
            {errors.password && touchedFields.password && <span className="text-red-600">{errors.password.message}</span>}
            <input
              type="password"
              {...register('password')}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-600">Confirm Password</label>
            {errors.confirmPassword && touchedFields.confirmPassword && (
              <span className="text-red-600">{errors.confirmPassword.message}</span>
            )}
            <input
              type="password"
              {...register('confirmPassword')}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>
  
          <span className="text-sm text-red-600 block text-center">{output}</span>
  
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
  
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
  
        <div className="text-center mt-4 lg:ml-16 ">
          <GoogleAuth name="Sign Up" />
        </div>
      </div>
    </div>
  );
  
};

export default Signup;
