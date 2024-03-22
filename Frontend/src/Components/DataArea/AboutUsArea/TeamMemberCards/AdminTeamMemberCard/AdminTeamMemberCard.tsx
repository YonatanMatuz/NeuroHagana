import { Avatar, Button, Card, CardActionArea, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import TeamMemberModel from "../../../../../Models/TeamMemberModel";
import "./AdminTeamMemberCard.css";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { NavLink, useNavigate } from "react-router-dom";
import teamMembersService from "../../../../../Services/TeamMembersService";
import notifyService from "../../../../../Services/NotifyService";


interface AdminTeamMemberProps {
    teamMember: TeamMemberModel;
}

function AdminTeamMemberCard(props: AdminTeamMemberProps): JSX.Element {

    const [ openDescription, setOpenDescription ] = useState(false);

    const [ openDeleteAlert, setOpenDeleteAlert] = useState(false);

    const navigate = useNavigate();

    // Opens and closes description alert
    function handleOpenDescription() {
        setOpenDescription(true);
    }

    function handleCloseDescription() {
        setOpenDescription(false);
    }

    // Opens and closes Delete confirmation alert
    function handleOpenDeleteAlert() {
        setOpenDeleteAlert(true);
    }

    function handleCloseDeleteAlert() {
        setOpenDeleteAlert(false);
    }

    function handleDelete(teamMemberId: number) {
        teamMembersService.deleteTeamMember(teamMemberId);
        setOpenDeleteAlert(false);
        navigate("/home");
        notifyService.success("TeamMember successfully deleted");
    }

    // MUI components/Navlink is in the code area because of weird conflictions with MUI's prebuilt components and navlink.
    const actions = [
        { icon: <NavLink to="/addTeamMember" className="adminIcon"> <AddIcon/> </NavLink>, name: 'Add'},
        { icon: <NavLink to={`/updateTeamMember/` + props.teamMember.teamMemberId } className="adminIcon"> <EditNoteIcon /> </NavLink>, name: 'Edit' },
        { icon: <Button color="error" onClick={handleOpenDeleteAlert}> <DeleteIcon /> </Button>, name: 'Delete' },
    ];

    return (

        <div className="AdminTeamMemberCard">
            
            {/* Main container */}
            <Card sx={{ maxWidth: 345, borderRadius: "35px", margin: "auto" }} className="card">

                {/* Admin buttons, parameters changeable in the actions array above */}
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    icon={<EditIcon />}
                    direction="right"
                    style={{ margin: '10px'}}
                >

                    {actions.map((action) => (
                        
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
            
                        ))}
                            
                </SpeedDial>
                
                {/* Delete confirmation alert */}
                <Dialog
                    open={openDeleteAlert}
                    onClose={handleCloseDeleteAlert}
                >

                    <DialogTitle id="alert-dialog-title">
                        Are you sure you want to delete this team member?
                    </DialogTitle>

                    <DialogActions>

                        <Button onClick={handleCloseDeleteAlert}>
                            No
                        </Button>

                        <Button onClick={() => handleDelete(props.teamMember.teamMemberId)} autoFocus>
                            Yes
                        </Button>

                    </DialogActions>

                </Dialog>
                
                {/* Enables clicking anywhere to open the team members description */}
                <CardActionArea onClick={handleOpenDescription}>
                    
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
                open={openDescription}
                keepMounted
                onClose={handleCloseDescription}
                aria-describedby="alert-dialog-slide-description"
            >

                {/* Name */}
                <DialogTitle>
                    {props.teamMember.name}
                </DialogTitle>

                <DialogContent>
                    
                    {/* Description */}
                    <DialogContentText id="alert-dialog-slide-description" whiteSpace={"pre-wrap"}>
                        {props.teamMember.description}
                    </DialogContentText>

                </DialogContent>

            </Dialog>

        </div>
        
    );
}

export default AdminTeamMemberCard;

