import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router'
import { authHeader, isLoggedIn } from '../auth'
import { APIError, MovieType } from '../types'

export function AddMovie() {
  const history = useNavigate()
  const location = useLocation()
  console.log(location)

  const { id } = useParams<{ id: string }>()

  async function submitNewMovie(movieToCreate: MovieType) {
    const response = await fetch(`/api/Countries/${id}/Movies`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: authHeader(),
      },
      body: JSON.stringify(movieToCreate),
    })

    if (response.ok) {
      return response.json()
    } else {
      throw await response.json()
    }
  }

  const [newMovie, setNewMovie] = useState<MovieType>({
    id: undefined,
    dateAdded: new Date(),
    title: '',
    url: '',
    photoUrl: '',
    description: '',
    countryId: Number(),
  })
  const [errorMessage, setErrorMessage] = useState('')

  // const user = getUser()
  // QUESTION: newCountry.id shows undefined. look into refetch and other options
  // for onSuccess
  const createNewMovie = useMutation(submitNewMovie, {
    onSuccess: function () {
      fetch('/api/Countries')
        .then((response) => response.json())
        .then(() => history(`../countries/${id}`))
    },
    onError: function (apiError: APIError) {
      setErrorMessage(Object.values(apiError.errors).join(' '))
    },
  })

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    createNewMovie.mutate(newMovie)
  }

  function handleStringFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedCountry = { ...newMovie, [fieldName]: value }

    setNewMovie(updatedCountry)
  }

  return (
    <div>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      {isLoggedIn() ? (
        <form onSubmit={handleFormSubmit} className="addCountry">
          <p className="addCountry">
            <label htmlFor="country">movie title</label>
            <input
              className="addCountry"
              type="text"
              name="title"
              value={newMovie.title}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="addCountry">
            <label htmlFor="url">movie imdb url</label>
            <input
              className="addCountry"
              type="text"
              name="url"
              value={newMovie.url}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="addCountry">
            <label htmlFor="photoUrl">movie photo url</label>
            <input
              className="addCountry"
              type="text"
              name="photoUrl"
              value={newMovie.photoUrl}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="addCountry">
            <label htmlFor="url">movie description</label>
            <input
              className="addCountry"
              type="text"
              name="description"
              value={newMovie.description}
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
