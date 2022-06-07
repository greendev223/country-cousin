import React from 'react'
import { Link } from 'react-router-dom'

import { CountryType /*CSSStarsProperties*/ } from '../types'

export function SingleCountryFromList({ country }: { country: CountryType }) {
  const urlForShowingCountry = `/countries/${country.id}`

  return (
    <ul className="search">
      <li>
        <Link to={urlForShowingCountry}>{country.name}</Link>
      </li>
      <li className="flag">
        <Link to={urlForShowingCountry}>
          <img
            src={country.flagUrl}
            alt={`image of ${country.name}'s flag`}
            width="150"
          />
        </Link>
      </li>
    </ul>
  )
}
