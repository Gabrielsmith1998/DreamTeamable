import axios from 'axios';

const getPlayers = () => new Promise((resolve, reject) => {
    axios.get('https://localhost:7141/api/players')
        .then((response) => {
            resolve(Object.values(response.data));
        })
        .catch(reject);
});

const getPlayer = (id) => new Promise((resolve, reject) => {
    axios.get(`https://localhost:7141/api/players/${id}`)
      .then((response) => resolve(response.data))
      .catch(reject);
});

export { 
    getPlayers,
    getPlayer
}