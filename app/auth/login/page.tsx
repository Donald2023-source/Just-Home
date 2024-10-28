'use client'
import React, { FormEvent, useState } from 'react'
import img1 from '@/Assets/pexels-expect-best-79873-323776.jpg'
import logo from '@/Assets/logo-white.svg.png'
import Image from 'next/image'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from 'next/link'
import { ToastOptions, toast } from 'react-toastify'
import { useAuthStore } from '@/app/store/authStore'
import ToastNotification from '@/app/components/ToastNotification'

const page = () => {
    const login = useAuthStore((state) => state.login)
    const [view, setView] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = () => {
      setView(!view)
    }

    const toastOptions: ToastOptions = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    };

    const handleLogin = async(e: FormEvent) => {
      e.preventDefault();

      if(!email || !password) {
        toast.error('All fields required', toastOptions);
        return;
      }

      if(password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }

      try {
        await login(email, password);
        toast.success('Sign up Successfully')
      } catch (error) {
        const err = error as { code?: string, message?: string}

        switch(err.code) {
          case 'auth/invalid-email':
            toast.error('Invalid email, Please enter a valid email', toastOptions)
            break;

            case 'auth/weak-password' : 
            toast.error('Password is too weak. Please enter a stronger password', toastOptions)

            break;

            case 'auth/email-already-in-use':
              toast.error('This email is already in use. Please use a different email', toastOptions);

              break;
              default: toast.error('Sign up failed', toastOptions);
              break;
        }
      }
    }
  return (
    <div className='relative h-screen w-screen'>
        <div>
            <Image layout='fill' objectFit='cover' src={img1} alt=''/>
        </div>

        <div className='absolute bg-black/60 w-full h-full inset-0'/>

        <form className='absolute lg:top-[15%] justify-center lg:h-fit h-full text-lg font-light flex flex-col gap-10 items-center w-full left-0 right-0'>

          <div className='lg:w-[35%] w-full lg:h-fit h-full justify-center flex backdrop-blur-2xl rounded-2xl flex-col p-10 gap-10 items-center'>
            <Image src={logo} alt='' />

          <fieldset className='flex flex-col w-full px-1 text-white'>
              <label className='text-gray-300'>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className='py-3 px-5 rounded-lg outline-none  bg-black/60' type="email" />
          </fieldset>

          <fieldset className='flex flex-col px-1 w-full text-white'>
              <label className='text-gray-300'>Password</label>
              <span className='flex items-center bg-black/60 rounded-lg'>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='py-3 bg-transparent px-5 outline-none w-[80%]' type={view ? 'text': 'password'} />
                <div onClick={handleClick} className='text-2xl cursor-pointer'>
                  { view ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </span>

          </fieldset>
            <h2 className='text-gray-200'>Already Have an Account? <Link className='' href={'/auth/signup'}>Signup</Link></h2>
            <button onClick={handleLogin} type='submit' className='py-3 text-gray-300 px-10 bg-primary  rounded-xl hover:scale-105 transition duration-300'>Sign Up</button>
          </div>

          <ToastNotification/>
        </form>
    </div>
  )
}

export default page
