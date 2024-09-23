import axios from 'axios';


const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string, 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

export default Api;
