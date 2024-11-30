import { useEffect, useState } from "react"
import { getIdFromJWT, getRecommendations } from "../../services"


export const Recommendations = () => {

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user_id = getIdFromJWT(localStorage.getItem('token'));
    const response = getRecommendations(user_id);

    response
      .then(recommendations => setRecommendations(recommendations))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  },[]);

  return (
    <>
      <h1>Recommendations</h1>
      <p>Welcome to the recommendations page</p>

      {loading && <p>Loading...</p>}

      {error && <p>There was an error: {error.message}</p>}

      <ul>
        {recommendations.map(recommendation => (
          <li key={recommendation.id}>
            <h2>{recommendation.name}</h2>
            <p>{recommendation.description}</p>
            <p>{recommendation.price}</p>
            <p>Tags:</p>
            <ul>
              {recommendation.tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p>Seasons:</p>
            <ul>
              {recommendation.season.map(season => (
                <li key={season}>{season}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}
