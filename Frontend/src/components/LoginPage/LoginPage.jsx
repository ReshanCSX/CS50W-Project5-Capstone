import TextField from "../TextField"
import Button from "../Button"
import { useState } from "react"
import { API } from "../../api"
import { useNavigate } from 'react-router-dom'

export default function Login(){

    const [credentials, setCredentials] = useState({username:"", password:""})
    const [credentialsErrors, setCredentialsErrors] = useState({username:"", password:""})
    const navigate = useNavigate()

    const handleChange = (event) => {
        const {name, value} = event.target
        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const data = {
            username : credentials.username,
            password : credentials.password
        }

        try{
            const response = await API.post('/token', data)

            console.log(response.data)

            localStorage.setItem('authTokens', JSON.stringify(response.data))
            localStorage.setItem('userID', response.data.id)

            console.log(localStorage.getItem('authTokens'))
            setTimeout(navigate('/create'), 500)
        }
        catch(errors){
            const errorData = errors
            console.log(errorData)
        }
    }

    return(
        <section>
            <form onSubmit={handleSubmit}>
                <fieldset>

                    <TextField
                        name="username"
                        label="Username"
                        required={true}
                        handleChange={handleChange}
                        errors = {credentialsErrors}
                        value={credentials}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        required={true}
                        handleChange={handleChange}
                        errors = {credentialsErrors}
                        value={credentials}
                    />

                    <Button name="Login"/>

                </fieldset>
            </form>
        </section>
    )
}