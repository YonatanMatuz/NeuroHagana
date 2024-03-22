import { Avatar, Card, CardActionArea, CardContent, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import TeamMemberModel from "../../../../../Models/TeamMemberModel";
import "./UserTeamMemberCard.css";
import { useState } from "react";


interface UserTeamMemberProps {
    teamMember: TeamMemberModel;
}

function UserTeamMemberCard(props: UserTeamMemberProps): JSX.Element {

    const [ open, setOpen ] = useState(false);

    // Opens and closes the team member's description
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (

        <div className="UserTeamMemberCard">
            
            {/* Main container */}
            <Card sx={{ maxWidth: 345, borderRadius: "35px", margin: 'auto' }} className="card">

                {/* Enables clicking anywhere to display description */}
                <CardActionArea onClick={handleClickOpen}>

                    {/* Avatar */}
                    <Avatar src={props.teamMember.imageUrl} sx={{ width: 250, height: 250, margin: "auto", marginTop: "10px", boxShadow: "1px 1px 3px 1px"}}/>

                    <CardContent>

                        {/* Name */}
                        <Typography gutterBottom variant="h5" color='h1.color'>
                            {props.teamMember.name}
                        </Typography>

                        {/* Job Title */}
                        <Typography variant="body1" color="text.secondary">
                            {props.teamMember.jobTitle}
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>

            {/* Description alert */}
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                
                {/* Name */}
                <DialogTitle>
                    {props.teamMember.name}
                </DialogTitle>

                <DialogContent>

                    {/* Description */}
                    <DialogContentText id="alert-dialog-slide-description" whiteSpace={"pre-wrap"} sx={{ padding: '15px'}}>
                        {props.teamMember.description}
                    </DialogContentText>

                </DialogContent>

            </Dialog>
        </div>
    );
}

export default UserTeamMemberCard;
