import Areas from "../Pages/Areas";
import Categories from "../Pages/Categories";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Levels from "../Pages/Levels";
import Login from "../Pages/Login";
import PageNotFound from "../Pages/PageNotFound";
import Places from "../Pages/Places";

const routes = [
    {
        path: "/",
        component: Home,
        isPrivate: false
    },
    {
        path: "/login",
        component: Login,
        isPrivate: false
    },
    {
        path: "/dashboard",
        component: Dashboard,
        isPrivate: true
    },
    {
        path: "/levels",
        component: Levels,
        isPrivate: true
    },
    {
        path: "/areas",
        component: Areas,
        isPrivate: true
    },
    {
        path: "/categories",
        component: Categories,
        isPrivate: true
    },
    {
        path: "/places",
        component: Places,
        isPrivate: true
    },
    {
        path: "/*",
        component: PageNotFound,
        isPrivate: false
    }
]

export default routes