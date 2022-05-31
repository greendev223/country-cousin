import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

import { CountryType, MovieType, MusicType, RecipeType } from '../types'

async function loadOneCountry(id: string | undefined) {
  const response = await fetch(`/api/countries/${id}`)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

// Null Object Pattern
const NullCountry: CountryType = {
  id: undefined,
  dateAdded: '',
  name: '',
  flagUrl: '',
  recipes: [],
  movies: [],
  musics: [],
}

export function Country() {
  const { id } = useParams<{ id: string }>()

  const [recipes, setRecipes] = useState<RecipeType[]>([])
  const [musics, setMusics] = useState<MusicType[]>([])
  const [movies, setMovies] = useState<MovieType[]>([])

  useEffect(() => {
    const loadRecipes = () => {
      fetch(`/api/countries/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipes(data.recipes)
        })
    }
    loadRecipes()
  }, [id])

  useEffect(() => {
    const loadMusics = () => {
      fetch(`/api/countries/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setMusics(data.musics)
        })
    }
    loadMusics()
  }, [id])

  useEffect(() => {
    const loadMovies = () => {
      fetch(`/api/countries/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.movies)
        })
    }
    loadMovies()
  }, [id])

  const { data: country = NullCountry } = useQuery<CountryType>(
    ['one-country', id],
    () => loadOneCountry(id)
  )

  // QUESTION: What language is the map below?
  // QUESTION: How to add a href without changing styling?
  return (
    <div>
      <section className="country-container">
        <img
          className="country-container country-mr"
          src={country.flagUrl}
          // alt="image of flag"
          width="74em"
        />
        <p className="country-ml">{country.name}</p>
      </section>
      <div>
        <section>
          {recipes?.map((recipe) => (
            <div key={recipe.id}>
              <div className="country-icon-container">
                <i className="fa-solid fa-utensils country-icon"> </i>
                <span className="country-icon-text">EAT</span>
              </div>
              <div className="country-descriptionAndImg">
                <h3 className="country-h3">{recipe.name}</h3>
                <p className="country-p">{recipe.description}</p>
                <img
                  className="country-img"
                  src={recipe.photoUrl}
                  alt="image of recipe"
                  width="70%"
                />
              </div>
            </div>
          ))}
        </section>
      </div>
      <div>
        <section>
          {musics?.map((music) => (
            <div key={music.id}>
              <div className="country-icon-container">
                <i className="fa-solid fa-music country-icon"> </i>
                <span className="country-icon-text">LISTEN</span>
              </div>
              <div className="country-descriptionAndImg">
                <h3 className="country-h3">{music.artist}</h3>
                <p className="country-p">{music.description}</p>
                <img
                  className="country-img"
                  src={music.photoUrl}
                  alt="image of artist"
                  width="70%"
                />
              </div>
            </div>
          ))}
        </section>
      </div>
      <div className="country-mb">
        <section>
          {movies?.map((movie) => (
            <div key={movie.id}>
              <div className="country-icon-container">
                <i className="fa-solid fa-video country-icon"> </i>
                <span className="country-icon-text">WATCH</span>
              </div>
              <div className="country-descriptionAndImg">
                <h3 className="country-h3">{movie.title}</h3>
                <p className="country-p">{movie.description}</p>
                <img
                  className="country-img"
                  src={movie.photoUrl}
                  alt="image of artist"
                  width="70%"
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
