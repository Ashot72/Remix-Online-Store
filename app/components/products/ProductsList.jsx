import ProductListItem from "./ProductListItem";

export default function ProductsList({ products }) {

    return (
        <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(product => (
                        <tr key={product.id}>
                            <ProductListItem
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                picture={product.picture}
                                count={product.count}
                                Category={product.Category}
                            />
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}