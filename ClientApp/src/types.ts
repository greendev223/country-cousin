import { CSSProperties } from 'react'

export interface CSSStarsProperties extends CSSProperties {
  '--rating': number
}

export type CountryType = {
  id: number
  dateAdded: string
  name: string
  photoUrl: string
  flagUrl: string
  recipes: RecipeType[]
  movies: MovieType[]
  musics: MusicType[]
}

export type MovieType = {
  id: number
  dateAdded: string
  title: string
  description: string
  url: string
  countryId: number
}

export type MusicType = {
  id: number
  dateAdded: string
  artist: string
  description: string
  url: string
  countryId: number
}

export type RecipeType = {
  id: number
  dateAdded: string
  name: string
  url: string
  photoUrl: string
  description: string
  countryId: number
}
