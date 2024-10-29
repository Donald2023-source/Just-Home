import { create } from 'zustand'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from '@/firebaseConfig'

const db = getFirestore(app);
const storage = getStorage(app)

interface Property {
    propertyName: string;
    location: string;
    propertyType: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    squareFeet: string;
    description: string;
    images: string[];
}

interface PropertyStore {
    uploading: boolean;
    error: string | null;
    addProperty: (property: Omit<Property, 'images'>, images: File[]) => Promise<void>;

}

export const usePropertyStore = create<PropertyStore>((set) => ({
    uploading: false, 
    error: null,

    addProperty: async (propertyData, images) => {
        set({ uploading: true, error: null});

        try {
            //uploading images to firebase storage;

            const imageURls = await Promise.all(
                images.map(async (image) => {
                    const imageRef = ref(storage, `properties/${Date.now()} - ${image.name}`);
                    await uploadBytes(imageRef, image);
                    return await getDownloadURL(imageRef)
                })
            );

            //save property data to firestore
            const propertyWithImages = { ...propertyData, images: imageURls};
            await addDoc(collection(db, 'properties'), propertyWithImages);

            set({ uploading: false});
            alert('Property uploaded successfully');
        } catch(error) {
            set( { uploading: false});
            console.error('Error uploading property', error);
            alert('Failed to upload property')
        }
    }
}))