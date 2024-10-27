'use client'
import React, { useState } from 'react'
import img1 from '../../Assets/pexels-alex-staudinger-829197-1732414.jpg'
import img2 from '../../Assets/pexels-binyaminmellish-106399.jpg'
import img3 from '../../Assets/pexels-curtis-adams-1694007-3288102.jpg'
import img4 from '../../Assets/pexels-curtis-adams-1694007-3288103.jpg'
import logo from '../../Assets/logo-white.svg.png'
import Link from 'next/link'
import Image from 'next/image'
import { BiMenuAltRight } from "react-icons/bi";
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const Navbar = () => {
    const navLinks = [
        { name: 'Home', href: '/home' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];


    return (
        <div className='absolute lg:top-5 left-0 right-0 z-30 lg:py-1 py-8'>
            <header className='flex justify-between lg:px-8 px-5 items-center'>
                <Link href={'/'}><Image src={logo} alt='logo' /></Link>

                <button className='p-2 bg-black/30 border lg:block text-gray-200'>Get Started</button>
                
              

                {/* <BiMenuAltRight onClick={() => setNav(!nav)} className='text-3xl cursor-pointer text-white lg:hidden' /> */}
            </header>
        </div>
    );
}

export default Navbar;
