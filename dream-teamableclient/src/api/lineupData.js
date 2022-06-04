import axios from 'axios';

const getLineups = () => new Promise((resolve, reject) => {
    axios.get('https://localhost:7141/api/lineups')
        .then((response) => {
            resolve(Object.values(response.data));
        })
        .catch(reject);
});

const updateLineups = (obj) => new Promise((resolve, reject) => {
    axios.patch(`https://localhost:7141/api/lineups/${obj.id}`, obj)
      .then(() => getLineups().then(resolve))
      .catch(reject);
})

const createLineup = (obj) => new Promise((resolve, reject) => {
    axios
      .post(`https://localhost:7141/api/lineups`, obj)
      .then((response) => resolve(response.data))
      .catch(reject);
});

export { 
    getLineups,
    updateLineups,
    createLineup,
};