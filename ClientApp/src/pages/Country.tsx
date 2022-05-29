import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

import { CountryType, RecipeType } from '../types'
// import { RecipeType } from '../types'

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

  const { data: country = NullCountry } = useQuery<CountryType>(
    ['one-country', id],
    () => loadOneCountry(id)
  )

  return (
    <div>
      <section className="country-container">
        <img
          className="country-container country-mr-5"
          src={country.flagUrl}
          alt="image of flag"
          width="74em"
        />
        <p className="country-ml-5">{country.name}</p>
      </section>
      {/* <div> */}
      {/* <p>
            <img
              className="country-image"
              src={country.photoUrl}
              width="100%"
              // height="100px"
              // QUESTION: How to hard-code alt
              alt="image of country"
            />
          </p> */}
      {/* </div> */}
      <div>
        <section>
          {recipes?.map((recipe) => (
            <div key={recipe.id}>
              <img src={recipe.photoUrl} alt="image of recipe" />
              <h5>{recipe.name}</h5>
              <p>{recipe.description}</p>
            </div>
          ))}
        </section>
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
    </div>
  )
}
