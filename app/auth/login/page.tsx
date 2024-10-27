'use client'
import React, { useState } from 'react'
import img1 from '@/Assets/pexels-expect-best-79873-323776.jpg'
import logo from '@/Assets/logo-white.svg.png'
import Image from 'next/image'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from 'next/link'

const page = () => {
    const [view, setView] = useState(false);

    const handleClick = () => {
      setView(!view)
    }
  return (
    <div className='relative h-screen w-screen'>
        <div>
            <Image layout='fill' objectFit='cover' src={img1} alt=''/>
        </div>

        <div className='absolute bg-black/60 w-full h-full inset-0'/>

        <form className='absolute lg:top-[15%] justify-center h-full text-lg font-light flex flex-col gap-10 items-center w-full left-0 right-0'>

          <div className='lg:w-[35%] w-full h-full justify-center flex backdrop-blur-2xl rounded-2xl flex-col p-10 gap-10 items-center'>
            <Image src={logo} alt='' />

          <fieldset className='flex flex-col w-full px-1 text-white'>
              <label className='text-gray-300'>Email</label>
              <input className='py-3 px-5 rounded-lg outline-none  bg-black/60' type="email" />
          </fieldset>

          <fieldset className='flex flex-col px-1 w-full text-white'>
              <label className='text-gray-300'>Password</label>
              <span className='flex items-center bg-black/60 rounded-lg'>
                <input className='py-3 bg-transparent px-5 outline-none w-[80%]' type={view ? 'text': 'password'} />
                <div onClick={handleClick} className='text-2xl cursor-pointer'>
                  { view ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </span>

          </fieldset>
            <h2 className='text-gray-200'>Already Have an Account? <Link className='' href={'/auth/signup'}>Signup</Link></h2>
            <button type='submit' className='py-3 text-gray-300 px-10 bg-primary  rounded-xl hover:scale-105 transition duration-300'>Sign Up</button>
          </div>
        </form>
    </div>
  )
}

export default page
