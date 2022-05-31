import React from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { CountryType } from '../types'
// import { Country } from './Country'

export function Landing() {
  // const [randomCountry, setRandomCountry] = useState<CountryType>(

  // )

  // function handleClickRandomCountryButton() {
  //   setRandomCountry(Math.floor(Math.random() * country.id ))
  // }

  // async function loadOneCountry(id: number | any) {
  //   const response = await fetch(
  //     `/api/countries/{}`
  //   )

  //   if (response.ok) {
  //     return response.json()
  //   } else {
  //     throw await response.json()
  //   }
  // }

  return (
    <section>
      <div className="welcome ">
        <h5>
          Welcome to <br /> Country Cuisine Night
        </h5>
        <h6>
          experiencing the world <br /> one night-in at a time
        </h6>
        <button>Generate Random Country</button>
        <div>
          <p>login</p>
          <p className="no-underline">or</p>

          <p>
            <Link to="/signup">sign up </Link>
          </p>
        </div>
      </div>
      <div className="mt-about">
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
