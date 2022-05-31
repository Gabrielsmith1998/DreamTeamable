import axios from 'axios';

const getLineups = () => new Promise((resolve, reject) => {
    axios.get('https://localhost:7141/api/lineups')
        .then((response) => {
            resolve(Object.values(response.data));
        })
        .catch(reject);
});

export default getLineups;