"use client"

import { useEffect, useState } from "react"

import characterData from "./characters.json"
import { Characters, Character } from "./types"

export default function Classic() {
  const characters: Characters = characterData

  const [current, setCurrent] = useState("")
  const [dropdown, setDropdown] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    if (current === "") {
      setDropdown(false)
      return
    }
    const names = Object.keys(characters)
    const newOptions = names.filter((name) =>
      name.toLowerCase().startsWith(current.toLowerCase())
    )
    setOptions(newOptions)
    setDropdown(true)
  }, [current])

  function addGuess(guess: string) {
    setHistory((prev) => {
      return [guess, ...prev]
    })
  }

  return (
    <>
      <input
        name="character"
        type="text"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        placeholder="Guess a character..."
        className="w-50 "
        required
      />
      {dropdown && (
        <ul>
          {options.map((option) => {
            return (
              <li
                className="w-50 cursor-pointer"
                onClick={() => addGuess(option)}
                key={option}
              >
                {option}
              </li>
            )
          })}
        </ul>
      )}
      {history[0] && (
        <table>
          <thead>
            <tr>
              {Object.keys(characters[history[0]]).map((header) => {
                return <th>{header}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {history.map((characterName) => {
              const characterData = characters[characterName]
              return (
                <tr>
                  {Object.values(characterData).map((field) => {
                    return <td>{field}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}
