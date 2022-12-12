import { useState } from "react";
import Categories from "~/components/store/Categories";
import Products from "~/components/store/Products";
import { getCategories } from "~/data/categories.server";
import { getCategoryProducts } from "~/data/products.server";

export default function Index() {
  const [products, setProducts] = useState([])

  return (
    <div style={{ display: "flex" }} className="container">
      <Categories products={products} setProducts={setProducts} />
      <Products products={products} />
    </div>
  );
}

export async function loader({ request }) {
  const categories = await getCategories()

  if (categories.length === 0) {
    return { categoryProducts: [], categories: [] }
  }

  const url = new URL(request.url);
  const categoryId = url.searchParams.get("catId") || categories[0].id

  const categoryProducts = await getCategoryProducts(categoryId)

  return { categoryProducts, categories }
}
