import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    function handleEditClick() {
        //Use a function for best partice when updating a state based on the previous state
        //!isEditing schedules the update of the state while the function immediatly uses the latest available state value
        setIsEditing((editing) => !editing);

        //Listen for the new name only when the user is editing the info
        if(isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    function handleInputChange(event) {
        //event retrieved automatically from the onChange called on the input
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {isEditing ?
                    <input type="text" required value={playerName} onChange={handleInputChange} />
                    :
                    <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
} 