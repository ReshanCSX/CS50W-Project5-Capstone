import { useState } from "react"
import { useNavigate, Link, Navigate, useLoaderData } from "react-router-dom"

import TextField from "../TextField"
import { API } from "../../api"
import Button from "../Button"

export default function Register(){

    const data = useLoaderData()

    if (!!data) {
      return <Navigate to='/' />
    }

    const navigate = useNavigate()

    const INITIAL_STATE = {username:"",email:"", password:"", password2:""}
    const[credentials, setCredentials] = useState(INITIAL_STATE)
    const[credentialsErrors, setCredentialsErrors] = useState(INITIAL_STATE)

    const handleChange = (event) => {
        const {name, value} = event.target
        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            username : credentials.username,
            email : credentials.email,
            password : credentials.password,
            password2 : credentials.password2
        }

        try{
            const response = await API.post('/register', data)
            localStorage.setItem('authTokens', JSON.stringify(response.data.token))
            setCredentialsErrors(INITIAL_STATE)
            setCredentials(INITIAL_STATE)
            navigate("/")

        } catch(error){
            const errorData = error.response.data
            const newFormErrorData = INITIAL_STATE
            for(const [key, value] of Object.entries(errorData)){
                newFormErrorData[key] = value
            }

            console.log(newFormErrorData)
            setCredentialsErrors(newFormErrorData)
        }
    }

    return (
        <section className="flex p-10 items-center justify-center h-full">
            <div className="w-full sm:max-w-md shadow-md border-2 p-10 rounded-md">
                <form onSubmit={handleSubmit} className="mb-6">
                    <fieldset>
                        <div className="mb-6">
                            <h1 className="text-green-600 text-center text-2xl font-extrabold mb-3">Sign in to Seeker</h1>
                            <h2 className="text-center text-sm text-gray-500">Connect with your favorite restaurants and reviewers.</h2>
                        </div>
                        <TextField
                            name="username"
                            label="Username"
                            required={true}
                            handleChange={handleChange}
                            value={credentials}
                            errors={credentialsErrors}
                        />

                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            required={true}
                            handleChange={handleChange}
                            value={credentials}
                            errors={credentialsErrors}
                        />

                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            required={true}
                            handleChange={handleChange}
                            value={credentials}
                            errors={credentialsErrors}
                        />

                        <TextField
                            name="password2"
                            label="Confirm Password"
                            type="password"
                            required={true}
                            handleChange={handleChange}
                            value={credentials}
                            errors={credentialsErrors}
                        />

                        <Button name="Register" />

                    </fieldset>
                </form>
                <hr className="my-4"/>
                <p className="text-sm text-gray-600 text-center">
                    Already have an account?
                    <Link to="/login" className="underline underline-offset-4 pl-2 text-green-600 hover:text-green-800">Sign in</Link>
                </p>
            </div>
        </section>
    )
}