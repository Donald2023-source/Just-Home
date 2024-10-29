'use client'
import Image from 'next/image'
import React, { FormEvent, useState } from 'react'
import logo from '@/Assets/logo-white.svg.png'
import { usePropertyStore } from '../store/addProperty';
import { ToastOptions, toast } from 'react-toastify';

const AddProperty = ({ close }: any) => {
  const [formData, setFormData] = useState({
    propertyName: '',
    location: '',
    propertyType: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    description: '',
  });

  const toastOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  };
  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: FormEvent) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      const selectedFiles = Array.from(files).slice(0, 10); // Limit to 10 images
      if (selectedFiles.length < 5) {
        alert("Please select at least 5 images.");
        return;
      }
      setImages(selectedFiles);
    }
  };

  const { addProperty, uploading, error, isLoading } = usePropertyStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { propertyName, location, propertyType, price, bedrooms, bathrooms, squareFeet, description } = formData;

    if (images.length < 5) {
      toast.error('Must be at least 5 images', toastOptions);
      return;
    }

    await addProperty(
      { propertyName, location, propertyType, price, bedrooms, bathrooms, squareFeet, description }, images,
    
    );

    if (!error) close();
  };

  return (
    <div className="w-full text-gray-200 relative">
      <div className="w-full">
        <form className="max-w-lg w-full shadow-2xl shadow-slate-800 rounded-2xl mx-auto py-3 px-10 flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
          <Image src={logo} alt="Logo" />
          <h4>Please enter the property details below</h4>

          {/* Property Name */}
          <fieldset className="w-full flex flex-col">
            <label className="text-gray-300">Property Name</label>
            <input
              required
              name="propertyName"
              value={formData.propertyName}
              onChange={handleInputChange}
              className="py-1 px-4 border-b rounded-lg outline-none bg-black/60 w-full"
              type="text"
              placeholder="e.g., Luxury Apartment"
            />
          </fieldset>

          {/* Location */}
          <fieldset className="w-full flex flex-col">
            <label className="text-gray-300">Location</label>
            <input
              required
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="py-1 px-4 border-b rounded-lg outline-none bg-black/60 w-full"
              type="text"
              placeholder="City, State"
            />
          </fieldset>

          {/* Property Type & Price */}
          <div className="w-full flex gap-4">
            <select
              required
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className="py-1 px-4 border-b text-gray-400 rounded-lg outline-none bg-black/60 w-full"
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Land">Land</option>
            </select>
            <input
              required
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="py-1 px-4 border-b rounded-lg outline-none bg-black/60 w-full"
              type="number"
              placeholder="Price ($)"
            />
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="w-full flex gap-4">
            <input
              required
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className="py-1 px-4 border-b rounded-lg outline-none bg-black/60 w-full"
              type="number"
              placeholder="Bedrooms"
            />
            <input
              required
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className="py-2 px-4 border-b rounded-lg outline-none bg-black/60 w-full"
              type="number"
              placeholder="Bathrooms"
            />
          </div>

          {/* Square Feet */}
          <fieldset className="w-full flex flex-col">
            <label className="text-gray-300">Square Feet</label>
            <input
              required
              name="squareFeet"
              value={formData.squareFeet}
              onChange={handleInputChange}
              className="py-1 px-4 border-b rounded-lg outline-none bg-black/60 w-full"
              type="number"
              placeholder="Square Feet"
            />
          </fieldset>

          {/* Description */}
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide a detailed description"
            className="bg-black/60 p-4 outline-none rounded-lg w-full text-gray-200"
          />

          {/* Image Upload */}
          <fieldset className="w-full flex flex-col">
            <label htmlFor='file' className="text-gray-300 bg-primary rounded-lg p-1">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              id='file'
              onChange={handleImageChange}
              className="py-2 hidden px-4 border-b rounded-lg outline-none bg-black/60 w-full"
            />
            <div className="flex gap-2 mt-2">
              {images.map((image, index) => (
                <div key={index} className="relative w-20 h-20">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </fieldset>

          {/* Submit Button */}
          <button type="submit" className="py-2 px-5 bg-primary rounded-lg">{isLoading ? 'uploading' : 'submit'}</button>
        </form>

        <h4
          onClick={() => close()}
          className="absolute text-white top-16 font-bold text-2xl cursor-pointer right-10"
        >
          X
        </h4>
      </div>
    </div>
  );
};

export default AddProperty;
