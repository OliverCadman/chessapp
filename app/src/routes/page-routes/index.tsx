import { RouterProps } from "../types/router.types";
import Login from "../../pages/Login";
import Lobby from "../../pages/Lobby";
import { nanoid } from "nanoid";
import Arena from "../../pages/Arena";

const pageRoutes: RouterProps[] = [
  {
    name: "Login",
    path: "/auth/login",
    element: <Login />,
  },
  {
    name: "Lobby",
    path: `/arena/lobby/:lobbyId`,
    element: <Lobby />,
  },
  {
    name: "Arena",
    path: "/arena/:arenaId",
    element: <Arena />
  }
];

export default pageRoutes;
