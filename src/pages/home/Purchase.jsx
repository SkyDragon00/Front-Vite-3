import { useEffect, useState } from 'react';
import { getIdFromJWT, getPurchasedGames } from '../../services';

export {
    getPurchasedGames
} from '../../services';

export const Purchase = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user_id = getIdFromJWT(localStorage.getItem('token'));
        setLoading(true);
        getPurchasedGames(user_id)
            .then(response => {
                setGames(response);
                console.log(response[0].Game);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <h1>Purchase</h1>
            <p>Welcome to the purchase page</p>

            {loading && <p>Loading...</p>}

            {error && <p>Error: {error.message}</p>}

            <ul>
                {games.map((game, index) => (
                    // name, description, price, tags
                    <>
                        <li key={game.id}>
                            <h2>{game.Game.name}</h2>
                            <p>{game.Game.description}</p>
                            <p>{game.Game.price}</p>
                            <p>Tags:</p>
                            {game.Game.tags?.length > 0 && (
                                <ul>
                                    {game.Game.tags.map((tag, index) => (
                                        <li key={index}>{tag}</li>
                                    ))}
                                </ul>
                            )}
                            <p>Seasons:</p>
                            {game.Game.season?.length > 0 && (
                                <ul>
                                    {game.Game.season.map((season, index) => (
                                        <li key={index}>
                                            <h3>{season}</h3>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </>
                ))}
            </ul>
        </>
    )
}
