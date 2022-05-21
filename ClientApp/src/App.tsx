import React from 'react'
import { Landing } from './pages/Landing'

export function App() {
  return (
    <div>
      <header>
        <h4>
          Country <br /> Cuisine <br /> Night
        </h4>
        <nav>
          <ul>
            <li>Home</li>
            <li>|</li>
            <li>Add</li>
            <li>|</li>
            <li>Find</li>
          </ul>
        </nav>
      </header>
      <Landing />
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
