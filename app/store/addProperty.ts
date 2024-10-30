import { create } from 'zustand';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '@/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const db = getFirestore(app);
const storage = getStorage(app);

interface Property {
    id?: string;
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
    properties: Property[]; // Store for all properties
    uploading: boolean;
    fetching: boolean;
    error: string | null;
    addProperty: (property: Omit<Property, 'images'>, images: File[]) => Promise<void>;
    fetchProperties: () => Promise<void>;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
    properties: [],
    uploading: false,
    fetching: false,
    error: null,

    addProperty: async (propertyData, images) => {
        set({ uploading: true, error: null });

        try {
            const uniqueId = uuidv4();
            const folderName = `${propertyData.propertyName}-${uniqueId}`;

            const imageUrls = await Promise.all(
                images.map(async (image) => {
                    const imageRef = ref(storage, `properties/${folderName}/${image.name}`);
                    await uploadBytes(imageRef, image);
                    return await getDownloadURL(imageRef);
                })
            );

            const propertyWithImages = { ...propertyData, images: imageUrls };
            const docRef = await addDoc(collection(db, 'properties'), propertyWithImages);

            // Fetch document data after upload
            const uploadedPropertyDoc = await getDoc(docRef);
            if (uploadedPropertyDoc.exists()) {
                set((state) => ({
                    properties: [...state.properties, { id: docRef.id, ...uploadedPropertyDoc.data() } as Property],
                    uploading: false,
                }));
                alert('Property uploaded successfully');
            } else {
                set({ uploading: false, error: 'Property upload failed: Document not found' });
                alert('Failed to upload property');
            }
        } catch (error) {
            set({ uploading: false, error: 'Failed to upload property' });
            alert('Failed to upload property');
            console.error('Error uploading property:', error);
        }
    },
    fetchProperties: async () => {
        set({ fetching: true, error: null });
        try {
            const querySnapshot = await getDocs(collection(db, 'properties'));
            const fetchedProperties = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Property[];
    
            set({ properties: fetchedProperties, fetching: false });
        } catch (error) {
            console.error('Error fetching properties:', error);
            set({ fetching: false, error: 'Failed to fetch properties' });
        }
    }
    
}));
