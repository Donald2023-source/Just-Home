'use client'
import img1 from '@/Assets/pexels-fotoaibe-1643383.jpg'
import img2 from '@/Assets/pexels-expect-best-79873-323776.jpg'
import img3 from '@/Assets/pexels-curtis-adams-1694007-3288103.jpg'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from './components/Navbar'


const Page = () => {
    const images = [img1, img2, img3];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen relative w-screen overflow-hidden">
          <Navbar/>
            {images.map((img, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentImage === index ? 1 : 0 }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 left-0 w-full h-full"
                >
                    <Image src={img} alt='' layout='fill' objectFit="cover" />
                </motion.div>
            ))}

            <div className="absolute inset-0 w-full h-full bg-black/60" />

            <div className='absolute top-[40%] flex flex-col items-center mx-auto w-full left-0 right-0'>
                <h2 className='text-white text-4xl text-center'>Just Home</h2>
                <p className='text-center text-lg text-white py-3'>Just Home's got you covered</p>
                <div className='flex justify-center gap-10 py-4'>
                    <Link href={'/home'} className='py-3 px-5 text-black bg-[#E7C873] rounded-xl hover:scale-105 transition duration-300'>Read About Us</Link>
                    <Link href={'/auth/signup'} className='py-3 px-5 text-black bg-[#E7C873] rounded-xl hover:scale-105 transition duration-300'>Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Page;
