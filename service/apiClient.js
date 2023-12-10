import axios, { CanceledError } from 'axios';

export default axios.create({
  baseURL: 'https://neims-backend.onrender.com/api',
})

export { CanceledError };