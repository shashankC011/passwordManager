import { Outlet } from "react-router-dom";
import Appbar from "./appbar";


function Layout(){
    return(
        <div>
            <Appbar/>
            <Outlet/>
        </div>
    )
}

export default Layout;