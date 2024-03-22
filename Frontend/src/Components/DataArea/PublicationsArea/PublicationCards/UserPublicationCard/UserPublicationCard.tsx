import { Button, Card, CardContent, Typography } from "@mui/material";
import PublicationModel from "../../../../../Models/PublicationModel";
import "./UserPublicationCard.css";
import { NavLink } from "react-router-dom";
import moment from "moment";

interface UserPublicationCardProps {
    publication: PublicationModel;
    index: any;
}

function UserPublicationCard(props: UserPublicationCardProps): JSX.Element {

    function formatDate(date: string) {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        return formattedDate;
    }

    return (

        <div className="UserPublicationCard">

            {/* Main container */}
            <Card className="generalCard animatedCard" sx={{ width: {xl: '155vh', lg: '135vh', md: '100vh', sm: '60vh', xs: '32vh'}, flexDirection: { lg: 'row', sm: 'column',xs: 'column' } }}>

                <CardContent className="cardContent" sx={{ width: {xl: '80vh', lg: '60vh', md: '100vh', sm: '60vh', xs: '29vh'}}}>
                    
                    {/* Title */}
                    <Typography variant="h2">{props.publication.title}</Typography>

                    {/* Description */}
                    <Typography variant="body1" whiteSpace={"pre-wrap"}>{props.publication.description}</Typography>

                    {/* PDF button */}
                    <NavLink to={props.publication.refUrl} target="_blank">

                        <Button variant="contained" color="primary"
                         sx={{
                            '@media (max-width:600px)': { 
                              padding: '2px 10px', 
                              fontSize: '0.75rem',
                            }}}>
                            PDF
                        </Button>

                    </NavLink>
                    
                    {/* Date */}
                    <Typography variant="subtitle2">
                        Publish Date: {formatDate(props.publication.date)}
                    </Typography>

                </CardContent>
                
                {/* Image */}
                <CardContent sx={{ width: {xl: '55vh', lg: '50vh', md: '0', sm: '60vh', xs: '30vh'}, alignSelf: 'center' }}>

                    <div className="imageBackgroundEffect">

                        <img src={props.publication.imageUrl}/>

                    </div>

                </CardContent>

            </Card>
			
        </div>

    );

}

export default UserPublicationCard;
