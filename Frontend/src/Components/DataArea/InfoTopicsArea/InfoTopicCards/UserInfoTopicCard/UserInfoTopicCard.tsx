import { Card, CardContent, Typography } from "@mui/material";
import InfoTopicModel from "../../../../../Models/InfoTopicModel";
import "./UserInfoTopicCard.css";

interface UserInfoCardProps {
    infoTopic: InfoTopicModel;
    index: any;
}

function UserInfoTopicCard(props: UserInfoCardProps): JSX.Element {

    const reverseLayout = props.index % 2 === 1 ? 'reverse-layout' : '';

    return (

        <div className={`UserInfoTopicCard ${reverseLayout}`}>
            
            {/* Main container */}
            <Card className="generalCard animatedCard" sx={{ width: {xl: '165vh', lg: '135vh', md: '100vh', sm: '60vh', xs: '32vh'}, flexDirection: { lg: 'row', sm: 'column',xs: 'column' } }}>

                <CardContent className="cardContent" sx={{ width: {xl: '80vh', lg: '60vh', md: '100vh', sm: '60vh', xs: '29vh'}, textAlign: {xl: "justify"} }}>
                    
                    {/* Title */}
                    <Typography variant="h2">{props.infoTopic.title}</Typography>

                    {/* Description */}
                    <Typography variant="body1" whiteSpace={"pre-wrap"} marginTop={'4vh'}>{props.infoTopic.description}</Typography>

                </CardContent>

                {/* Image */}
                <CardContent sx={{ width: {xl: '55vh', lg: '50vh', md: '0', sm: '60vh', xs: '30vh'}, alignSelf: 'center' }}>

                    <div className="imageBackgroundEffect">

                        <img src={props.infoTopic.imageUrl}/>

                    </div>
                    
                </CardContent>

            </Card>
			
        </div>

    );

}

export default UserInfoTopicCard;
