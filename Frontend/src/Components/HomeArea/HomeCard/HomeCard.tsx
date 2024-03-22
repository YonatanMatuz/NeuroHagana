import { Card, CardContent, Paper, Typography } from "@mui/material";
import "./HomeCard.css";

interface HomeCardProps {
    header: string;
    title: string;
    description: string;
    imageSrc: any;
}

function HomeCard(props: HomeCardProps): JSX.Element {

    return (

        <div className="HomeCard">

            {/* Header */}
            <Paper elevation={3}
            style={{ padding: '10px', textAlign: 'center', margin: 'auto', marginTop: '5vh', backgroundColor: '#efeae6'}}
            sx={{ width: {xl: '55vh', lg: '55vh', md: '50vh', sm: '30vh', xs: '25vh'}}}>

                <Typography variant="h2">
                    {props.header}
                </Typography>

            </Paper>

            {/* Main card container */}
            <Card className="generalCard" sx={{ width: {xl: '165vh', lg: '135vh', md: '100vh', sm: '60vh', xs: '32vh'}, flexDirection: { lg: 'row', xs: 'column' } }}>

                <CardContent className="cardContent" sx={{ width: {xl: '80vh', lg: '60vh', md: '100vh', sm: '60vh', xs: '29vh'} }}>

                    {/* Title */}
                    <Typography variant="h2">
                        {props.title}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body1" className="cardDescription" sx={{ textAlign: 'justify '}}>
                        {props.description}
                    </Typography>

                </CardContent>

                {/* Image */}
                <CardContent sx={{ width: {xl: '55vh', lg: '50vh', md: '0', sm: '60vh', xs: '30vh'} }}>

                    <div className="imageBackgroundEffect">

                        <img src={props.imageSrc}/>

                    </div>

                </CardContent>

            </Card>
			
        </div>
    );
}

export default HomeCard;
