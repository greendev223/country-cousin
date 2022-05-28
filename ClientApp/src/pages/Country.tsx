import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

import { CountryType } from '../types'

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
  photoUrl: '',
  flagUrl: '',
  recipes: [],
  movies: [],
  musics: [],
}

export function Country() {
  const { id } =
    useParams<{ id: string; actions: 'Movies' | 'Musics' | 'Recipes' }>()

  const { data: country = NullCountry } = useQuery<CountryType>(
    ['one-country', id],
    () => loadOneCountry(id)
  )

  return (
    <div>
      <div>
        <section className="country-image">
          <img
            src={country.photoUrl}
            width="100%"
            // QUESTION: How to hard-code alt
            alt="image of {{country.name}}"
          />
          <p>{country.name}</p>

          <img src={country.flagUrl} width="200" />
        </section>
      </div>
      <section>
        <div>
          <img src="recipePhoto" alt="" />
          <h5>recipe name</h5>
          <p>recipeDescription</p>
        </div>
        <div>
          <img src="musicPhoto" alt="" />
          <h5>musician name</h5>
          <p>musicDescription</p>
        </div>
        <div>
          <img src="moviePhoto" alt="" />
          <h5>movie name</h5>
          <p>movieDescription</p>
        </div>
      </section>
    </div>
  )
}
