import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { CountryType /*CSSStarsProperties*/ } from '../types'
import { SingleCountryFromList } from '../components/SingleCountryFromList'

export function Countries() {
  const [filterText, setFilterText] = useState('')

  const { data: countries = [] } = useQuery<CountryType[]>(
    ['countries', filterText],
    async function () {
      const response = await fetch(
        filterText.length === 0
          ? '/api/countries'
          : `/api/countries?filter=${filterText}`
      )
      return response.json()
    }
  )

  return (
    <div className="search-image">
      <div>
        <form className="search">
          <input
            className="search "
            type="text"
            placeholder="search by country"
            value={filterText}
            onChange={function (event) {
              setFilterText(event.target.value)
            }}
          />
        </form>
        <article className="countries">
          {countries
            .sort((a, b) => (a.name < b.name ? -1 : 1))
            .map((country) => {
              return (
                <SingleCountryFromList key={country.id} country={country} />
              )
            })}
        </article>
      </div>
    </div>
  )
}
