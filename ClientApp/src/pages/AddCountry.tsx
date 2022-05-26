import React, { useState } from 'react'
import { CountryType } from '../types'

export function AddCountry() {
  const [newCountry, setNewCountry] = useState<CountryType>({
    id: undefined,
    dateAdded: '',
    name: '',
    photoUrl: '',
    flagUrl: '',
    recipes: [],
    movies: [],
    musics: [],
  })
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
      <form action="#" className="addCountry">
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
      </form>
    </div>
  )
}
