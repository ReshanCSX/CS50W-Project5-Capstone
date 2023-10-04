const getAuthToken = () => {
    const authTokenString = localStorage.getItem('authTokens')
    const authToken = authTokenString ? JSON.parse(authTokenString) : null
    
    return authToken
}

export default getAuthToken