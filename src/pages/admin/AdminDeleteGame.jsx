import { useEffect, useState } from 'react';
import { getAllGame, deleteGame } from '../../services';

export const AdminDeleteGame = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGame()
      .then((data) => setGames(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteGame(id);
      setGames(games.filter((game) => game.id !== id));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <h1>Delete Game</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.name}
            <button onClick={() => handleDelete(game.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}
