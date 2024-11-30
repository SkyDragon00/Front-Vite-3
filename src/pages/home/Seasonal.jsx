import { useEffect, useState } from "react";
import { getSeasonalRecommendations } from "../../services/userController";

export const Seasonal = () => {
  const [seasonalGames, setSeasonalGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSeason, setCurrentSeason] = useState("");

  useEffect(() => {
    setLoading(true);

    getSeasonalRecommendations()
      .then((response) => {
        setSeasonalGames(response.games); // Assuming "games" is part of the response
        setCurrentSeason(response.season); // Assuming "season" is part of the response
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>Seasonal Recommendations</h1>
      <p>Welcome to the seasonal recommendations page</p>

      {loading && <p>Loading...</p>}

      {error && <p>There was an error: {error.message}</p>}

      <h2>Current Season: {currentSeason}</h2>

      <ul>
        {seasonalGames.map((game) => (
          <li key={game.id}>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <p>Price: ${game.price}</p>
            <p>Tags:</p>
            <ul>
              {game.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p>Seasons:</p>
            <ul>
              {game.season.map((season) => (
                <li key={season}>{season}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};
