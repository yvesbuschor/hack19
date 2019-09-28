import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';


const Landing = (props) => (
  <>
    <h1>WIP Landing</h1>
    <ul>
      <li>
        <Link to={routes.map}>Map</Link>
      </li>
      <li>
        <Link to={routes.playground}>Playground</Link>
      </li>
      <li>
        <Link to={routes.ideaDetail}>idea detail</Link>
      </li>
      <li>
        <Link to={routes.ideaSubmit}>idea submit</Link>
      </li>
    </ul>
  </>
);

export default Landing;