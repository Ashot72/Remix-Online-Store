import CartListItem from "./CartListItem";

export default function CartList({ cart }) {
    return (
        <CartListItem
            products={cart.products}
        />
    )
}

