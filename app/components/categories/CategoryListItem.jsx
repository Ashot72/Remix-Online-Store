import { useFetcher, useNavigate } from "@remix-run/react"

export default function CategoryListItem({ id, name, description, userId, user }) {
    const navigate = useNavigate()
    const fetcher = useFetcher()

    function deleteCategory() {
        const shouldDelete = confirm('Are you sure you want to delete this category?')

        if (!shouldDelete) {
            return
        }

        fetcher.submit(null, {
            method: 'delete',
            action: `/categories/${id}`
        })
    }

    return (
        <>
            <td style={{ width: "33%" }}>
                <div className="fw-bold mb-1">{name}</div>
            </td>
            <td style={{ width: "33%" }}>
                <div className="mb-1">{description}</div>
            </td>
            <td>
                <div className="d-flex justify-content-center">
                    <button
                        disabled={userId !== user.id}
                        type="button"
                        className="btn btn-primary btn-sm btn-rounded"
                        data-bs-toggle="modal"
                        data-bs-target="#categoryModal"
                        onClick={() => navigate(id)}
                    >
                        Edit
                    </button>&nbsp;
                    <button
                        disabled={userId !== user.id}
                        type="button"
                        className="btn btn-primary btn-sm btn-rounded"
                        onClick={deleteCategory}
                    >
                        Delete
                    </button>&nbsp;
                    <button
                        type="button"
                        className="btn btn-primary btn-sm btn-rounded"
                        onClick={() => navigate(`/products/${id}`)}
                    >
                        View Products
                    </button>
                </div>
            </td>
        </>
    )
}