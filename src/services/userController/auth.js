import { jwtDecode } from 'jwt-decode';
import { getApi } from '../api';

export const getIdFromJWT = (jwt) => {
    const { user_id } = jwtDecode(jwt);
    return user_id;
}

export const getPurchasedGames = async(userId) => {
    const api = getApi();
    const response = await api.get(`/game/purchases/${userId}`);

    return response.data;
}

export const getRecommendations = async (userId) => {
    const api = getApi();

    try {
        const responseUserLike = await api.get(`/game/purchases/${userId}`);
        const userLikes = responseUserLike.data;

        const responseAllGames = await api.get('/game/all');
        const allGames = responseAllGames.data;

        const userLikeTags = userLikes.flatMap((like) => like.Game.tags);
        const userLikeSeasons = userLikes.flatMap((like) => like.Game.season);

        const recommendationsByTag = allGames.filter((game) =>
            game.tags.some((tag) => userLikeTags.includes(tag))
        );

        const recommendationsBySeason = allGames.filter((game) =>
            game.season.some((season) => userLikeSeasons.includes(season))
        );

        const recommendations = [
            ...new Map(
                [...recommendationsByTag, ...recommendationsBySeason].map((game) => [game.id, game])
            ).values(),
        ];

        // Remove games that the user already purchased
        const gamesUser = userLikes.map((like) => like.Game);
        const games_id = gamesUser.map((game) => game.id);
        
        const recommendationsFiltered = recommendations.filter((game) => !games_id.includes(game.id));

        console.log(gamesUser);

        return recommendationsFiltered;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};
export const getSeasonalRecommendations = async () => {
    const api = getApi();

    try {
        const response = await api.get('/game/season/current'); // Backend endpoint for seasonal recommendations
        return response.data;
    } catch (error) {
        console.error('Error fetching seasonal recommendations:', error);
        throw error;
    }
};