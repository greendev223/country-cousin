import React from 'react'

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
      <section>
        <div className="welcome ">
          <h5>
            Welcome to <br /> Country Cuisine Night
          </h5>
          <h6>
            traveling the world <br /> one night-in at a time
          </h6>
          <button>
            <div>login</div>
          </button>
          <div>
            <a href="#">sign up</a>
          </div>
        </div>
        <div>
          <article>
            <h5 className="about">
              About us <br /> <br /> Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Massa ultricies mi quis hendrerit dolor magna
              eget est. Viverra tellus in hac habitasse platea dictumst
              vestibulum rhoncus. Nec ultrices dui sapien eget mi proin.
            </h5>
          </article>
        </div>
      </section>
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
