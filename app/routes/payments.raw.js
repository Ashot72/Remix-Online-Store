import { requireUserSession } from "~/data/auth.server";
import { getUserRawPayments } from "~/data/payments.server";

export async function loader({ request }) {
    await requireUserSession(request)

    return getUserRawPayments()
}