import React from 'react'
import { Link } from 'react-router-dom'
// import { CountryType } from '../types'
// import { Link } from 'react-router-dom'

export function Landing() {
  // const [randomCountry, setRandomCountry] = useState<CountryType[]>([])

  // var selectRandomCountry =
  //   randomCountry[Math.floor(Math.random() * randomCountry.length)]

  // function handleClickRandomCountryButton() {
  //   setRandomCountry(Math.floor(Math.random() * randomCountry.length))
  // }
  // console.log(selectRandomCountry.id)

  // console.log(randomCountry.length)
  // console.log(handleClickRandomCountryButton)

  // async function loadOneCountry(id: number | any) {
  //   const response = await fetch(`/api/countries/{}`)

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
          <p className="landing">
            <Link to="/login"> login </Link>
          </p>
          <p className="no-underline landing">or</p>

          <p className="landing">
            <Link to="/signup">sign up</Link>
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
