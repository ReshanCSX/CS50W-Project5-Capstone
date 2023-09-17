import { useState } from "react"
import TextField from "./TextField"
import axios from "axios"

export default function CreateListing(){

    const URL = "http://127.0.0.1:8000"

    const [formData, setFormData] = useState({
        name : '',
        city : '',
        country : '',
        telephone : '',
        email : '',
        website : '',
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const response = await axios.post(`${URL}/createlisting`, {

                headers: {
                  'Content-Type': 'application/json',
                },

                data: {
                  name: formData.name,
                  city: formData.city,
                  country: formData.country,
                  telephone: formData.telephone,
                  email: formData.email,
                  website: formData.website,
                },
            });

        console.log('Response data:', response.data);
        
        }
        catch(error){
            console.log(error)
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
                                handleChange={handleChange}
                                value={formData}
                            />
                        
                            <TextField
                                name="country"
                                label="Country"
                                required={true}
                                handleChange={handleChange}
                                value={formData}
                            />
                            </div>
                        </div>

                        <hr className="my-8"/>

                        <div>
                            <h1 className="text-xl my-4 font-bold text-gray-700">Contact Infomation</h1>
                            <TextField
                                name="telephone"
                                label="Telephone"
                                type="number"
                                handleChange={handleChange}
                                value={formData}
                            />

                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                handleChange={handleChange}
                                value={formData}
                            />

                            <TextField
                                name="website"
                                label="Web Site"
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