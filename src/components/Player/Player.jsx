import { useState } from "react";

export default function Player({ startName, symbol, isActive, changeName }) {
  let [name, setValueName] = useState(startName);
  let [isEditing, setValue] = useState(false);
  let status = <span className="player-name">{name}</span>;

  function handleButton() {
    setValue((value) => !value);
    if (isEditing) {
      changeName(symbol, name);
    }
  }

  function handleChange(event) {
    console.log(event);
    setValueName(event.target.value);
  }

  if (isEditing) {
    status = (
      <input type="text" required value={name} onChange={handleChange}></input>
    );
  }

  return (
    <>
      <li className={isActive ? "active" : ""}>
        <span className="player">
          {status}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleButton}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
