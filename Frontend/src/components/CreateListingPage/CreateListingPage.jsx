import { useState } from "react"
import { useLoaderData, Navigate } from 'react-router-dom'
import TextField from "../TextField"
import Button from "../Button"
import { API } from "../../api"
import updateAuthToken from "../../auth/updateAuthStatus"

export default function CreateListing(){

    // Check if the user authenticated
    const data = useLoaderData()

    if (!data) {
      return <Navigate to='/login?next=create' />
    } else {
        updateAuthToken()
    }
    

    const INITIAL_STATE = {
        name : '',
        cuisine: '',
        city : '',
        country : '',
        phone_number : '',
        email : '',
        website : '',
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    const [formErrorData, setFormErrorData ] = useState(INITIAL_STATE)

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            'name': formData.name,
            'cuisine': formData.cuisine,
            'city': formData.city,
            'country': formData.country,
            'phone_number': formData.phone_number,
            'email': formData.email,
            'website': formData.website,
        }

        try{

            const response = await API.post('/createlisting', data,)

            console.log('Response data:', response.data)
            
            setFormErrorData(INITIAL_STATE)
            setFormData(INITIAL_STATE)
        
        }
        catch(errors){
            const errorData = errors.response.data
            const newFormErrors = INITIAL_STATE

            for (const [key, value] of Object.entries(errorData)) {
                if (key in newFormErrors){
                    newFormErrors[key] = value
                } 
            }

            setFormErrorData(newFormErrors)
        }
    }
    
    return(
        <section className="px-5 py-10 flex justify-center">
            <div>

                <div className="">
                    <h1 className="text-green-600 text-center text-4xl font-extrabold mb-6">Add a place to Seeker.</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div>
                            <h1 className="text-xl my-4 font-bold text-gray-700">Name and Description</h1>
                            <TextField
                                name="name"
                                label="Resturent Name"
                                required={true}
                                handleChange={handleChange}
                                errors = {formErrorData}
                                value={formData}
                            />

                            <TextField
                                name="cuisine"
                                label="Cuisine"
                                required={true}
                                errors = {formErrorData}
                                handleChange={handleChange}
                                value={formData}
                            />
                        </div>

                        <hr className="my-8"/>

                        <div>
                            <h1 className="text-xl my-4 font-bold text-gray-700">Location</h1>
                            <div className="md:grid md:grid-cols-2 md:gap-3">
                                <TextField
                                    name="city"
                                    label="City"
                                    required={true}
                                    errors = {formErrorData}
                                    handleChange={handleChange}
                                    value={formData}
                                />
                            
                                <TextField
                                    name="country"
                                    label="Country"
                                    required={true}
                                    errors = {formErrorData}
                                    handleChange={handleChange}
                                    value={formData}
                                />
                            </div>
                        </div>

                        <hr className="my-8"/>

                        <div>
                            <h1 className="text-xl my-4 font-bold text-gray-700">Contact Infomation</h1>
                            <TextField
                                name="phone_number"
                                label="Telephone"
                                type="number"
                                errors = {formErrorData}
                                handleChange={handleChange}
                                value={formData}
                            />

                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                errors = {formErrorData}
                                handleChange={handleChange}
                                value={formData}
                            />

                            <TextField
                                name="website"
                                label="Web Site"
                                errors = {formErrorData}
                                handleChange={handleChange}
                                value={formData}
                            />
                        </div>                        

                    </fieldset>
                    
                    <Button name="Create"/>
                </form>

            </div>

        </section>
    )
}