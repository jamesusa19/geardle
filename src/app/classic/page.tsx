"use client";

import { useEffect, useState } from "react";

import characters from "./characters.json";

export default function Classic() {
  const [current, setCurrent] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (current === "") {
      setDropdown(false);
      return;
    }
    const names = Object.keys(characters);
    const newOptions = names.filter((name) =>
      name.toLowerCase().startsWith(current.toLowerCase())
    );
    setOptions(newOptions);
    setDropdown(true);
  }, [current]);

  return (
    <>
      <input
        name="character"
        type="text"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        placeholder="Guess a character..."
        required
      />
      {dropdown && (
        <ul>
          {options.map((option) => {
            return <li key={option}>{option}</li>;
          })}
        </ul>
      )}
    </>
  );
}
