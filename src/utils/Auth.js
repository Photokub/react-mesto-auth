export const BASE_URL = 'https://auth.nomoreparties.co/';

export const register = ({email, password}) => {
    return fetch(`${BASE_URL}signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(checkResponse)
};

export const authorize = ({password, email}) => {
    return fetch(`${BASE_URL}signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(checkResponse)
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(checkResponse)
}


const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`)