'use client';
import React, { useState, FormEvent, useEffect } from 'react';
import img1 from '@/Assets/pexels-expect-best-79873-323776.jpg';
import logo from '@/Assets/logo-white.svg.png';
import Image from 'next/image';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from 'next/link';
import { useAuthStore } from '@/app/store/authStore';
import { toast, ToastOptions } from 'react-toastify';
import ToastNotification from '@/app/components/ToastNotification';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
    const router = useRouter();
    const [view, setView] = useState(false);
    const handleClick = () => setView(!view);
    
    const signup = useAuthStore((state) => state.signup);
    const { isAuthenticated } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const toastOptions: ToastOptions = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    };

    const handleSignUp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      
      // Validate inputs before proceeding
      if (!email || !password || !name) {
        toast.error('Please fill in all fields.', toastOptions);
        return;
      }
    
      // Check password length
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters long.', toastOptions);
        return;
      }
      
      try {
        await signup(email, password, name);
        toast.success('Sign up successfully!', toastOptions);
      } catch (error) {
        const err = error as { code?: string; message?: string };
    
        switch (err.code) {
          case 'auth/invalid-email':
            toast.error('Invalid email address. Please enter a valid email.', toastOptions);
            break;
          case 'auth/weak-password':
            toast.error('The password is too weak. Please choose a stronger password.', toastOptions);
            break;
          case 'auth/email-already-in-use':
            toast.error('This email is already in use. Please use a different email.', toastOptions);
            break;
          default:
            toast.error(err.message || 'Sign up failed', toastOptions);
            break;
        }
      }
    };
    
    

    useEffect(() => {
      if (isAuthenticated) {
          router.push('/Dashboard');
      }
    }, [isAuthenticated, router]);

    return (
      <div className='relative h-screen w-screen'>
        <div>
          <Image layout='fill' objectFit='cover' src={img1} alt='' />
        </div>
        <div className='absolute bg-black/60 w-full h-full inset-0' />
        
        <form className='absolute lg:top- justify-center h-full text-lg font-light flex flex-col gap-10 items-center w-full left-0 right-0' onSubmit={handleSignUp}>
          <div className='lg:w-[35%] w-full lg:h-fit h-full justify-center flex backdrop-blur-2xl rounded-2xl flex-col py-10 px-6 lg:gap-10 gap-5 items-center'>
            <Image src={logo} alt='' />

            <fieldset className='flex flex-col w-full px-1 text-white'>
              <label className='text-gray-300'>Full Name</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className='lg:py-3 py-2 px-5 rounded-lg outline-none bg-black/60' type="text" />
            </fieldset>

            <fieldset className='flex flex-col w-full px-1 text-white'>
              <label className='text-gray-300'>Email</label>
              <input required value={email} onChange={(e) => setEmail(e.target.value)} className='lg:py-3 py-2 px-5 rounded-lg outline-none bg-black/60' type="email" />
            </fieldset>

            <fieldset className='flex flex-col px-1 w-full text-white'>
              <label className='text-gray-300'>Password</label>
              <span className='flex items-center bg-black/60 rounded-lg'>
                <input required value={password} placeholder='At least 6 characters' onChange={(e) => setPassword(e.target.value)} className='lg:py-3 py-2 bg-transparent px-5 outline-none w-[80%]' type={view ? 'text' : 'password'} />
                <div onClick={handleClick} className='text-2xl cursor-pointer'>
                  {view ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </span>
            </fieldset>

            <h2 className='text-gray-200'>Already Have an Account? <Link className='' href={'/auth/login'}>Login</Link></h2>
            <button type='submit' className='py-3 text-gray-300 px-10 bg-primary rounded-xl hover:scale-105 transition duration-300'>Sign Up</button>
          </div>
        </form>
        <ToastNotification />
      </div>
    );
};

export default SignUpPage;
