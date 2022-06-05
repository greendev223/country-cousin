import { CSSProperties } from 'react'

export interface CSSStarsProperties extends CSSProperties {
  '--rating': number
}

export type CountryType = {
  id: number | undefined
  dateAdded: Date
  name: string
  flagUrl: string
  recipes: RecipeType[]
  movies: MovieType[]
  musics: MusicType[]
}

export type MovieType = {
  id: number | undefined
  dateAdded: string
  title: string
  description: string
  url: string
  photoUrl: string
  countryId: number
}

export type MusicType = {
  id: number | undefined
  dateAdded: string
  artist: string
  description: string
  url: string
  photoUrl: string
  countryId: number
}

export type RecipeType = {
  id: number | undefined
  dateAdded: string
  name: string
  url: string
  photoUrl: string
  description: string
  countryId: number | undefined
}

export type APIError = {
  errors: Record<string, string[]>
  status: number
  title: string
  traceId: string
  type: string
}

export type NewUserType = {
  firstName: string
  email: string
  password: string
}

export type LoginUserType = {
  email: string
  password: string
}

export type LoginSuccess = {
  token: string
  user: {
    id: number
    firstName: string
    email: string
  }
}
