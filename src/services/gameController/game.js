import { getApi } from '../api';

export const getAllGame = async() => {
    const api = getApi();
    const response = await api.get('/game/all');

    return response.data;
}

export const getGameById = async(id) => {
    const api = getApi();
    const response = await api.get(`/game/${id}`);

    return response.data;
}

export const addGame = async(game) => {
    const api = getApi();
    const response = await api.post('/game/add', game);

    return response.data;
}

export const deleteGame = async(id) => {
    const api = getApi();
    const response = await api.delete(`/game/${id}`);

    return response.data;
}

export const purchaseGame = async(userId, gameId) => {
    const api = getApi();
    const response = await api.post('/game/purchase',{
        userId,
        gameId
    });

    return response.data;
}