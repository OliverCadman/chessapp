import { RouterProps } from "../types/router.types";
import Login from "../../pages/Login";
import Lobby from "../../pages/Lobby";


const pageRoutes: RouterProps[] = [
    {
        name: "Login",
        path: "/auth/login",
        element: <Login />
    },
    {
        name: "Lobby",
        path: "/arena/lobby",
        element: <Lobby />
    }
]

export default pageRoutes;