import { redirect } from '@remix-run/node'
import ProductForm from '~/components/products/ProductForm'
import { requireUserSession } from '~/data/auth.server'
import { addProduct } from '~/data/products.server'
import { validateProductInput } from "~/data/validation.server"

export default () => {
    return (
        <div className='modal' tabIndex="-1" style={{ display: 'block' }}>
            <div className='modal-dialog'>
                <ProductForm />
            </div>
        </div>
    )
}

export async function action({ request, params }) {
    const userId = await requireUserSession(request)

    const categoryId = params.catId

    const formData = await request.formData()
    const productData = Object.fromEntries(formData)

    try {
        validateProductInput(productData)
    } catch (error) {
        return error
    }

    await addProduct(productData, categoryId, userId)
    return redirect(`/products/${categoryId}`)
}