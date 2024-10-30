"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import characterData from "./characters.json"
import { Characters } from "./types.js"

export default function Classic() {
  const characters: Characters = characterData

  const [current, setCurrent] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [dropdown, setOptions] = useState<string[]>([])

  // const character = useGetDailyCharacter()
  const guilty_gear_games = [
    "Guilty Gear",
    "Guilty Gear X",
    "Guilty Gear XX",
    "Guilty Gear XX #Reload",
    "Guilty Gear XX Slash",
    "Guilty Gear XX #Λ Core",
    "Guilty Gear XX #Λ Core Plus",
    "Guilty Gear XX #Λ Core Plus R",
    "Guilty Gear 2: Overture",
    "Guilty Gear Xrd -Sign-",
    "Guilty Gear Xrd -Revelator-",
    "Guilty Gear Xrd Rev 2",
    "Guilty Gear -Strive-",
  ]
  const character = "Ky Kiske"

  useEffect(() => {
    if (current === "") {
      setShowDropdown(false)
      return
    }
    const names = Object.keys(characters)
    const newDropdown = names.filter(
      (name) => name.toLowerCase().startsWith(current.toLowerCase()) && !history.includes(name)
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
              <li className="w-50 cursor-pointer" onClick={() => addGuess(name)} key={name}>
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
            {history.map((characterName, nameIndex) => {
              console.log(characterName)
              return (
                <tr className="text-center" key={characterName}>
                  {Object.values(characters[characterName]).map((trait, traitIndex) => {
                    let variants = [
                      `opacity-0 animate-[fadeIn_2s_forwards_0s]`,
                      `opacity-0 animate-[fadeIn_2s_forwards_.5s]`,
                      `opacity-0 animate-[fadeIn_2s_forwards_1s]`,
                      `opacity-0 animate-[fadeIn_2s_forwards_1.5s]`,
                      `opacity-0 animate-[fadeIn_2s_forwards_2s]`,
                      `opacity-0 animate-[fadeIn_2s_forwards_2.5s]`,
                    ]
                    let css = " border-solid border-1 border-black"
                    if (nameIndex === 0) {
                      css += " " + variants[traitIndex]
                    }

                    const traitValue = Object.values(characters[character])[traitIndex]
                    const traitKey = Object.keys(characters[character])[traitIndex]
                    if (traitValue !== trait) {
                      css += " bg-gred"
                    } else {
                      css += " bg-ggreen"
                    }
                    let arrow
                    if (traitKey === "Weight") {
                      if (trait < traitValue) {
                        arrow = (
                          <Image className="inline-table" src="/arrow-up.svg" alt="Up Arrow" width={24} height={24} />
                        )
                      } else if (trait > traitValue) {
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
                    if (traitKey === "First Appearance") {
                      const dailyIndex = guilty_gear_games.findIndex((element) => element === traitValue)
                      const charIndex = guilty_gear_games.findIndex((element) => element === trait)
                      if (charIndex < dailyIndex) {
                        arrow = (
                          <Image className="inline-table" src="/arrow-up.svg" alt="Up Arrow" width={24} height={24} />
                        )
                      } else if (charIndex > dailyIndex) {
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
