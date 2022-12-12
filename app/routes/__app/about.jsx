import { Link, Outlet } from "@remix-run/react";

export default function About() {
    return (
        <div className="container" style={{ marginTop: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "24px", marginBottom: "10px" }}><b>About Us Page</b></div>
            <div>
                <img src="images/ecommerce.png" alt="E-Commerce" />
            </div>
        </div>
    )
}

export const handle = { disableJS: true }

export function headers({
    actionHeaders,
    loaderHeaders,
    parentHeaders
}) {
    return {
        'Cache-Control': parentHeaders.get("Cache-Control")
    }
}