import React from 'react'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'

import { Countries } from './pages/Countries'
import { Landing } from './pages/Landing'

export function App() {
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
            <Link to="/">
              <li>Home</li>
            </Link>
            <li>|</li>
            <li>Add</li>
            <li>|</li>
            <Link to="/search">
              <li>Search</li>
            </Link>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/:search" element={<Countries />} />
        </Routes>
      </main>
      <footer>
        <div>
          made by <br /> lauren mccall
        </div>
        <div>
          <a
            className="fa-brands fa-github icons"
            href="https://github.com/LaurenMcCall/CountryCuisine"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            className="fa-brands fa-linkedin icons"
            href="https://www.linkedin.com/in/laurenmcmccall/"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </footer>
    </div>
  )
}
