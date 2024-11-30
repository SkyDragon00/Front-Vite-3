import { useState } from 'react';
import {
    getAllGame,
    getIdFromJWT,
    purchaseGame
} from '../../services';
import { useEffect } from 'react';

export const Home = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getAllGame()
            .then(response => {
                setGames(response);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleAddGame = async(idGame) => {
        const user_id = getIdFromJWT(localStorage.getItem('token'));
        try {
            await purchaseGame(user_id, idGame);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <h1>Home</h1>
            <p>Welcome to the home page</p>

            <a href="/purchase">
                Purchases
            </a>

            <a href="/recommendations">
                Recommendations
            </a>

            {loading && <p>Loading...</p>}

            {error && <p>Error: {error.message}</p>}

            <ul>
                {games.map((game) => (
                    // name, description, price, tags
                    <>
                        <li key={game.id}>
                            <h2>{game.name}</h2>
                            <p>{game.description}</p>
                            <p>{game.price}</p>
                            <p>Tags:</p>
                            {game.tags?.length > 0 && (
                                <ul>
                                    {game.tags.map((tag, index) => (
                                        <li key={index}>{tag}</li>
                                    ))}
                                </ul>
                            )}
                            <p>Seasons</p>
                            {game.season?.length > 0 && (
                                <ul>
                                    {game.season.map((season, index) => (
                                        <li key={index}>
                                            <h3>{season}</h3>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        <button onClick={() => handleAddGame(game.id)}>Add to cart</button>
                    </>
                ))}
            </ul>
        </>
    )
}
