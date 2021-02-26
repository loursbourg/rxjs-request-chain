import React from 'react';

export const Navbar = (props) => {
  return (
    <nav className="uk-navbar uk-margin-large-bottom">
      <ul className="uk-navbar-nav uk-hidden-small">
        <li>
          <a href="layouts_frontpage.html">Some</a>
        </li>
        <li>
          <a href="layouts_portfolio.html">Nav</a>
        </li>
        <li>
          <a href="layouts_blog.html">Bar</a>
        </li>
        <li>
          <a href="layouts_documentation.html">Links</a>
        </li>
      </ul>
    </nav>
  );
};
