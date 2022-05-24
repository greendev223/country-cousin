import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { CountryType /*CSSStarsProperties*/ } from '../types'
import { SingleCountryFromList } from '../components/SingleCountryFromList'

export function Countries() {
  const [filterText, setFilterText] = useState('')

  const { data: countries = [] } = useQuery<CountryType[]>(
    ['countries', filterText],
    async function () {
      let url = '/api/countries'

      if (filterText.length !== 0) {
        url = `/api/countries?filter=${filterText}`
      }

      const response = await fetch(url)
      return response.json()
    }
  )

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={function (event) {
            setFilterText(event.target.value)
          }}
        />
      </form>
      <article>
        {countries
          .sort((a, b) => (a.name > b.name ? 1 : 0))
          .map((country) => {
            return <SingleCountryFromList key={country.id} country={country} />
          })}
      </article>
    </div>
  )
}
