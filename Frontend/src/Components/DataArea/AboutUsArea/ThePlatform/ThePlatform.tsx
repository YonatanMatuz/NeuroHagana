import { Card, CardContent, Paper, Typography } from "@mui/material";
import "./ThePlatform.css";
import thePlatformImage from "../../../../Assets/Images/ThePlatform.jpeg"

function ThePlatform(): JSX.Element {

    return (

        <div className="ThePlatform">

            {/* Main title */}
            <Typography variant="h2">
                The platform to prevent neurological damages
            </Typography>

            {/* Main page card */}
            <Card className="generalCard" sx={{ width: {xl: '155vh', lg: '135vh', md: '100vh', sm: '60vh', xs: '35vh'}, flexDirection: { lg: 'row', sm: 'column', xs: 'column' } }}>

                <CardContent className="cardContent">

                    <Typography variant="body1">
                        NeuroHagana Ltd is creating a platform capable of reducing neurological damage in several cases of new acute Central Nervous System (CNS) injuries.
                    </Typography>

                    <Typography variant="body1">
                        The first treatment – currently in the pre-clinical phase – is Acute Traumatic Spinal Cord Injury (SCI).
                    </Typography>

                    <Typography variant="body1">
                        Other pathologies - all sharing the common factor of excess glutamate, which exacerbates the neurological damage – will be:
                    </Typography>

                    {/* I use a ul here because the client specifically wanted dots next to these words */}
                    <Typography variant="body1">
                        <ul>
                            <li>Stroke</li>
                            <li>Traumatic Brain Injuries (TBI);</li>
                        </ul>
                            Followed by:
                        <ul>
                            <li>Athlete Concussion </li>
                            <li>Brain hypoxia</li>
                        </ul>
                    </Typography>

                </CardContent>

                {/* Image */}
                <CardContent sx={{ width: {xl: '200vh', lg: '250vh', md: '0', sm: '60vh', xs: '35vh'}, marginTop:'-1vh', margin: 'auto' }}>

                    <img src={thePlatformImage}/>

                </CardContent>

            </Card>

            <Paper elevation={3} 
            style={{ padding: '2vh', margin: '20px auto' }}
            sx={{ width: {xl: '165vh', lg: '140vh', md: '110vh', sm: '65vh', xs: '32vh'} }}>

                <Typography variant="body1">
                    <strong>The efficacy of the new treatment for the first pathology, Spinal Cord Injury, has been tested in three clinically relevant models in mice at Tel Aviv University with strong therapeutic efficacy and with no side effects.</strong>
                </Typography>
                
            </Paper>
			
        </div>
    );
}

export default ThePlatform;
