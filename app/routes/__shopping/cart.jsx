import { redirect } from "@remix-run/node"
import StripeCheckout from "react-stripe-checkout";
import { useFetcher, useLoaderData, useMatches } from "@remix-run/react"
import CartList from "~/components/cart/CartList"
import { requireUserSession } from "~/data/auth.server"
import { addToCart, getUserCart, add, removeAll } from "~/data/cart.server"

export default function Cart() {
    const cart = useLoaderData()
    const matches = useMatches()
    const fetcher = useFetcher()

    const user = matches.find(
        match => match.id === 'routes/__shopping'
    ).data

    const total = () => {
        if (cart) {
            const totalCount = cart.products.map(a => a.qty * a.price)
            return totalCount.reduce((v, a) => v + a, 0)
        } else {
            return 0
        }
    }

    const payments = (token) => {
        fetcher.submit({ ...token, total: total() }, {
            method: 'post',
            action: '/payments'
        })
    }

    return (
        <div className="container" style={{ marginTop: "10px" }}>
            {cart &&
                <>
                    <CartList cart={cart} />
                    <div className="card mb-3">
                        <div className="me-3">
                            <div className="d-flex justify-content-end align-items-center" style={{ height: "72px", marginRight: "16px" }}>
                                <div style={{ marginRight: "10px" }}>Total:&nbsp;<b>${total()}</b></div>
                                <StripeCheckout
                                    token={({ id }) => payments({ token: id })}
                                    amount={total() * 100}
                                    email={user.email}
                                    stripeKey="pk_test_51KwPjRKVwzOYdWGqjhA8O5jQrUHXmSo8VVJaaOBsEROZKOKqsxNzind6nj1mUTcw68MRXOHxQblzEwc8hv3CxSPT00xDuqVkzU"
                                />
                            </div>
                        </div>
                    </div>
                </>
            }

            {!cart &&
                <div className="alert-message">
                    <div className="alert alert-primary" role="alert">
                        <h3>No items found</h3>
                    </div>
                </div>
            }
        </div>
    )
}

export async function loader({ request }) {
    const userId = await requireUserSession(request)

    return await getUserCart(userId)
}

export async function action({ request }) {
    const userId = await requireUserSession(request)
    const formData = await request.formData()
    const product = Object.fromEntries(formData)

    const params = new URL(request.url).searchParams
    const action = params.get("action")

    switch (action) {
        case "addToCart":
            await addToCart(product.id, userId)
            break
        case "add":
            await add(product.id, userId, true)
            break
        case "remove":
            await add(product.id, userId, false)
            break
        case "delete":
            await removeAll(product.id, userId)
            break
    }

    return redirect("/cart")
}