import { Fragment as F } from "react";

import { Link } from "react-router-dom";
import { useAppContext } from "../AppProvider";

export function Navigation({ links, style }) {
  const { user, logout } = useAppContext();

  return (
    <nav style={style}>
      {links.map(({ href, name }, i) => (
        <F key={i}>
          <Link to={href}>{name}</Link>
          {i !== links.length - 1 && " "}
        </F>
      ))}

      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
