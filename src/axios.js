import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-my-shop-bac8d.cloudfunctions.net/api', // API (cloud function) URL
});

export default instance;

// for development & debugging

// http://localhost:5001/my-shop-bac8d/us-central1/api


// for production

// https://us-central1-my-shop-bac8d.cloudfunctions.net/api