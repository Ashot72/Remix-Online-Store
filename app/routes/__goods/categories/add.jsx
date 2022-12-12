
import { redirect } from "@remix-run/node";
import CategoryForm from "~/components/categories/CategoryForm";
import { requireUserSession } from "~/data/auth.server";
import { addCategory } from "~/data/categories.server";
import { validateCategoryInput } from "~/data/validation.server";

export default () => {
    return (
        <>
            <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <CategoryForm />
                </div>
            </div>
        </>
    )
}

export async function action({ request }) {
    const userId = await requireUserSession(request)

    const formData = await request.formData()
    const categoryData = Object.fromEntries(formData)

    try {
        validateCategoryInput(categoryData)
    } catch (error) {
        return error
    }

    await addCategory(categoryData, userId)
    return redirect("/categories")
}

