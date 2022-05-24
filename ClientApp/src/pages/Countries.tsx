import React from 'react'
import { useQuery } from 'react-query'

import { CountryType /*CSSStarsProperties*/ } from '../types'
import { SingleCountryFromList } from '../components/SingleCountryFromList'

export function Countries() {
  const { data: countries = [] } = useQuery<CountryType[]>(
    'countries',
    async function () {
      const response = await fetch('/api/countries')
      return response.json()
    }
  )
  console.log({ countries })

  return (
    <div>
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
