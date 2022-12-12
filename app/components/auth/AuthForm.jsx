import { Form, useActionData, useTransition as useNavigation } from "@remix-run/react";

export default function AuthForm({ title }) {
    const navigation = useNavigation()
    const validationErrors = useActionData()

    const isSubmitting = navigation.state !== 'idle'

    return (
        <div className="container h-100" style={{ padding: "10px" }}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                            {
                                validationErrors && (
                                    <div className="alert alert-danger" role="alert">
                                        <span
                                            dangerouslySetInnerHTML={{ __html: Object.values(validationErrors).join("<br />") }}
                                        />
                                    </div>
                                )
                            }
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                {title}
                            </p>
                            <Form method="post" className="mx-1 mx-md-4">
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder='Email'
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder='Password'
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button disabled={isSubmitting} className="btn btn-primary btn-lg">
                                        {title}
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}