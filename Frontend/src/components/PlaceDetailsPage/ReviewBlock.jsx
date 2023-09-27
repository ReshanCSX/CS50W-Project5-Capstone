import { generateStars } from "../util"



const Review = () => {
    return(
        <div className="text-gray-600">

            <div className="my-4 flex items-center">
                <p className="font-bold">Reshan Chathuranga</p>
                
            </div>

            <div className="flex my-4">
                    <span className="flex mr-4 text-green-600">{generateStars(3.3)}</span>
                    <p className="text-xs font-bold">Reviewed April 15, 2022</p>
            </div>

            <div>
                <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit scelerisque mauris pellentesque pulvinar pellentesque. In hac habitasse platea dictumst quisque sagittis purus sit. Urna porttitor rhoncus dolor purus non enim praesent elementum facilisis. Faucibus a pellentesque sit amet. Malesuada pellentesque elit eget gravida cum sociis natoque.    </p>
            </div>

            <hr className="my-6" />

        </div>
    )
}

export default Review