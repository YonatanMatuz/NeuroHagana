import { Card, CardContent, Paper, Typography } from "@mui/material";
import "./ProofOfConcept.css";
import ReactPlayer from "react-player";
import doctorImage from "../../../../Assets/Images/AngelaShowcase.jpg"

//@ts-ignore
import miceVideoOne from "../../../../Assets/Videos/MiceVideo1.mp4"
//@ts-ignore
import miceVideoTwo from "../../../../Assets/Videos/MiceVideo2.mp4"
//@ts-ignore
import miceVideoThree from "../../../../Assets/Videos/MiceVideo3.mp4"

function ProofOfConcept(): JSX.Element {

    return (

        <div className="ProofOfConcept animatedCard">

            {/* Title */}
            <Typography variant="h2">
                Pre-clinical proof of concept in Spinal Cord Injury
            </Typography>

            {/* Static card */}
            <Card className="generalCard animatedCard" sx={{ width: {xl: '155vh', lg: '135vh', md: '100vh', sm: '60vh', xs: '32vh'}, flexDirection: { lg: 'row', sm: 'column',xs: 'column' } }}>
    
                <CardContent className="cardContent" sx={{ width: {xl: '80vh', lg: '60vh', md: '100vh', sm: '60vh', xs: '29vh'}, textAlign: 'justify'}}>

                    <Typography variant="body1">
                       <li> The efficacy of the treatment has been proved in mice hemisection, compression, and contusion models of Spinal Cord Injury in the laboratories of Tel Aviv University.</li>
                    </Typography>
                    <br />

                    <Typography variant="body1">
                        <li>The spinal cords of mice were injured under general anesthesia and randomly divided into treated and untreated groups.</li>
                    </Typography>
                    <br />

                    <Typography variant="body1">
                        <li>The treatment was administered starting one hour to four hours after the injury for five consecutive days.</li>
                    </Typography>

                </CardContent>

                {/* Image */}
                <CardContent sx={{ width: {xl: '55vh', lg: '50vh', md: '0', sm: '60vh', xs: '30vh'}, alignSelf: 'center' }}>

                    <div className="imageBackgroundEffect">

                        <img src={doctorImage}/>

                    </div>

                </CardContent>

            </Card>

            <Paper elevation={3}
            style={{ padding: 20, margin: 'auto', backgroundColor: '#efeae6' }}
            sx={{ width: {xl: '170vh', lg: '150vh', md: '100vh', sm: '60vh', xs: '29vh'} }}>

                {/* Title */}
                <Typography variant="h2" color='#262262'>
                   <strong>Treated vs. untreated mice after 48 hours and 5 weeks from the day of the moderate/severe spinal cord injury.</strong>
                </Typography>
                <br />

                <div className="videoContainer">
                    
                    {/* Video */}
                    <Paper elevation={3}
                    style={{ padding: 20, backgroundColor: '#fc6464', marginBottom: '20px' }}
                    sx={{ width: {xl: '40vh', lg: '35vh', md: '95vh', sm: '55vh', xs: '23vh'} }}>

                        <ReactPlayer
                        url={miceVideoOne} 
                        controls
                        width='100%'
                        height='auto'
                        />

                        <Typography> Untreated </Typography>
                        <Typography> 5 Weeks </Typography>
                        
                    </Paper>

                    {/* Video */}
                    <Paper elevation={3}
                    style={{ padding: 20, backgroundColor: '#02ff0244', marginBottom: '20px' }}
                    sx={{ width: {xl: '40vh', lg: '35vh', md: '95vh', sm: '55vh', xs: '23vh'} }}>

                        <ReactPlayer
                        url={miceVideoTwo} 
                        controls
                        width='100%'
                        height='auto'
                        />

                        <Typography> Treated </Typography>
                        <Typography> 48 Hours </Typography>

                    </Paper>

                    {/* Video */}
                    <Paper elevation={3}
                    style={{ padding: 20, backgroundColor: '#02ff0244', marginBottom: '20px' }}
                    sx={{ width: {xl: '40vh', lg: '35vh', md: '95vh', sm: '55vh', xs: '23vh'} }}>

                        <ReactPlayer
                        url={miceVideoThree} 
                        controls
                        width='100%'
                        height='auto'
                        />

                        <Typography> Treated </Typography>
                        <Typography> 5 Weeks </Typography>

                    </Paper>

                </div>

			</Paper>

        </div>

    );

}

export default ProofOfConcept;
