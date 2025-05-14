import axios from 'axios';

const client = axios.create({
    baseURL: 'https://coffee-island.lyxelandflamingotech.in/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
