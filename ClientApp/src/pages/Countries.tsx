import React from 'react'
import { useQuery } from 'react-query'

import { CountryType /*CSSStarsProperties*/ } from '../types'

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
        <ul className="search">
          <li>Country1</li>
          <li>Country2</li>
          <li>Country3</li>
        </ul>
      </article>
    </div>
  )
}
