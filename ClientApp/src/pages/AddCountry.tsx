import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import { authHeader, isLoggedIn } from '../auth'
import { APIError, CountryType } from '../types'

async function submitNewCountry(countryToCreate: CountryType) {
  const response = await fetch('/api/Countries', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify(countryToCreate),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

export function AddCountry() {
  const history = useNavigate()

  const [newCountry, setNewCountry] = useState<CountryType>({
    id: undefined,
    dateAdded: new Date(),
    name: '',
    flagUrl: '',
    recipes: [],
    movies: [],
    musics: [],
  })

  const [errorMessage, setErrorMessage] = useState('')

  // QUESTION: newCountry.id shows undefined
  const createNewCountry = useMutation(submitNewCountry, {
    onSuccess: function () {
      history(`/countries/${newCountry.id}`)
    },
    onError: function (apiError: APIError) {
      setErrorMessage(Object.values(apiError.errors).join(' '))
    },
  })

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    createNewCountry.mutate(newCountry)
  }

  function handleStringFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedCountry = { ...newCountry, [fieldName]: value }

    setNewCountry(updatedCountry)
  }
  return (
    <div>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      {isLoggedIn() ? (
        <form onSubmit={handleFormSubmit} className="addCountry">
          <p className="addCountry">
            <label htmlFor="country">country name</label>
            <input
              className="addCountry"
              type="text"
              name="name"
              value={newCountry.name}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="addCountry">
            <label htmlFor="flagUrl">flag url</label>
            <input
              className="addCountry"
              type="text"
              name="flagUrl"
              value={newCountry.flagUrl}
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
