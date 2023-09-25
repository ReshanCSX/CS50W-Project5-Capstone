import TextField from "../TextField"
import Button from "../Button"
import { useState } from "react"
import { API } from "../../api"
import { useNavigate, useLocation, Navigate, useLoaderData, Link } from 'react-router-dom'
import { getParams } from "../util"

export default function Login(){

    const data = useLoaderData()

    if (!!data) {
      return <Navigate to='/' />
    }

    const [credentials, setCredentials] = useState({username:"", password:""})
    const [credentialsErrors, setCredentialsErrors] = useState("")
    
    const pageParam = getParams(useLocation(), 'next')
    const navigate = useNavigate()

    const handleChange = (event) => {
        const {name, value} = event.target
        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setCredentialsErrors("")
        const data = {
            username : credentials.username,
            password : credentials.password
        }

        try{
            const response = await API.post('/token', data)

            console.log(response.data)

            localStorage.setItem('authTokens', JSON.stringify(response.data))

            console.log(localStorage.getItem('authTokens'))

            if(pageParam){
                navigate('/' + pageParam)
            }else{
                navigate('/')
            }
            
        }
        catch(errors){
            const errorData = errors.response

            if(errorData.status === 401){
                setCredentialsErrors("The email address or password you entered is incorrect.")
            } else{
                console.log(errorData)
            }
            
            
        }
    }

    return(
        <section className="flex p-10 items-center justify-center h-full">
            <div className="w-full sm:max-w-md shadow-md border-2 p-10 rounded-md">
                <form onSubmit={handleSubmit} className="mb-6">
                    <fieldset>
                        <div className="mb-6">
                            <h1 className="text-green-600 text-center text-2xl font-extrabold mb-3">Sign in to Seeker</h1>
                            <h2 className="text-center text-sm text-gray-500">Connect with your favorite restaurants and reviewers.</h2>
                        </div>
                        { credentialsErrors && <div className="text-sm text-red-800 bg-red-100 p-3 my-3 rounded">{credentialsErrors}</div>}
                        
                        <TextField
                            name="username"
                            label="Username"
                            required={true}
                            handleChange={handleChange}
                            value={credentials}
                        />

                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            required={true}
                            handleChange={handleChange}
                            value={credentials}
                        />


                        <Button name="Sign in"/>


                    </fieldset>
                </form>
                <hr className="my-4"/>
                <p className="text-sm text-gray-600 text-center">
                    New to Seeker?
                    <Link to="/register" className="underline underline-offset-4 pl-2 text-green-600 hover:text-green-800">Sign Up</Link>
                </p>
            </div>
        </section>
    )
}