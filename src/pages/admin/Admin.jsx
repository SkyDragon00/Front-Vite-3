import { useEffect, useState } from 'react';
import { getAllGame } from '../../services';

export const Admin = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getAllGame()
            .then((data) => setGames(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <h1>Admin</h1>
            <p>Admin page</p>

            <a href="/admin/add-game">Agregar nuevo juego</a>
            <a href="/admin/delete-game">Ver todos los juegos para eliminar</a>

            <h2>Juegos</h2>

            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <p>{game.name}</p>
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
                        <p>Seasons:</p>
                        {game.season?.length > 0 && (
                            <ul>
                                {game.season.map((season, index) => (
                                    <li key={index}>{season}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </>
    )
}
