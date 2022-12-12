import { Form, useMatches } from "@remix-run/react";

export default function Products({ products }) {
    const matches = useMatches()

    const user = matches.find(
        match => match.id === 'routes/__app'
    ).data

    return (
        <div style={{ width: "100%" }}>
            {products.length > 0 &&
                <div className="px-2 py-2">
                    {
                        products.map((product) =>
                            <div className="card mb-3" key={product.id}>
                                <div className="card-body">
                                    <div className="me-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <img src={product.picture}
                                                className="img-fluid" style={{ width: "150px" }} />
                                            <div className="mx-5">
                                                <h5 className="text-primary">{product.name}</h5>
                                                <div className="text-secondary">{product.description}</div>
                                                <div className="fw-bold mb-0 pe-3">Price: ${product.price}</div>
                                                <div className="mb-0 pe-3">Qty: {product.count}</div>
                                            </div>
                                            {user &&
                                                <div className="text-end">
                                                    <Form method="post" action="/cart?action=addToCart">
                                                        <input type="hidden" name="id" value={product.id} />
                                                        <button onClick={e => getId(product.id)}
                                                            className="btn btn-primary text-nowrap"
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    </Form>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}