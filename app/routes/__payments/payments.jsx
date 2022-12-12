
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PaymentList from "~/components/payments/PaymentList";
import { requireUserSession } from "~/data/auth.server";
import { addPayments, getUserPayments } from "~/data/payments.server";

export default function Payments() {
    const payments = useLoaderData()

    return (
        <div className="container" style={{ marginTop: "10px" }}>
            <div className="m-2">
                <a href={'/payments/raw'} target="_blank" style={{ textDecoration: "none" }}>
                    <span className="text-secondary">Get Raw Orders</span>
                </a>
            </div>
            <PaymentList payments={payments} />
            {
                payments.length === 0 &&
                <div className="alert-message">
                    <div className="alert alert-primary" role="alert">
                        <h3>No orders found</h3>
                    </div>
                </div>
            }
        </div>
    )
}

export async function loader({ request }) {
    const userId = await requireUserSession(request)

    return await getUserPayments(userId)
}

export async function action({ request }) {
    const userId = await requireUserSession(request)
    
    const formData = await request.formData()
    const { token, total } = Object.fromEntries(formData)

    await addPayments(userId, token, total)

    return redirect("/payments")
}