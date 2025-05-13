import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:3000/products'});
export default API;