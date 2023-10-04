import { useEffect, useState } from "react"
import { API } from "../api"
import getAuthToken from "./getAuthToken"


export default function useUpdateAuthToken(){

    const [authToken, setAuthToken] = useState(getAuthToken())

    const updateToken = async () => {
        try{

            const currentAuthToken = getAuthToken()
            
            const response = await API.post('token/refresh/', {
                "refresh": currentAuthToken.refresh
            })


            if (response.status === 200){

                const newTokens = JSON.stringify(response.data)
                localStorage.setItem('authTokens', newTokens)
                setAuthToken(newTokens)

            } else {
                console.log('Failed to refresh tokens. Response status:', response.status);
            }
            
        }
        catch(error){
            console.log(error)
        }
    }
    
    
    // Update authToken every 4 minutes.
    // Ensures that the auth token is always up-to-date.
    useEffect(() => {

        const timeInterval = 1000 * 60 * 4
        
        let interval = setInterval(() => {
            if(authToken){
                updateToken()
            }
        }, timeInterval)

        return () => clearInterval(interval)
    },[authToken])

    return { updateToken }
}