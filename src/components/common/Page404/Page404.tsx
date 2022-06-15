import { FC } from "react"
import { NavLink } from "react-router-dom"

const Page404: FC<object> = (props) => {
    return (
        <div>
            <h1>Page not found</h1>
            <p>This page is not found. <NavLink to="/">Go to homepage</NavLink>.</p>
        </div>
    )
}

export default Page404