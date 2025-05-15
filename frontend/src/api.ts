import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
// const API = axios.create({ baseURL: 'http://localhost:3000/products'});
// const API = axios.create({ baseURL: import.meta.env.VITE_API_URL});
const API = axios.create({ baseURL});
export default API;