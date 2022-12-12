import { useFetcher, useNavigate, useParams } from "@remix-run/react"

export default function ProductListItem({ id, name, description, price, count, Category }) {
    const params = useParams()
    const navigate = useNavigate()
    const fetcher = useFetcher()

    const categoryId = params.catId

    function deleteProduct() {
        const shouldDelete = confirm('Are you sure you want to delete this product?')

        if (!shouldDelete) {
            return
        }

        fetcher.submit(null, {
            method: 'delete',
            action: `/products/${categoryId}/${id}`
        })
    }

    return (
        <>
            <td>
                <div className="d-flex align-items-center">
                    <div className="ms-3">
                        <p className="fw-bold mb-1">{name}</p>
                    </div>
                </div>
            </td>
            <td>
                <p className="fw-normal mb-1">{description}</p>
            </td>
            <td>
                <p className="fw-normal mb-1">{Category.name}</p>
            </td>
            <td>
                <p className="fw-normal mb-1">${price}</p>
            </td>
            <td className="text-center">
                <p className="fw-normal mb-1">{count}</p>
            </td>
            <td>
                <div className="d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm btn-rounded"
                        data-bs-toggle="modal"
                        data-bs-target="#productModal"
                        onClick={() => navigate(`${categoryId}/${id}`)}
                    >
                        Edit
                    </button>&nbsp;
                    <button
                        type="button"
                        className="btn btn-primary btn-sm btn-rounded"
                        onClick={deleteProduct}
                    >
                        Delete
                    </button>
                </div>
            </td>
        </>
    )



}