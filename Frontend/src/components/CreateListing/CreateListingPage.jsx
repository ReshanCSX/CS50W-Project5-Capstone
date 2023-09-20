import { useState } from "react"
import TextField from "./TextField"
import axios from "axios"

export default function CreateListing(){

    const URL = "https://api.seeker.com:8000"
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


        const headers = {
            'Content-Type': 'application/json',
        }

        try{
            
            const response = await axios.post(`${URL}/createlisting`, data, {headers})
            if(response.AxiosError){
                console.log(response.data)
            }
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
        <section className="px-5 py-10 md:px-20 lg:max-w-xl">
            <div>
                <h1 className="text-green-600 text-4xl font-extrabold mb-6">Add a place to Seeker.</h1>
            </div>

            <div>

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
                    
                    <div className="mt-8">
                        <button
                            className="w-full sm:w-1/3 rounded-full py-2.5 font-bold bg-green-600 hover:bg-green-700 text-white">Create</button>
                    </div>
                </form>

            </div>

        </section>
    )
}