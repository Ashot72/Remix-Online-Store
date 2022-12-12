import { Outlet } from "@remix-run/react";
import CategoriesHeader from "~/components/navigation/CategoriesHeader"
import { getUser } from "~/data/auth.server";
import commonStyles from "~/styles/common.css"

export default function GoodsLayout() {
    return (
        <>
            <CategoriesHeader />
            <Outlet />
        </>
    )
}

export function loader({ request }) {
    return getUser(request)
}

export function links() {
    return [{ rel: 'stylesheet', href: commonStyles }]
}

