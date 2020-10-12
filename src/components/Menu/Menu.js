import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav role="navigation">
      <ul>
        <li>
          <Link to="/" title="Homepage">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" title="About page" aria-label="Head to About Page">
            About
          </Link>
        </li>
        <li>
          <Link to="/login" title="Login page" aria-label="Head to Login Page">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
