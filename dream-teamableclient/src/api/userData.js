import axios from 'axios';
import { getToken } from '../api/authManager';

const dbUrl = 'https://localhost7141/api/dtUsers';

const getUsers = () => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .get(`${dbUrl}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
});

const createUser = (user) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
        .post(dbUrl, user, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => resolve(response.data))
        .catch(reject);
    });
});

export { createUser, getUsers }