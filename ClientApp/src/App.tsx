import React from 'react'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'

import { Countries } from './pages/Countries'
import { Landing } from './pages/Landing'
import { AddCountry } from './pages/AddCountry'
import { Country } from './pages/Country'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { getUser, isLoggedIn, logout } from './auth'
import { Footer } from './components/Footer'

export function App() {
  const user = getUser()
  function handleLogout() {
    logout()

    window.location.assign('/')
  }
  return (
    <div>
      <header>
        <Link to="/">
          <h4>
            Country <br /> Cuisine <br /> Night
          </h4>
        </Link>
        <nav>
          <ul>
            <li>
              <a
                className="fa-solid fa-magnifying-glass nav-icon"
                title="search for a country"
                href="/search"
              ></a>
            </li>
            <li>
              <a
                className="fa-solid fa-square-plus nav-icon"
                title="add a country"
                href="/add"
              ></a>
            </li>
            {/* <li>|</li> */}
            {isLoggedIn() ? (
              <li>
                <a
                  className="fa-solid fa-passport nav-icon nav-passport"
                  title={`${user.firstName}'s passport`}
                  href="/"
                ></a>
              </li>
            ) : null}
            {/* {isLoggedIn() ? <li>|</li> : null} */}
            <button className="nav-button">
              {isLoggedIn() ? null : <Link to="/login">Log In</Link>}
              {isLoggedIn() ? (
                <a
                  href="/"
                  className="link"
                  onClick={function (event) {
                    event.preventDefault()
                    handleLogout()
                  }}
                >
                  Log Out
                </a>
              ) : null}
            </button>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Countries />} />
          <Route path="/add" element={<AddCountry />} />
          <Route path="/countries/:id" element={<Country />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
