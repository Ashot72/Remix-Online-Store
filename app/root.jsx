import { useEffect } from "react";
import bootstrapCSS from "bootstrap/dist/css/bootstrap.min.css";
import fontawsome from '@fortawesome/fontawesome-free/css/all.css'
import Error from "./Error";
import errorStyles from "~/styles/error.css"
const {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useCatch,
  Link,
} = require("@remix-run/react");

export const meta = () => ({
  charset: "utf-8",
  title: "Online Store",
  viewport: "width=device-width,initial-scale=1",
});

function Document({ title, children }) {
  const matches = useMatches()

  const disableJS = matches.some(match => match.handle?.disableJS)

  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <Document tutle={caught.statusText}>
      <Error>
        <h2>{caught.statusText}</h2>
        <p>{caught.data?.message || 'Something went wrong.'}</p>
        <p>Back to <Link to="/">Home</Link></p>
      </Error>
    </Document>
  )
}

export function ErrorBoundary({ error }) {
  return (
    <Document title="An error occured">
      <Error>
        <h2>An error occured.</h2>
        <p>{error.message || "Something went wrong."}</p>
        <p>Back to <Link to="/">Home</Link></p>
      </Error>
    </Document>
  )
}

export function links() {
  return [
    { rel: 'stylesheet', href: bootstrapCSS },
    { rel: 'stylesheet', href: fontawsome },
    { rel: 'stylesheet', href: errorStyles }]
}
