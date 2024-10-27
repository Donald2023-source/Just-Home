'use client'
import React, { useEffect, useState } from 'react'
import img1 from '../../Assets/pexels-alex-staudinger-829197-1732414.jpg'
import img2 from '../../Assets/pexels-binyaminmellish-106399.jpg'
import img3 from '../../Assets/pexels-curtis-adams-1694007-3288102.jpg'
import img4 from '../../Assets/pexels-curtis-adams-1694007-3288103.jpg'
import icon1 from '../../Assets/Icon.png'
import icon2 from '../../Assets/Icon (1).png'
import icon3 from '../../Assets/Icon (2).png'
import img5 from '@/Assets/h21.jpg.png'
import Image from 'next/image'  
import Card from '../components/Card'
import { motion } from 'framer-motion'
import { LuHome, LuPersonStanding, LuKey } from 'react-icons/lu'
import img6 from '@/Assets/h11.png.png'
import logo from '@/Assets/logo-white.svg.png'
import { FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

const Home = () => {

  const HeroData = [
    { text: 'Welcome Home', img: img1 },
    { text: "Discover a place you'll love to live", img: img2 },
    { text: "We believe in finding what's best for you", img: img3 },
    { text: "Find Your Perfect Home!", img: img4 }
  ];

  const Homes = [ 
    { badge: 'FOR SALE', name: 'Skyper Pool Apartment', img: img1, price: '280, 000', location: 'Rayfield, Jos Plateau State', rooms: '2', baths: '1' },
    { badge: 'RENT', name: 'North Dillard Streets', img: img2, price: '280, 000', location: 'Lamingo, Jos', rooms: '2', baths: '1' },
    { badge: 'RENT', name: 'Penthous Garth', img: img2, price: '10, 000', location: 'Low-cost, Abuja', rooms: '2', baths: '1' },
  ]

  const Why = [
    { icon: icon1, title: 'Wide Range Of Properties', text: 'We Offer export legal help for all related property Items in Dubai'},
    { icon: icon2, title: 'Buy Or Rent Homes', text: 'We sell your home at the best market price and very quickly as well.'},
    { icon: icon3, title: 'Trusted by Thousands', text: 'We offer you free consultancy to get a loan for your new home.'}
  ]

  const HowItWorks = [
    { icon: <LuHome/>, title: 'Find Real Estate', text: 'Find houses with ease at affordable price.' },
    { icon: <LuPersonStanding/>, title: 'Meet Realtor', text: 'Find houses with ease at affordable price.' },
    { icon: <LuKey/>, title: 'Take the keys', text: 'Find houses with ease at affordable price.' }
  ]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HeroData.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div className='w-full h-full relative'> 
        <div className='flex max-h-[80vh] w-full h-full overflow-hidden'>
          {
            HeroData.map((data, index) => (
              <div key={data.text} 
                   style={{ transform: `translateX(-${currentImage * 100}%)` }} 
                   className='min-w-full ease-in-out transition duration-[2000ms] relative'>
                
                <Image className='w-full h-full object-cover' src={data.img} alt='Hero Image' />
                <div className='absolute h-full w-full top-0 left-0 bg-gradient-to-t from-black'/>

                <h2 className='lg:text-[3rem] text-2xl leading-relaxed px-4 absolute top-0 left-0 bottom-0 z-50 right-0 font-semibold text-white/80 h-full flex justify-center items-center lg:w-[50%] mx-auto text-center'>
                  {data.text}
                </h2>
                
              </div>
            ))
          }
        </div>
        
          <div className='bg-[#F6F8FA] w-full h-full p-3'>
            <h2 className='text-center font-semibold text-2xl'>Home For You</h2>
              <motion.div initial={{ x: '-100%'}} animate={{ x: 0 }} transition={{ duration: 1.4}} className=' p-3 flex gap-10 flex-wrap justify-center ' >
                {
                  Homes.map((data, idx) => (
                    <Card key={idx} location={data.location} img={data.img} badge={data.badge} name={data.name} rooms={data.rooms} baths={data.baths} price={data.price} />
                  ))
                }
            </motion.div>
          </div>

          <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 1, delay: 0.4 }}  
          className='w-full p-5'>
              <span className='flex flex-col justify-center items-center gap-3'>
                  <h2 className='font-bold text-2xl'>Why You Should Work With Us</h2> 
                  <p className='text-sm lg:text-left text-center'>You don't have to bother looking for a comfortable Home. Just-home got you covered.</p>
              </span>

                <div className='flex items-center flex-wrap gap-10 py-5 px-10 justify-center'>
                    {
                      Why.map((data) => (
                        <div className='flex flex-col flex-wrap items-center gap-1 lg:w-[40%] text-center' key={data.title}>
                            <Image src={data.icon} alt='Image'/>
                            <h4 className='font-semibold'>{data.title}</h4>
                            <p className='text-xs'>{data.text}</p>
                        </div>
                      ))
                    }
                </div>
          </motion.div>

          <motion.div   
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 1, delay: 0.4 }} 
          className='flex lg:flex-row flex-col items-left p-10 justify-center gap-20'>
              <Image className='lg:h-[28rem] w-full lg:w-[26rem]' src={img5} alt=''/>
              <div>
                  <h2 className='font-bold text-2xl'>How It Works</h2>
                  <div className='flex flex-col gap-10 py-3'>
                      {
                        HowItWorks.map((data) => (
                          <div className='flex items-center gap-3'>
                            <h4 className='text-xl'>{data.icon}</h4>
                            <span>
                                <h2 className='text-lg'>{data.title}</h2>
                                <p className='text-sm'>{data.text}</p>
                            </span>
                          </div>
                        ))
                      }
                  </div>
              </div>
          </motion.div>

          <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 1, delay: 0.4 }} className='bg-[#1F4B43] rounded-2xl mx-auto'>
              <div className='flex items-center justify-between lg:flex-row flex-col lg:p-16 2xl:p-20 py-5 lg:gap-20'>
                  <Image className='w-[50%] h-[10%] ' src={img6} alt=''/> 
                  <div className='text-gray-300 flex flex-col items-center py-3'>
                      <h2 className='font-bold text-xl lg:text-left text-center'>Local Experties For Luxury Home</h2>
                      <p className='text-sm text-center lg:text-lg text-gray-400 md:text-md 2xl:text-lg py-2 leading-relaxed'>Pellentesque egestas elementum egestas faucibus sem. Velit nunc egestas ut
                        morbi. Leo diam diam nibh eget fermentum massa pretium. Mi mauris nulla ac
                        dictum ut mauris non.</p>
                        <button className='py-3 px-5 text-black bg-[#E7C873] rounded-xl hover:scale-105 transition duration-300'>Get Started</button>
                  </div>
              </div>
          </motion.div>
      </div>

      <div className='w-full bg-[#FFF8F6] flex p-12 items-center justify-between my-3'>
          <div className='w-[60%]'>
              <h2 className='text-lg font-semibold'>Become A Real Estate Agent</h2>
              <p className='text-sm leading-relaxed py-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est amet voluptate. Nemo, beatae sunt quod impedit facere nobis corrupti?</p>
          </div>

          <button className='py-3 px-5 text-black bg-[#E7C873] rounded-xl hover:scale-105 transition duration-300'>Sign Up</button>
      </div>

      <div className='bg-[#1F4B43] p-10 flex lg:flex-row flex-col lg:gap-1 gap-10 items-center justify-between'>
        <h2 className='text-white'>Copyright (c).JustHome</h2>
        <Image src={logo} alt=''/>
        <div className='text-white flex text-xl gap-5'>
            <FaFacebook/>
            <FaInstagram/>
            <FaX/>
            <FaTelegram/>
        </div>
    </div>
    </div>
  )
}

export default Home
