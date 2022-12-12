
export default function Error({ children }) {
    return (
        <div style={{ margin: "10px" }} className="alert alert-danger" role="alert">
            <div className="alert-error">{children}</div>
        </div>
    )
}

