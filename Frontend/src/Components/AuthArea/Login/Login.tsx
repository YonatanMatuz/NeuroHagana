import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import "./Login.css";
import { useForm } from "react-hook-form";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import CredentialsModel from "../../../Models/CredentialsModel";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();

    const navigate = useNavigate();

    async function sendForm(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            navigate("/Home");
            notifyService.success("Welcome"); 
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }


    return (

        <div className="Login FormBox">

            {/* Form main container */}
            <Box component="form"  className="FormContents" onSubmit={handleSubmit(sendForm)}> 

                {/* Form Title */}
                <Typography variant="h5">
                    Log In
                </Typography>

                {/* User Input */}
                <TextField
                label="Email: "
                {...register("email")} 
                required />

                {/* User Input */}
                <TextField
                label="Password: "
                className="password"
                type="password"
                {...register("password")}
                required />
                
                {/* Form Buttons */}
                <ButtonGroup fullWidth variant="contained">

                    <Button type="submit" color="success">
                        Submit &nbsp; <ArrowUpwardIcon />
                    </Button>

                    <Button type="reset"> 
                        Clear &nbsp; <ClearIcon /> 
                    </Button>

                </ButtonGroup>

            </Box>
                
        </div>

    );
}

export default Login;
