import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router'
import { authHeader, isLoggedIn } from '../auth'
import { APIError, RecipeType } from '../types'

export function AddRecipe() {
  const history = useNavigate()
  const location = useLocation()
  console.log(location)

  const { id } = useParams<{ id: string }>()

  async function submitNewRecipe(recipeToCreate: RecipeType) {
    const response = await fetch(`/api/Countries/${id}/Recipes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: authHeader(),
      },
      body: JSON.stringify(recipeToCreate),
    })

    if (response.ok) {
      return response.json()
    } else {
      throw await response.json()
    }
  }

  const [newRecipe, setNewRecipe] = useState<RecipeType>({
    id: undefined,
    dateAdded: new Date(),
    name: '',
    url: '',
    photoUrl: '',
    description: '',
    countryId: Number(),
  })
  const [errorMessage, setErrorMessage] = useState('')

  // const user = getUser()
  // QUESTION: newCountry.id shows undefined. look into refetch and other options
  // for onSuccess
  const createNewRecipe = useMutation(submitNewRecipe, {
    onSuccess: () => {
      history('/')
    },
    onError: function (apiError: APIError) {
      setErrorMessage(Object.values(apiError.errors).join(' '))
    },
  })

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    createNewRecipe.mutate(newRecipe)
  }

  function handleStringFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedCountry = { ...newRecipe, [fieldName]: value }

    setNewRecipe(updatedCountry)
  }

  return (
    <div>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      {isLoggedIn() ? (
        <form onSubmit={handleFormSubmit} className="addCountry">
          <p className="addCountry">
            <label htmlFor="country">recipe name</label>
            <input
              className="addCountry"
              type="text"
              name="name"
              value={newRecipe.name}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="addCountry">
            <label htmlFor="url">recipe url</label>
            <input
              className="addCountry"
              type="text"
              name="url"
              value={newRecipe.url}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="addCountry">
            <label htmlFor="photoUrl">recipe photo url</label>
            <input
              className="addCountry"
              type="text"
              name="photoUrl"
              value={newRecipe.photoUrl}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="addCountry">
            <label htmlFor="url">recipe description</label>
            <input
              className="addCountry"
              type="text"
              name="description"
              value={newRecipe.description}
              onChange={handleStringFieldChange}
            />
          </p>
          <div>
            <button className="addCountry" name="submit">
              Submit
            </button>
          </div>
        </form>
      ) : null}
    </div>
  )
}
