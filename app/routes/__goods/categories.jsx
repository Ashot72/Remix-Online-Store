import { Link, Outlet, useLoaderData } from "@remix-run/react";
import CategoriesList from "~/components/categories/CategoriesList";
import { getCategories } from "~/data/categories.server";

export default function Categories() {
    const categories = useLoaderData()

    const hasCategories = categories && categories.length > 0

    return (
        <div className="container">
            <Outlet />
            <div className="m-2">
                <Link to="add" style={{ textDecoration: "none" }}>
                    <span className="text-secondary">Add Category</span>
                </Link>
            </div>
            {hasCategories && <CategoriesList categories={categories} />}
            <div className="alert-message">
                {!hasCategories &&
                    <div className="alert alert-primary" role="alert">
                        <h3>No categories found</h3>
                        <p>Start <Link to="add">adding some</Link> categories.</p>
                    </div>
                }
            </div>
        </div>
    )
}

export function loader() {
    return getCategories()
}

export function headers() {
    return {
        'Cache-Control': 'max-age=3600'
    }
}
