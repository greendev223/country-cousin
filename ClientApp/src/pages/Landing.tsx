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
            About us <br /> <br /> Country Cuisine Night was born from a passion
            of geography, food, and art. Travel to a random country and listen
            to music while you cook a delicious meal. After dinner, snuggle and
            chill while watching a movie. Add countries to your passport and
            revisit! I hope your travels bring curiosity and joy to your day.
            Thank you for stopping by.
          </h5>
        </article>
      </div>
    </section>
  )
}
