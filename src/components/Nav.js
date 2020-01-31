import React, { Component } from "react";
import menu from "../data/menu";

const NavItem = ({ className, href, children, logo }) => (
  <li className={`nav-item mh2-ns f6 f4-l tc flex ${className}`}>
    <a href={href} className="no-underline black">
      {children}
    </a>
    <p className="upside">☺</p>
  </li>
);

const Nav = () => (
  <nav className="pt3 pb3 pt4-ns mb4 mb0-ns bb bw2 b--black ">
    <ul className="list flex flex-wrap flex-nowrap-ns justify-between items-center pa0 ma0">
      {menu.map(item => (
        <NavItem {...item} />
      ))}
    </ul>
  </nav>
);

export default Nav;
