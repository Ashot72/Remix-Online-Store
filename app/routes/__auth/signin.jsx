import AuthForm from "~/components/auth/AuthForm"
import { signin } from "~/data/auth.server"
import { validateCredentials } from "~/data/validation.server"

export default () => <AuthForm title="Sign In" />

export async function action({ request }) {
    const formData = await request.formData()
    const credentials = Object.fromEntries(formData)

    try {
        validateCredentials(credentials)
    } catch (error) {
        return error
    }

    try {
        return await signin(credentials)
    } catch (error) {
        if (error.status === 401) {
            return { credentials: error.message }
        }
    }
}