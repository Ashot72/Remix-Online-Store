import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react"
import { useEffect, useState } from "react"

export default function Categories({ products, setProducts }) {
    const navigate = useNavigate()
    const fetcher = useFetcher()
    const { categoryProducts, categories: cats } = useLoaderData()

    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState(cats)

    useEffect(() => {
        if (categories && categories.length > 0) {
            setCategoryId(categories[0].id)
            setProducts(categoryProducts)
        } else {
            navigate("/categories")
        }
    }, [])

    useEffect(() => {
        if (fetcher.data) {
            setCategories(fetcher.data.categories)
            setProducts(fetcher.data.categoryProducts)
        }
    }, [fetcher.data])

    function selectCat(catId) {
        setCategoryId(catId)
        fetcher.load(`/?index&catId=${catId}`)
    }

    return (
        <div className="py-2" style={{ width: "385px" }}>
            <ul className="list-group">
                {
                    categories.map((cat) =>
                        <li
                            key={cat.id}
                            className="list-group-item d-flex justify-content-between align-items-start"
                            onClick={() => selectCat(cat.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{cat.name}</div>
                                {cat.description}
                            </div>
                            {categoryId === cat.id &&
                                <span className="badge bg-primary rounded-pill">{products.length}</span>
                            }
                        </li>
                    )}
            </ul>
        </div>
    )
}