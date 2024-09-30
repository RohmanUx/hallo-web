import axios from 'axios';
const apiCall = axios.create({
  baseURL: 'https//localhost:8000',
});

export default apiCall;
