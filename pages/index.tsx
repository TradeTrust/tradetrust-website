import React from "react";
import { NextPage } from "next";

import Link from "next/link";
import { NavLink } from "../src/components/UI/NavLink";

const HomePage: NextPage = () => {
  return (
    <div>
      <NavLink href="/" activeClassName="text-cerulean-200">
        <a>hello</a>
      </NavLink>
      <NavLink href="/eta" activeClassName="text-cerulean-200">
        <a>hello</a>
      </NavLink>
      <button onClick={() => alert("HELLO")}>
        <Link passHref href="/eta">
          <a
            className="text-cerulean-200"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Stop propaganda
          </a>
        </Link>
      </button>
    </div>
  );
};

export default HomePage;
