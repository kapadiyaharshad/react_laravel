import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.withCredentials = true;
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
