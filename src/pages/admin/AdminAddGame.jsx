import { useState } from "react";
import { addGame } from '../../services';
import { useNavigate } from "react-router-dom";

const validTags = [
    "Action",
    "Platform",
    "Sandbox",
    "Horror",
    "Shooter",
    "RPG",
    "Adventure",
    "Sports",
    "Fighting",
    "Rhythm",
];

const validSeasons = ["Halloween", "Christmass", "Valentine", "Easter"];

export const AdminAddGame = () => {

    const [gameData, setGameData] = useState({
        name: "",
        description: "",
        price: 0,
        tags: [],
        season: [],
    });

    const [tagInput, setTagInput] = useState("");
    const [seasonInput, setSeasonInput] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleTagInput = (e) => {
        setTagInput(e.target.value);
    };

    const handleSeasonInput = (e) => {
        setSeasonInput(e.target.value);
    }

    const handleAddTag = () => {
        if (tagInput && validTags.includes(tagInput)) {
            setGameData({
                ...gameData,
                tags: [...gameData.tags, tagInput],
            });
            setTagInput("");
        }
    };

    const handleAddSeason = () => {
        if (seasonInput && validSeasons.includes(seasonInput)) {
            setGameData({
                ...gameData,
                season: [...gameData.season, seasonInput],
            });
            setSeasonInput("");
        }
    }

    const handleRemoveTag = (tag) => {
        setGameData({
            ...gameData,
            tags: gameData.tags.filter((t) => t !== tag),
        });
    };

    const handleRemoveSeason = (season) => {
        setGameData({
            ...gameData,
            season: gameData.season.filter((s) => s !== season),
        });
    }

    const handleAddGame = async () => {
        try {
            await addGame(gameData);
            navigate("/admin");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <div>AdminAddGame</div>

            <div>
                {error && <div>{error}</div>}
                <h1>Add Game</h1>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={gameData.name}
                        onChange={(e) =>
                            setGameData({ ...gameData, name: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={gameData.description}
                        onChange={(e) =>
                            setGameData({ ...gameData, description: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={gameData.price}
                        onChange={(e) =>
                            setGameData({ ...gameData, price: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Tags</label>
                    <select value={tagInput} onChange={handleTagInput}>
                        <option value="">Select Tag</option>
                        {validTags.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleAddTag}>Add</button>
                    <ul>
                        {gameData.tags.map((tag) => (
                            <li key={tag}>
                                {tag}
                                <button onClick={() => handleRemoveTag(tag)}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <label>Seasons</label>
                    <select value={seasonInput} onChange={handleSeasonInput}>
                        <option value="">Select Season</option>
                        {validSeasons.map((season) => (
                            <option key={season} value={season}>
                                {season}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAddSeason}>Add</button>
                    <ul>
                        {gameData.season.map((season) => (
                            <li key={season}>
                                {season}
                                <button onClick={() => handleRemoveSeason(season)}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={handleAddGame}>Add Game</button>
            </div>
        </>
    )
}
