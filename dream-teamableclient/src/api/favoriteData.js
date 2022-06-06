import axios from 'axios';

const getFavorites = () => new Promise((resolve, reject) => {
    axios.get('https://localhost:7141/api/favorites')
        .then((response) => {
            resolve(Object.values(response.data));
        })
        .catch(reject);
});

const createFavorite = (obj) => new Promise((resolve, reject) => {
    axios
      .post(`https://localhost:7141/api/favorites`, obj)
      .then((response) => resolve(response.data))
      .catch(reject);
});

const updateFavorite = (obj) => new Promise((resolve, reject) => {
    axios.patch(`https://localhost:7141/api/favorites/${obj.id}`, obj)
      .then(() => getFavorites().then(resolve))
      .catch(reject);
})

const deleteFavorite = (id) => new Promise((resolve, reject) => {
    axios
      .delete(`https://localhost:7141/api/favorites/${id}`)
      .then(() => getFavorites().then(resolve))
      .catch(reject);
  });

export { 
    createFavorite,
    updateFavorite,
    getFavorites,
    deleteFavorite
}