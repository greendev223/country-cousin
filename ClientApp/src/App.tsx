import React from 'react'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'

import { Countries } from './pages/Countries'
import { Passport } from './pages/Passport'
import { Landing } from './pages/Landing'
import { AddCountry } from './pages/AddCountry'
import { Country } from './pages/Country'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { getUser, isLoggedIn, logout } from './auth'
import { Footer } from './components/Footer'
import { AddRecipe } from './pages/AddRecipe'

export function App() {
  return (
    <div>
      <header>{isLoggedIn() ? <LoggedInNav /> : <SignedOutNav />}</header>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Countries />} />
          <Route path="/addCountry" element={<AddCountry />} />
          <Route path="/countries/:id/addRecipe" element={<AddRecipe />} />
          <Route path="/countries/:id" element={<Country />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passport/:id" element={<Passport />} />
          <Route path="*" element={'No Match'} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function LoggedInNav() {
  const user = getUser()
  function handleLogout() {
    logout()

    window.location.assign('/')
  }
  return (
    <>
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
              href="/addCountry"
            ></a>
          </li>

          <li>
            <a
              className="fa-solid fa-passport nav-icon nav-passport"
              title={`${user.firstName}'s passport`}
              href={`/passport/${user.id}`}
            ></a>
          </li>
          <button className="nav-button">
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
          </button>
        </ul>
      </nav>
    </>
  )
}

function SignedOutNav() {
  return (
    <>
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
          <button className="nav-button">
            <Link to="/login">Log In</Link>
          </button>
        </ul>
      </nav>
    </>
  )
}
