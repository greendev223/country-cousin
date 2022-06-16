import React from 'react'
import { getUser } from '../auth'

export function Passport() {
  const user = getUser()
  return (
    <div>
      <div className="passport-background">
        <h6 className="passport">Hi, {user.firstName}</h6>
        <h3 className="passport">Great job traveling the world!</h3>
        {/* <div className="country-icon-container">
          <Link to={`/passport/${user.id}/addPassportPhoto`}>
            <i className="fa-solid fa-square-plus addPhotoToPassport-icon country-add-to-passport"></i>
          </Link>
          <span className="addPhotoToPassport-icon-text country-add-to-passport">
            Add Passport Photo
          </span>
        </div> */}
        <section>
          <div className="country-icon-container">
            <i className="fa-solid fa-stamp country-icon"> </i>
            <span className="country-icon-text">passport stamps</span>
          </div>
        </section>
      </div>
    </div>
  )
}
