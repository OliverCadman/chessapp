import { RouterProps } from "../types/router.types";
import Login from "../../pages/Login";


const pageRoutes: RouterProps[] = [
    {
        name: "Login",
        path: "/auth/login",
        element: <Login />
    }
]

export default pageRoutes;