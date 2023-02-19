import axios from 'axios';
import { config } from '../configs/config';

const { baseURL } = config;
const axiosService = axios.create({ baseURL, withCredentials: false });
export default axiosService;