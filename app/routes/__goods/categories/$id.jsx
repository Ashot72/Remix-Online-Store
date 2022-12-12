import { redirect } from "@remix-run/node"
import CategoryForm from "~/components/categories/CategoryForm"
import { requireUserSession } from "~/data/auth.server"
import { deleteCategory, updateCategory } from "~/data/categories.server"
import { validateCategoryInput } from "~/data/validation.server"

export default () => {
    return (
        <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <CategoryForm />
            </div>
        </div>
    )
}

export async function action({ params, request }) {
    await requireUserSession(request)

    const categoryId = params.id

    if (request.method === 'PATCH') {
        const formData = await request.formData()
        const categoryData = Object.fromEntries(formData)

        try {
            validateCategoryInput(categoryData)
        } catch (error) {
            return error
        }

        await updateCategory(categoryId, categoryData)
        return redirect("/categories")
    } else if (request.method === 'DELETE') {
        await deleteCategory(categoryId)
        return { deletedId: categoryId }
    }
}

export function meta({ params, location, data, parentsData }) {
    const category = parentsData["routes/__goods/categories"]
        .find(cat => cat.id === params.id)

    return {
        title: category ? category.name : '',
        description: 'Update category'
    }
}
