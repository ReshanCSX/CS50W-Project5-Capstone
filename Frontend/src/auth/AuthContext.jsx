import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStatus } from './useAuthToken';

export const AuthContext = createContext()
export const AuthProvider = AuthContext.Provider


export function useProviderAuth(){

    const isAuthed = async() => {
        const response = await useAuthStatus()
        return response
    }

    return { isAuthed }
}

export const useAuth = () => {

    const auth = useContext(AuthContext)
    return auth
}



