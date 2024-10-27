import Image from 'next/image'
import React from 'react'
import { TfiLocationPin } from "react-icons/tfi";
import { PiBedBold } from "react-icons/pi";
import { LuBath, LuClock } from "react-icons/lu";
const Card = ({ badge, img, name, location, baths, rooms, price, time} : any) => {
  return (
    <div>
        <div className='max-w-[300px] bg-white shadow-lg rounded-xl hover:scale-105 transition duration-200 cursor-pointer relative p-2 h-[300px]'>
            <Image className='rounded-xl' src={img} alt='image' />
            <span className='absolute inset-3 text-xs font-semibold rounded-lg bg-green-800/75 backdrop-blur-md text-gray-200 h-fit w-fit p-2'>{badge}</span>

            <div>
                <div>
                    <div className='ml-2 py-2'>
                        <h4 >{name}</h4>
                    </div>
                 </div>
                 <div className='flex justify-between p-3'>
                        <p>N {price}</p>
                        
                        <span className='flex items-center gap-2'>
                            <PiBedBold />
                            <p>{rooms} Beds</p>
                        </span>

                        <span className='flex items-center gap-2'>
                            <LuBath />
                            <p>{baths} Baths</p>
                        </span>
                 </div>
               
            </div>
        </div>
    </div>
  )
}

export default Card
