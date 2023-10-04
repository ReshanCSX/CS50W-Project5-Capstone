import { useEffect, useState } from "react"
import { API } from "../api"
import getAuthToken from "./getAuthToken"

export const useAuthStatus = async () => {

        // const authToken = getAuthToken()

        // try{

        //     // Check token excists
        //     if(!authToken || !authToken.refresh){
        //         setIsAuthenticated(false)
        //     }

        //     // Check validity
        //     const response = await API.post('token/refresh/', {
        //         "refresh": authToken.refresh,
        //     })

        //     if(response.status === 200){
        //         const newToken = JSON.stringify(response.data)
        //         localStorage.setItem('authTokens', newToken)
        //         setIsAuthenticated(true)
        //     } else{
        //         console.log('Authentication failed. Status code:', response.status)
        //         setIsAuthenticated(false)
        //     }

        // } catch(error){
        //     console.log(error)
        // }


        // if(isAuthenticated){
        //     useEffect(() => {

        //         const timeInterval = 1000 * 60 * 4

        //         let interval = setInterval(() => {
        //             checkAuth()
        //         }, timeInterval)

        //         return () => clearInterval(interval)

        //     },[])
        // }


        // return isAuthenticated

    

    const authToken = getAuthToken()

    try{
        // Check auth Token exsists
        if(!authToken || !authToken.refresh){
            return false
        }

        // Checking the validity of authToken
        const response = await API.post('token/refresh/', {
            "refresh": authToken.refresh,
        })

        if(response.status === 200){
            const newToken = JSON.stringify(response.data)
            localStorage.setItem('authTokens', newToken)
            return true
            
        } else{
            console.log('Authentication failed. Status code:', response.status)
            return false
        }
    
    } catch(error){
        console.log(error)
        return false
    }
    
}






    // export const useAuthStatus = async () => {

    //     const authTokenString = localStorage.getItem('authTokens')
    //     const authToken = authTokenString ? JSON.parse(authTokenString) : null
    //     const [isAuthenticated , setIsAuthenticated] = useState(false)

    //     useEffect( () => {


    //         const checkAuthentication = async () => {

    //             if(!authToken || !authToken.refresh){
    //                 setIsAuthenticated(false)
    //                 return
    //             }

    //             try{

    //                 const response = await API.post('token/refresh/', {
    //                     "refresh": authToken.refresh,
    //                 })

    //                 if(response.status === 200){
    //                     const newToken = JSON.stringify(response.data)
    //                     localStorage.setItem('authTokens', newToken)
    //                     setIsAuthenticated(true)

    //                 } else{
    //                     console.log('Authentication failed. Status code:', response.status)
    //                     setIsAuthenticated(false)
    //                 }

    //             } catch(error){
    //                 console.log(error)
    //                 setIsAuthenticated(false)
    //             }
    //         }

    //         checkAuthentication()

    //     },[])
        

    //     return false
    // }