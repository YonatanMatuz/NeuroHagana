import "./Landing.css";
//@ts-ignore
import landingVideo from "../../../Assets/Videos/1920 x1080 Home page.mov";
import { Typography } from "@mui/material";

function Landing(): JSX.Element {

    return (

        <div className="Landing">

            <video autoPlay muted loop className="headerVideo">
                <source src={landingVideo} />
                Your browser does not support the video tag.
            </video>

            <div className="landingTitle">

                <Typography variant="h1">
                    NeuroHagana
                </Typography>

                <Typography variant="h4">
                    Unique Neuroprotective Treatment
                </Typography>      

            </div>

        </div>
    );
}

export default Landing;
