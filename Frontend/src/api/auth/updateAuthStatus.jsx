import { useEffect, useState } from "react"
import { API } from ".."


const getAuthToken = () => {
    const authTokenString = localStorage.getItem('authTokens')
    const authToken = authTokenString ? JSON.parse(authTokenString) : null
    
    return authToken
}


export default function updateAuthToken(){

    const [authToken, setAuthToken] = useState(getAuthToken())

    const updateToken = async () => {
        try{
            const response = await API.post('token/refresh/', {
                "refresh": authToken.refresh
            })

            if (response.status === 200){

                const newTokens = JSON.stringify(response.data)
                localStorage.setItem('authTokens', newTokens);
                setAuthToken(JSON.parse(newTokens))

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
                setAuthToken(getAuthToken())
                updateToken()
            }
        }, timeInterval)

        return () => clearInterval(interval)
    },[4000])
}