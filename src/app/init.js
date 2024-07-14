import axios from "axios";

const initializeApp = () => {

    // Setting base URL for all API request via axios
    axios.defaults.baseURL =" http://139.144.1.59:8080/"


    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code



    } else {
        // Prod build code



        // Removing console.log from prod
        console.log = () => { };


        // init analytics here
    }

}

export default initializeApp