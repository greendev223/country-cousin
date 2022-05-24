import React from 'react'
import { useQuery } from 'react-query'

import { CountryType /*CSSStarsProperties*/ } from '../types'

type SingleCountryFromListProps = {
  country: CountryType
}
function SingleCountryFromList(props: SingleCountryFromListProps) {
  return (
    <ul className="search">
      <li>{props.country.name}</li>
      <li className="flag">
        <img
          src={props.country.flagUrl}
          alt="image of ${country.name}'s flag"
          width="150"
        />
      </li>
    </ul>
  )
}

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
