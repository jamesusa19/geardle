"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import characterData from "./characters.json"
import { Characters, Character } from "./types.js"

export default function Classic() {
  const characters: Characters = characterData

  const [current, setCurrent] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [dropdown, setOptions] = useState<string[]>([])

  // const character = useGetDailyCharacter()
  const character = "Ky Kiske"

  useEffect(() => {
    if (current === "") {
      setShowDropdown(false)
      return
    }
    const names = Object.keys(characters)
    const newDropdown = names.filter(
      (name) =>
        name.toLowerCase().startsWith(current.toLowerCase()) &&
        !history.includes(name)
    )
    setOptions(newDropdown)
    setShowDropdown(true)
  }, [current])

  function addGuess(guess: string) {
    setHistory((prev) => {
      return [guess, ...prev.reverse()]
    })
    setShowDropdown(false)
  }

  return (
    <>
      {history}
      <input
        name="character"
        type="text"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        placeholder="Guess a character..."
        className="w-50 "
        required
      />
      {showDropdown && (
        <ul>
          {dropdown.map((name) => {
            return (
              <li
                className="w-50 cursor-pointer"
                onClick={() => addGuess(name)}
                key={name}
              >
                {name}
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
              console.log(characterName)
              return (
                <tr className="text-center">
                  {Object.values(characters[characterName]).map((trait, i) => {
                    let variants = [
                      `animate-[fadeIn_2s_forwards_0s]`,
                      `animate-[fadeIn_2s_forwards_.5s]`,
                      `animate-[fadeIn_2s_forwards_1s]`,
                      `animate-[fadeIn_2s_forwards_1.5s]`,
                      `animate-[fadeIn_2s_forwards_2s]`,
                      `animate-[fadeIn_2s_forwards_2.5s]`,
                    ]
                    let css = "opacity-0 border-solid border-1 border-black"
                    css += " " + variants[i]

                    const dailyTrait = Object.values(characters[character])[i]
                    if (dailyTrait !== trait) {
                      css += " bg-gred"
                    } else {
                      css += " bg-ggreen"
                    }
                    let arrow
                    if (typeof trait === "number") {
                      if (trait < dailyTrait) {
                        arrow = (
                          <Image
                            className="inline-table"
                            src="/arrow-up.svg"
                            alt="Up Arrow"
                            width={24}
                            height={24}
                          />
                        )
                      } else if (trait > dailyTrait) {
                        arrow = (
                          <Image
                            className="inline-table"
                            src="/arrow-down.svg"
                            alt="Down Arrow"
                            width={24}
                            height={24}
                          />
                        )
                      }
                    }
                    return (
                      <td className={css}>
                        {trait}
                        {arrow}
                      </td>
                    )
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

function useGetDailyCharacter() {
  const characterRef = useRef("")

  useEffect(() => {
    const keys = Object.keys(characterData)
    const index = Math.floor(Math.random() * keys.length)
    characterRef.current = keys[index]
  }, [])

  return characterRef.current
}
