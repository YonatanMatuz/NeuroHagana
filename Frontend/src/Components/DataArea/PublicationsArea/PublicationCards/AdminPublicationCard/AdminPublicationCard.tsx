import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogTitle, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import PublicationModel from "../../../../../Models/PublicationModel";
import "./AdminPublicationCard.css";
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useState } from "react";
import publicationsService from "../../../../../Services/PublicationsService";
import notifyService from "../../../../../Services/NotifyService";

interface AdminPublicationCardProps {
    publication: PublicationModel;
    index: any;
}

function AdminPublicationCard(props: AdminPublicationCardProps): JSX.Element {

    const [ openDeleteAlert, setOpenDeleteAlert] = useState(false);

    const navigate = useNavigate();

    function formatDate(date: string) {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        return formattedDate;
    }

    // Opens and closes Delete confirmation alert
    function handleOpenDeleteAlert() {
        setOpenDeleteAlert(true);
    }

    function handleCloseDeleteAlert() {
        setOpenDeleteAlert(false);
    }

    function handleDelete(publicationId: number) {
        publicationsService.deletePublication(publicationId);
        setOpenDeleteAlert(false);
        navigate("/home");
        notifyService.success("Publication successfully deleted");
    }

    // MUI components/Navlink is in the code area because of weird conflictions with MUI's prebuilt components and navlink.
    const actions = [
        { icon: <NavLink to="/addPublication" className="adminIcon"> <AddIcon/> </NavLink>, name: 'Add'},
        { icon: <NavLink to={`/updatePublication/` + props.publication.publicationId } className="adminIcon"> <EditNoteIcon /> </NavLink>, name: 'Edit' },
        { icon: <Button color="error" onClick={handleOpenDeleteAlert}> <DeleteIcon /> </Button>, name: 'Delete' },
    ];

    return (

        <div className="AdminPublicationCard">

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
                            Are you sure you want to delete this Publication?
                        </DialogTitle>

                        <DialogActions>

                            <Button onClick={handleCloseDeleteAlert}>
                                No
                            </Button>

                            <Button onClick={() => handleDelete(props.publication.publicationId)} autoFocus>
                                Yes
                            </Button>

                        </DialogActions>

                    </Dialog>

                </Box>

                <CardContent className="cardContent" sx={{ width: {xl: '70vh'} }}>

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
                <CardContent sx={{ width: {xl: '45vh'}, alignSelf: 'center' }}>

                    <div className="imageBackgroundEffect">

                        <img src={props.publication.imageUrl}/>

                    </div>

                </CardContent>

            </Card>
			
        </div>

    );

}

export default AdminPublicationCard;