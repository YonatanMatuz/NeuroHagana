import "./PageNotFound.css";
import image404 from "../../../Assets/Images/404 cat.png"
import { Typography } from "@mui/material";

function PageNotFound(): JSX.Element {
    
    return (

        <div className="PageNotFound">

            <Typography variant="h2">
                404 Page not found
            </Typography>

			<img src={image404}/>

        </div>
    );
}

export default PageNotFound;
