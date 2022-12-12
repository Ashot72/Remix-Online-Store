import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUser } from "~/data/auth.server";
import commonStyles from "~/styles/common.css"

export default function AppLayout() {
    return (
        <>
            <MainHeader />
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