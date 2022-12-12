import { redirect } from '@remix-run/node'
import ProductForm from '~/components/products/ProductForm'
import { requireUserSession } from '~/data/auth.server'
import { deleteProduct, updateProduct } from '~/data/products.server'
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

export async function action({ params, request }) {
    await requireUserSession(request)

    const productId = params.id
    const categoryId = params.catId

    if (request.method === 'PATCH') {
        const formData = await request.formData()
        const productData = Object.fromEntries(formData)

        try {
            validateProductInput(productData)
        } catch (error) {
            return error
        }

        await updateProduct(productId, productData)
        return redirect(`/products/${categoryId}`)
    } else if (request.method === 'DELETE') {
        await deleteProduct(productId)
        return { deletedId: productId }
    }
}

export function meta({ params, location, data, parentsData }) {
    const userProduct = parentsData["routes/__goods/products"].userProducts
        .find(product => product.id === params.id)

    return {
        title: userProduct ? userProduct.name : '',
        description: 'Update product'
    }
}