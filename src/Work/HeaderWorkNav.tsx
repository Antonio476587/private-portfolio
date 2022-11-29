import React from "react";
import { Link } from "react-router-dom";

interface NavProps {
    typeLink?: string,
}

const Nav = React.forwardRef(function Nav({ typeLink }: NavProps, ref: React.RefObject<HTMLAnchorElement>) {
    if (typeLink === "LinkFirst") {
        return (
            <div className="second-nav">
                <li className="nav-item">
                    <Link
                        className="nav-link active"
                        to="/works"
                        ref={ref}
                    >
            Works
                    </Link>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/?P=false" ref={ref}>
            Contact
                    </a>
                </li>
            </div>
        );
    }

    return (
        <div className="first-nav">
            <li className="nav-item">
                <a className="nav-link" href="/?P=false" ref={ref} aria-current="location">
          Home
                </a>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/about" ref={ref}>
          About
                </Link>
            </li>
        </div>
    );
});

export default Nav;