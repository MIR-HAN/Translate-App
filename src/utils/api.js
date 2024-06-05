import axios from 'axios';

export default axios.create({
  baseURL: 'https://text-translator2.p.rapidapi.com',

  headers: {
    'X-RapidAPI-Key': '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
  },
});
