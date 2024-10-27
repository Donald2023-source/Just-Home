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

        <form className='absolute top-[30%] text-lg font-light flex flex-col gap-10 items-center w-full h-fit left-0 right-0'>
          <Image src={logo} alt='' />

            <fieldset className='flex flex-col lg:w-[30%] w-full px-6 text-white'>
                <label className='text-gray-300'>Email</label>
                <input className='py-3 px-5 rounded-lg outline-none  bg-black/60' type="email" />
            </fieldset>

            <fieldset className='flex flex-col lg:w-[30%] px-6 w-full text-white'>
                <label className='text-gray-300'>Password</label>
                <span className='flex items-center bg-black/60 rounded-lg'>
                  <input className='py-3 bg-transparent px-5 outline-none w-[80%]' type={view ? 'text': 'password'} />
                  <div onClick={handleClick} className='text-2xl cursor-pointer'>
                    { view ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </div>
                </span>

            </fieldset>

            <h2 className='text-gray-200'>Already Have an Account? <Link className='' href={'/auth/login'}>Login</Link></h2>
        </form>
    </div>
  )
}

export default page
