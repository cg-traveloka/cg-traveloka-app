import axios from "axios"

// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: 'http://localhost:8080',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});
export default instance;

