import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogTitle, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import InfoTopicModel from "../../../../../Models/InfoTopicModel";
import "./AdminInfoTopicCard.css";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import infoTopicsService from "../../../../../Services/InfoTopicsService";
import notifyService from "../../../../../Services/NotifyService";

interface AdminInfoCardProps {
    infoTopic: InfoTopicModel;
    index: any;
}

function AdminInfoTopicCard(props: AdminInfoCardProps): JSX.Element {

    const reverseLayout = props.index % 2 === 1 ? 'reverse-layout' : '';

    const [ openDeleteAlert, setOpenDeleteAlert] = useState(false);

    const navigate = useNavigate();

    // Opens and closes Delete confirmation alert
    function handleOpenDeleteAlert() {
        setOpenDeleteAlert(true);
    }

    function handleCloseDeleteAlert() {
        setOpenDeleteAlert(false);
    }

    function handleDelete(infoId: number) {
        infoTopicsService.deleteInfoTopic(infoId);
        setOpenDeleteAlert(false);
        navigate("/home");
        notifyService.success("Information Topic successfully deleted");
    }

    // MUI components/Navlink is in the code area because of weird conflictions with MUI's prebuilt components and navlink.
    const actions = [
        { icon: <NavLink to="/addInfoTopic" className="adminIcon"> <AddIcon/> </NavLink>, name: 'Add'},
        { icon: <NavLink to={`/updateInfoTopic/` + props.infoTopic.infoId } className="adminIcon"> <EditNoteIcon /> </NavLink>, name: 'Edit' },
        { icon: <Button color="error" onClick={handleOpenDeleteAlert}> <DeleteIcon /> </Button>, name: 'Delete' },
    ];

    return (
        
        <div className={`AdminInfoTopicCard ${reverseLayout}`}>
            
            {/* Main container */}
            <Card className="generalCard animatedCard">

                <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>

                    {/* Admin buttons, parameters changeable in the actions array above */}
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        icon={<EditIcon />}
                        direction="down"
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
                            Are you sure you want to delete this information topic?
                        </DialogTitle>

                        <DialogActions>

                            <Button onClick={handleCloseDeleteAlert}>
                                No
                            </Button>

                            <Button onClick={() => handleDelete(props.infoTopic.infoId)} autoFocus>
                                Yes
                            </Button>

                        </DialogActions>

                    </Dialog>

                </Box>

                <CardContent className="cardContent" sx={{ width: {xl: '80vh'}, textAlign: 'justify'}}>
                    
                    {/* Title */}
                    <Typography variant="h2">{props.infoTopic.title}</Typography>
                    
                    {/* Description */}
                    <Typography variant="body1" whiteSpace={"pre-wrap"}>{props.infoTopic.description}</Typography>
              

                </CardContent>
                
                {/* Image */}
                <CardContent sx={{ width: {xl: '55vh'}, alignSelf: 'center' }}>

                    <div className="imageBackgroundEffect">

                        <img src={props.infoTopic.imageUrl}/>

                    </div>

                </CardContent>

            </Card>
			
        </div>
    );
}

export default AdminInfoTopicCard;
