import React, { useEffect, useState } from 'react'
// import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, isLoggedIn } from '../auth'
import { CountryType } from '../types'
// import { CountryType } from '../types'
// import { Link } from 'react-router-dom'

export function Landing() {
  const user = getUser()
  const history = useNavigate()
  const [countries, setCountries] = useState<CountryType[]>([])

  useEffect(() => {
    const loadCountries = () => {
      fetch(`/api/countries/`)
        .then((response) => response.json())
        .then((data) => {
          setCountries(data)
        })
    }
    loadCountries()
  }, [])

  const randomCountryIds: Array<Number | undefined> = []

  function getRandomCountryId() {
    countries.forEach((country) => {
      randomCountryIds.push(country.id)
    })
  }
  getRandomCountryId()

  async function loadOneCountry() {
    var randomCountryId =
      randomCountryIds[Math.floor(Math.random() * randomCountryIds.length)]
    const response = await fetch('/api/countries/' + randomCountryId)

    if (response.ok) {
      console.log(response)
      history('/countries/' + randomCountryId)
      return response.json()
    } else {
      throw await response.json()
    }
  }

  return (
    <section>
      <div className="welcome ">
        {isLoggedIn() ? (
          <h5>
            Welcome back to <br /> Country Cuisine Night, <br />{' '}
            {user.firstName}!
          </h5>
        ) : (
          <h5>
            Welcome to <br /> Country Cuisine Night
          </h5>
        )}
        <h6>
          experiencing the world <br /> one night-in at a time
        </h6>
        <button onClick={loadOneCountry} className="random-country-button">
          Random Country
        </button>
        <div>
          {isLoggedIn() ? null : (
            <>
              <p className="landing">
                <Link to="/login"> log in </Link>
              </p>
              <p className="no-underline landing">or</p>

              <p className="landing">
                <Link to="/signup">sign up</Link>
              </p>
            </>
          )}
        </div>
      </div>
      <div>
        <article>
          <h5 className="about">
            About us <br /> <br /> Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Massa ultricies mi quis hendrerit dolor magna
            eget est. Viverra tellus in hac habitasse platea dictumst vestibulum
            rhoncus. Nec ultrices dui sapien eget mi proin.
          </h5>
        </article>
      </div>
    </section>
  )
}
