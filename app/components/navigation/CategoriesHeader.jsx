import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";

export default function CategoriesHeader() {
    const user = useLoaderData()

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" to="/">
                    <div style={{ marginLeft: "250px" }}></div>
                </a>
                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" prefetch="intent" className='nav-link'>Home</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/categories" prefetch="intent" className='nav-link'>Categories </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to="/about" prefetch="intent" className={'nav-link'}>About</NavLink>
                        </li>
                        {
                            user
                                ? (
                                    <li>
                                        <Form method="post" action="/logout">
                                            <button className="btn btn-link nav-link">{user.email} | Sign Out</button>
                                        </Form>

                                    </li>
                                ) : (
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                            <li><Link className="dropdown-item" to="/signin">Sign In</Link></li>
                                            <li><Link className="dropdown-item" to="/signup">Sigh Up</Link></li>
                                        </ul>
                                    </li>
                                )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}