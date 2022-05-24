import React from 'react'
import { CountryType /*CSSStarsProperties*/ } from '../types'

export function SingleCountryFromList({ country }: { country: CountryType }) {
  return (
    <ul className="search">
      <li>{country.name}</li>
      <li className="flag">
        <img
          src={country.flagUrl}
          alt="image of ${country.name}'s flag"
          width="150"
        />
      </li>
    </ul>
  )
}
