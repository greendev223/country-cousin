import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

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
  id: Number(),
  dateAdded: new Date(),
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

  return (
    <div>
      <section className="country-container">
        <img
          className="country-container country-mr"
          src={country.flagUrl}
          // alt={`image of ${country.name}'s flag`}
          width="74em"
        />
        <p className="country-ml">{country.name}</p>
      </section>
      <div>
        <div className="country-icon-container">
          <i className="fa-solid fa-square-plus country-icon-addToPassport country-add-to-passport"></i>
          <span className="country-icon-text country-add-to-passport">
            Add {country.name} my Passport
          </span>
        </div>
        <section>
          {recipes?.map((recipe) => (
            <div key={recipe.id}>
              <div className="country-icon-container">
                <i className="fa-solid fa-utensils country-icon"> </i>
                <span className="country-icon-text">EAT</span>
              </div>
              <div className="country-descriptionAndImg">
                <h3 className="country-h3">
                  <a className="mouse" href={recipe.url}>
                    {recipe.name}
                  </a>
                </h3>
                <p className="country-p">{recipe.description}</p>
                <a className=" a-country" href={recipe.url}>
                  <img
                    src={recipe.photoUrl}
                    alt={`image of ${recipe.name}`}
                    width="70%"
                  />
                </a>
              </div>
            </div>
          ))}
        </section>
        <div className="a-country">
          <Link to={`/countries/${id}/addrecipe`}>
            <button className="add-button"> Add Recipe</button>
          </Link>
        </div>
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
                <h3 className="country-h3">
                  <a href={music.url}>{music.artist}</a>
                </h3>
                <p className="country-p">{music.description}</p>
                <a className=" a-country" href={music.url}>
                  <img
                    src={music.photoUrl}
                    alt={`image of ${music.artist}`}
                    width="70%"
                  />
                </a>
              </div>
            </div>
          ))}
        </section>
        <div className="a-country">
          <button className="add-button">Add Music</button>
        </div>
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
                <h3 className="country-h3">
                  <a href={movie.url}>{movie.title}</a>
                </h3>
                <p className="country-p">{movie.description}</p>
                <a className=" a-country" href={movie.url}>
                  <img
                    src={movie.photoUrl}
                    alt={`image of ${movie.title}`}
                    width="70%"
                  />
                </a>
              </div>
            </div>
          ))}
        </section>
        <div className="a-country">
          <button className="add-button">Add Movie</button>
        </div>
      </div>
    </div>
  )
}
