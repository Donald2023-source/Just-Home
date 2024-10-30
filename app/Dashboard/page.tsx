'use client'
import React, { useEffect, useState } from 'react';
import { IoIosNotifications } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import img1 from '@/Assets/pexels-binyaminmellish-106399.jpg';
import Image from 'next/image';
import Chart from '../components/Chart';
import AddProperty from '../components/AddProperty';
import { useAuthStore } from '../store/authStore';
import { usePropertyStore } from '../store/addProperty';

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleClose = () => {
    setIsVisible(false);
  }

  const { properties, fetchProperties } = usePropertyStore();

  useEffect(() => {
    fetchProperties();  // Ensure fetchProperties is called correctly
  }, [fetchProperties]);
  
  useEffect(() => {
    console.log('uploaded', properties);
  }, [properties]);

  const { user } = useAuthStore();
  console.log('user', user);

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className='lg:max-w-7xl max-w-min p-2'>
      <div className='flex justify-between items-center px-3'>
        <h2>Dashboard</h2>
        <div className='flex items-center gap-8'>
          <IoIosNotifications className='text-2xl text-primary cursor-pointer' />
          <span className='flex items-center gap-3'>
            <h2 className='text-gray-300'>{user.name}!</h2>
          </span>
        </div>
      </div>

      <hr className='my-3 mx-64' />

      <main className='mt-5'>
        <div className='w-full grid grid-cols-3 gap-4'>
          <div className='col-span-2 w-full'>
            <span className='flex justify-between items-center'>
              <h2 className='font-bold text-gray-300'>My Market</h2>
              <FaPlus onClick={() => setIsVisible(true)} className='cursor-pointer' />
            </span>
            <div className='h-[240px] relative hover:scale-95 transition duration-300 cursor-pointer'> 
              <Image className='rounded-lg' src={img1} alt='' layout='fill' objectFit='cover'/>
              <div className='absolute bg-black/50 inset-0 w-full rounded-lg'/>
              <div className='absolute text-gray-200 px-2 flex flex-col items-left top-[55%]'>
                <h3 className='font-bold text-lg'>Luxury Apartment</h3>
                <h4 className='flex items-center'><CiLocationOn className='text-lg'/>Jos, Plateau State, Nigeria</h4>
                <h4>(24 bidders)</h4>
              </div>
            </div> 
          </div>

          <div className='col-span-1 w-full shadow-lg rounded-lg p-3'>
            <h2 className='font-bold text-gray-300'>Total Sales</h2>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Image className='h-12 w-12 object-cover rounded-full' src={img1} alt='' />
                <span>
                  <h4 className='text-sm'>Luxury Apartment</h4>
                  <p className='text-xs text-gray-400'>Jos, Plateau state, Nigeria....</p>
                </span>
              </div>
              <h4>N 2,000,000</h4>
            </div>
          </div>

          <div className='col-span-3 grid grid-cols-3 py-10 gap-4'>
            <div className='col-span-2'>
              <Chart />
            </div>
            <div className='col-span-1 w-full shadow-lg rounded-lg p-3'>
              <h2 className='font-bold text-gray-300'>Recently Viewed</h2>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Image className='h-12 w-12 object-cover rounded-full' src={img1} alt='' />
                  <span>
                    <h4 className='text-sm'>Name.....</h4>
                    <p className='text-xs text-gray-400'>location....</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Rendering of AddProperty */}
        {isVisible && (
          <div className='inset-0 w-full mx-auto h-full fixed flex bg-black/90 backdrop-blur-md items-center justify-center'>
            <AddProperty close={handleClose} />
          </div>
        )}

        {/* Display Uploaded Properties */}
        {properties && properties.length > 0 ? (
          <div className='mt-5'>
            <h2 className='font-bold text-gray-300'>Uploaded Properties</h2>
            {properties.map((property) => (
              <div key={property.id} className='shadow-lg rounded-lg p-3'>
                <h3 className='text-lg'>{property.propertyName}</h3>
                <p className='text-sm text-gray-400'>{property.location}</p>
                <p className='text-sm text-gray-600'>Price: {property.price}</p>
                <div className='flex gap-2 mt-2'>
                  {property.images.map((image, index) => (
                    <Image key={index} src={image} alt={`Uploaded property image ${index + 1}`} width={100} height={100} className='rounded-lg'/>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ): <div>No prpp   </div>}
      </main>
    </div>
  );
}

export default Page;
