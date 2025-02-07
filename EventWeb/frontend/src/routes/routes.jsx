import Landing from "../pages/Landing";
import Evenement from "../pages/Evenement";
import Prestataire from "../pages/Prestataire";
import Service from "../pages/service";
import Billets from "../pages/Billets";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profil from "../pages/Profil";
import Dashboard from "../pages/Dashboard";

const routes = [
    {
        path: "/",
        name: "Landing",
        Element: Landing,
    },
    {
        path: "/evenement",
        name: "Evenement",
        Element: Evenement,
    },
    {
        path: "/prestataire",
        name: "Prestataire",
        Element: Prestataire,
    },
    {
        path: "/service",
        name: "Service",
        Element: Service,
    },
    {
        path: "/billets",
        name: "Billets",
        Element: Billets,
    }
];

export default routes;