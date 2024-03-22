import { useEffect, useState } from "react";
import "./AuthMenu.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function AuthMenu(): JSX.Element {

    const [ user, setUser ] = useState<UserModel>();

    const navigate = useNavigate();

    useEffect(() => {

        setUser(authStore.getState().user);

        const unsubscribe =authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => unsubscribe();

    }, []);

    function logout(): void {
        authService.logout();
        navigate("/Home");
        notifyService.success("Logged Out");
    }

    return (

        <div className="AuthMenu">

            {user && 

                <>
                    <Typography variant="caption"> Hello {user.firstName} </Typography>

                    <NavLink to="/Home" onClick={logout}>
                        Logout
                    </NavLink>
                </>

            }
			
        </div>
    );
}

export default AuthMenu;
