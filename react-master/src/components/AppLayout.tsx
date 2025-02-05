import { Outlet } from "react-router"
import NavBar from "./NavBar";
import Login from "./LogIn";
import Home from "./Home";
import AddRecipeButton from "./AddRecipeButton";
import { CurrentContext, userReducer } from "./User";
import { useReducer } from "react";

const AppLayout = () => {
const [user, userDispatch] = useReducer(userReducer, {id:'', firstName: '', lastName: '', passward: '', email: '', address: '', phone: '' })  
    return (<>
    <CurrentContext value={{ currentUser: user, dispatch: userDispatch }}>
                <NavBar/>
                <Outlet />
        </CurrentContext>
    </>)
}
export default AppLayout;