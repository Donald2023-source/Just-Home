import { create } from 'zustand';
import { auth } from '@/firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

type AuthState = {
    user: any;
    isAuthenticated: boolean;
    signup: (email: string, password: string, displayName: string) => Promise <void>
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise <void>;
};

export const useAuthStore = create<AuthState>((set) => {
    //Listen for auth CHnages
    onAuthStateChanged(auth, (firebaseUser) => {
        if(firebaseUser) {
            set({ user: firebaseUser, isAuthenticated: true});
        } else {
            set({ user: null, isAuthenticated: false})
        }
    });

    return {
        user: null, 
        isAuthenticated: false,

        signup: async (email, password, displayName) => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName });
                set({ user: userCredential.user, isAuthenticated: true})
            } catch (error) {
                console.error('Sign Up Failed', error);
            }
        },

        login: async (email, password) => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                set({ user: userCredential.user, isAuthenticated: false})
            } catch (error) {
                console.error('login Failed:', error)
            }
        },

        logout: async () => {
            try {
                await signOut(auth);
                set({ user: null, isAuthenticated: false})
            } catch (error) {
                console.error('Logout failed', error)
            }
        },
    };
});