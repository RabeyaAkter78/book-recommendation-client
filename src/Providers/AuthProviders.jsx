import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { app } from '../firebase.config';

export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
    const auth = getAuth(app)


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }



    const updateUserData = (name, photoUrl) => {
        // setLoading(true)
        console.log(name, photoUrl)

        const updatedUser = { ...user }
        updatedUser.displayName = name;
        updatedUser.photoURL = photoUrl;

        setUser(updatedUser);
        const auth = getAuth();
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl
        })
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log('logged user inside auth state observer', loggedUser);
            setUser(currentUser);
            setLoading(false);

        })
        return () => {

            return unsubscribe();
        }

    }, [])

    const AUthInfo = {
        user,
        createUser,
        signInUser,
        logout,
        loading,
        updateUserData

    }


    return (
        <AuthContext.Provider value={AUthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;