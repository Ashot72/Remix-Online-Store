
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { requireUserSession } from "~/data/auth.server";
import { getUserProducts } from "~/data/products.server";
import { getCategories } from "~/data/categories.server";
import ProductsList from "~/components/products/ProductsList";

export default function Products() {
    const params = useParams()
    const data = useLoaderData()

    const hasProducts = data.userProducts && data.userProducts.length > 0
    const categoryId = params.catId

    return (
        <div className="container">
            <Outlet />
            <div className="m-2">
                <Link to={`${categoryId}/add`} style={{ textDecoration: "none" }}>
                    <span className="text-secondary">Add Product</span>
                </Link>
            </div>
            {hasProducts && <ProductsList products={data.userProducts} />}
            <div className="alert-message">
                {!hasProducts &&
                    <div className="alert alert-primary" role="alert">
                        <h3>No products found</h3>
                        <p>Start <Link to={`/products/${categoryId}/add`}>adding some</Link> products.</p>
                    </div>
                }
            </div>
        </div>
    )
}

export async function loader({ request, params }) {
    const userId = await requireUserSession(request)

    const categoryId = params.catId
    const categories = await getCategories()

    const userProducts = await getUserProducts(categoryId, userId)

    return { userProducts, categories }
}

