import { Form } from "@remix-run/react";

export default function CategoryListItem({ products }) {

    return (
        products.map(({ id, name, description, price, picture, qty }) => (
            <div className="card mb-3" key={id}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row">
                            <div>
                                <img src={picture} alt={name} style={{ maxWidth: "420px" }} />
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            <div className="ms-3">
                                <h5 className="text-primary">{name}</h5>
                                <div className="small mb-0 text-secondary">{description}</div>
                                <div className="fw-bold mb-0 pe-3">Price: ${price}</div>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            <div style={{ width: "150px" }} className="d-flex flex-row">
                                <div>
                                    <Form method="post" action='/cart?action=remove'>
                                        <input type="hidden" name="id" value={id} />
                                        <button className="btn btn-link" style={{ marginTop: "-5px" }}> <i className="fas fa-minus"></i></button>
                                    </Form>
                                </div>
                                <h5 className="fw-normal mb-0">{qty}</h5>
                                <div>
                                    <Form method="post" action='/cart?action=add'>
                                        <input type="hidden" name="id" value={id} />
                                        <button className="btn btn-link" style={{ marginTop: "-5px" }}> <i className="fas fa-plus"></i></button>
                                    </Form>
                                </div>
                            </div>
                            <Form method="post" action='/cart?action=delete'>
                                <input type="hidden" name="id" value={id} />
                                <button className="btn btn-link" style={{ marginTop: "-5px" }}> <i className="fas fa-trash-alt"></i></button>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}