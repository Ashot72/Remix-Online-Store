import AuthForm from "~/components/auth/AuthForm"
import { signup } from "~/data/auth.server"
import { validateCredentials } from "~/data/validation.server"

export default () => <AuthForm title="Sign Up" />

export async function action({ request }) {
    const formData = await request.formData()
    const credentials = Object.fromEntries(formData)

    try {
        validateCredentials(credentials)
    } catch (error) {
        return error
    }

    try {
        return await signup(credentials)
    } catch (error) {
        if (error.status === 422) {
            return { credentials: error.message }
        }
    }
}