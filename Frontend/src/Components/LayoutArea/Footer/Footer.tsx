import { Grid, Typography } from "@mui/material";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer(): JSX.Element {

    return (

        <div className="Footer">

            <Grid container flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>

                <Grid item>

                    <Typography variant="caption">
                        NeuroHagana Ltd - Israel
                    </Typography>

                </Grid>

                <Grid item>

                    <Typography variant="caption">
                        Contact Us: info@NeuroHagana.com
                    </Typography>

                </Grid>

                <Grid item>
                    <Typography variant="caption">
                        Created by Y.M
                    </Typography>

                    <NavLink to="https://www.linkedin.com/in/yonatan-matuzany-6150542a7/" target="_blank">

                        <Typography>
                            <LinkedInIcon fontSize="medium"/>  
                        </Typography>

                    </NavLink>

                </Grid>

            </Grid>

        </div>

    );
    
}

export default Footer;
