import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { CountryType } from '../types'

async function submitNewCountry(countryToCreate: CountryType) {
  const response = await fetch('/api/Countries', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(countryToCreate),
  })
  return response.json
}

export function AddCountry() {
  const [newCountry, setNewCountry] = useState<CountryType>({
    id: undefined,
    dateAdded: undefined,
    name: '',
    photoUrl: '',
    flagUrl: '',
    recipes: undefined,
    movies: undefined,
    musics: undefined,
  })

  // QUESTION: Add form fields for other tables/arrays within CountryType?
  const createNewCountry = useMutation(submitNewCountry)

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
      <form onSubmit={handleFormSubmit} className="addCountry">
        <p className="addCountry">
          <label htmlFor="country">name</label>
          <input
            className="addCountry"
            type="text"
            name="name"
            value={newCountry.name}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="addCountry">
          <label htmlFor="photoUrl">photo url</label>
          <input
            className="addCountry"
            type="text"
            name="photoUrl"
            value={newCountry.photoUrl}
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
        {/* <p className="addCountry">
          <label htmlFor="">flag url</label>
          <input className="addCountry" type="text" name="flagUrl" />
        </p> */}
        <div>
          <button className="addCountry" name="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
