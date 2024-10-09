export interface Character {
  Gender: string
  Race: string // Generalized to string for any race
  Archetype: string // Generalized to string for different archetypes
  Resource: string // Specific options based on the JSON
  "First Appearance": string // Property with a hyphen in the name
  Weight: number // Weight as a number
}

export interface Characters {
  [characterName: string]: Character // Index signature for dynamic character names
}
