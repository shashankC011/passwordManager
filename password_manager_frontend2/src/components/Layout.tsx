import { Outlet } from "react-router-dom";
import Appbar from "./appbar";

interface Props{
    appbarRefresh: number,
    setAppbarRefresh: React.Dispatch<React.SetStateAction<number>>;
}
function Layout(props:Props){
    return(
        <div>
            <Appbar appbarRefresh = {props.appbarRefresh} setAppbarRefresh = {props.setAppbarRefresh}/>
            <Outlet/>
        </div>
    )
}

export default Layout;