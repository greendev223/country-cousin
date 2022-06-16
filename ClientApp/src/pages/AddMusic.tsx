import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router'
import { authHeader, isLoggedIn } from '../auth'
import { APIError, MusicType as MusicType } from '../types'

export function AddMusic() {
  const history = useNavigate()
  const location = useLocation()
  console.log(location)

  const { id } = useParams<{ id: string }>()

  async function submitNewMusic(musicToCreate: MusicType) {
    const response = await fetch(`/api/Countries/${id}/Musics`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: authHeader(),
      },
      body: JSON.stringify(musicToCreate),
    })

    if (response.ok) {
      return response.json()
    } else {
      throw await response.json()
    }
  }

  const [newMusic, setNewMusic] = useState<MusicType>({
    id: undefined,
    dateAdded: new Date(),
    artist: '',
    url: '',
    photoUrl: '',
    description: '',
    countryId: Number(),
  })
  const [errorMessage, setErrorMessage] = useState('')

  // const user = getUser()
  // QUESTION: newCountry.id shows undefined. look into refetch and other options
  // for onSuccess
  const createNewMusic = useMutation(submitNewMusic, {
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

    createNewMusic.mutate(newMusic)
  }

  function handleStringFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedCountry = { ...newMusic, [fieldName]: value }

    setNewMusic(updatedCountry)
  }

  return (
    <div>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      {isLoggedIn() ? (
        <form onSubmit={handleFormSubmit} className="addCountry">
          <p className="addCountry">
            <label htmlFor="country">artist name</label>
            <input
              className="addCountry"
              type="text"
              name="artist"
              value={newMusic.artist}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="addCountry">
            <label htmlFor="url">music url</label>
            <input
              className="addCountry"
              type="text"
              name="url"
              value={newMusic.url}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="addCountry">
            <label htmlFor="photoUrl">artist photo url</label>
            <input
              className="addCountry"
              type="text"
              name="photoUrl"
              value={newMusic.photoUrl}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="addCountry">
            <label htmlFor="url">artist description</label>
            <input
              className="addCountry"
              type="text"
              name="description"
              value={newMusic.description}
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
