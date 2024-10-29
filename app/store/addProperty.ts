import { create } from 'zustand';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '@/firebaseConfig';

const db = getFirestore(app);
const storage = getStorage(app);

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
    isLoading: boolean;
    error: string | null;
    addProperty: (property: Omit<Property, 'images'>, images: File[]) => Promise<void>;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
    uploading: false,
    isLoading: false,
    error: null,

    addProperty: async (propertyData, images) => {
        set({ uploading: true, isLoading: true, error: null });

        try {
            // Upload images to Firebase Storage
            const imageUrls = await Promise.all(
                images.map(async (image) => {
                    const imageRef = ref(storage, `properties/${Date.now()} - ${image.name}`);
                    await uploadBytes(imageRef, image);
                    return await getDownloadURL(imageRef);
                })
            );

            // Save property data to Firestore
            const propertyWithImages = { ...propertyData, images: imageUrls };
            await addDoc(collection(db, 'properties'), propertyWithImages);

            set({ uploading: false, isLoading: false });
            alert('Property uploaded successfully');
        } catch (error) {
            set({ uploading: false, isLoading: false, error: 'Failed to upload property' });
            console.error('Error uploading property', error);
            alert('Failed to upload property');
        }
    }
}));
