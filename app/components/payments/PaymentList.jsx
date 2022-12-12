import PaymentListItem from "./PaymentListItem";

export default function PaymentList({ payments }) {
    return (
        payments.map(payment => (
            <>
                <PaymentListItem
                    products={payment.products}
                />

            </>
        ))
    )
}
