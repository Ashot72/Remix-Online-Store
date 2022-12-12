
import { Form, useActionData, useMatches, useNavigate, useParams, useTransition as useNavigation } from "@remix-run/react";
import { useRef, useEffect } from "react";
import Error from "~/Error";

export default function CategoryForm() {
    const params = useParams()
    const matches = useMatches()

    const validationErrors = useActionData()

    const categories = matches.find(
        match => match.id === 'routes/__goods/categories'
    ).data

    const categoryData = categories.find(category => category.id === params.id)

    if (params.id && !categoryData) {

        return (
            <Error>
                <h2>Error</h2>
                <p>Invalid Category id</p>
            </Error>
        )
    }

    const navigate = useNavigate()
    const navigation = useNavigation()

    const isSubmitting = navigation.state !== 'idle'

    const nameInputRef = useRef(null);

    useEffect(() => nameInputRef.current.focus(), [])

    const closeModal = () => navigate("..")

    return (
        <Form method={categoryData ? 'patch' : 'post'} className="mx-1 mx-md-4">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="categoryModalLabel">
                        {params.id ? 'Update' : 'Add'} Category
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={closeModal}
                    >
                    </button>
                </div>
                <div>
                    {
                        validationErrors && (
                            <div className="alert alert-danger" role="alert">
                                <span
                                    dangerouslySetInnerHTML={{ __html: Object.values(validationErrors).join("<br />") }}
                                />
                            </div>
                        )
                    }
                </div>
                <div className="modal-body">
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                            <input
                                ref={nameInputRef}
                                defaultValue={categoryData?.name}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                            <textarea
                                defaultValue={categoryData?.description}
                                name="description"
                                id="description"
                                placeholder="Description"
                                className="form-control"
                                rows={3}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        disabled={isSubmitting}
                        className="btn btn-primary">
                        {isSubmitting ? 'Saving...' : params.id ? 'Update' : 'Add'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeModal}
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Form>
    )
}