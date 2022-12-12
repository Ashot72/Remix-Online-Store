import { Outlet } from "@remix-run/react";
import Header from "~/components/navigation/MainHeader";

export default function AuthLayout() {
    return (
        <>
            <Header currentUser={null} pathName={"/"} />
            <Outlet />
        </>
    )
}