import axios from 'axios';



axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// This helper file can also be used to create middleware functions. Basically any initialization
// of axios related things should go here. 

export default axios;