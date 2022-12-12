
import { Form, useActionData, useMatches, useNavigate, useParams, useTransition as useNavigation } from "@remix-run/react";
import { useRef, useEffect, useState } from "react";

export default function ProductForm() {
    const [picture, setPicture] = useState("");

    const params = useParams()
    const matches = useMatches()

    const validationErrors = useActionData()

    const data = matches.find(
        match => match.id === 'routes/__goods/products'
    ).data

    const categoryId = params.catId
    const productId = params.id

    const categories = data.categories
    const productData = data.userProducts.find(product => product.id === productId)

    if (productId && !productData) {
        return <p>Invalid product id.</p>
    }

    const navigate = useNavigate()
    const navigation = useNavigation()

    const isSubmitting = navigation.state !== 'idle'

    const nameInputRef = useRef(null)

    useEffect(() => nameInputRef.current.focus(), [])

    useEffect(() => {
        if (productData && productData.picture) {
            setPicture(productData.picture)
        }
    }, [productData])

    const closeModal = () => navigate(`/products/${categoryId}`)

    const getPicture = (e) => {
        const file = e.target.files[0]
        var reader = new FileReader();
        reader.addEventListener("load", () => setPicture(reader.result), false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <Form method={productData ? 'patch' : 'post'} className="mx-1 mx-md-4" encType="multipart/form-data">
            <input type="hidden" value={picture} name="pictureBase64" />
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="productModalLabel">
                        {params.id ? 'Update' : 'Add'} Product
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
                                defaultValue={productData?.name}
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
                                defaultValue={productData?.description}
                                name="description"
                                id="description"
                                placeholder="Description"
                                className="form-control"
                                rows={3}
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                            <input
                                defaultValue={productData?.price}
                                type="text"
                                name="price"
                                id="price"
                                placeholder="Price"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                            <input
                                defaultValue={productData?.count}
                                type="text"
                                name="count"
                                id="count"
                                placeholder="Count"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                                <select
                                    style={{ width: "418px" }}
                                    name="category"
                                    className="form-select"
                                    defaultValue={productData?.categoryId}
                                    aria-label="Categories">
                                    <option key="0" value="0">--- Select Category ---</option>
                                    {
                                        categories.map(cat =>
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        )}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-outline flex-fill mb-0">
                            <label
                                className="form-label">Choose Picture
                            </label>
                            <input
                                style={{ width: "418px" }}
                                className="form-control"
                                name="picture"
                                id="picture"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={getPicture}
                            />
                        </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        {picture && <img src={picture} alt="picture" style={{ maxWidth: "420px" }} />}
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
