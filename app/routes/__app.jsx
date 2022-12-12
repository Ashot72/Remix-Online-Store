import { Outlet } from "@remix-run/react";
import { getUser } from "~/data/auth.server";
import MainHeader from "~/components/navigation/MainHeader";

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

export function headers() {
    return {
        'Cache-Control': 'max-age=3600'
    }
}