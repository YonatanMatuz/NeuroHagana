import { useEffect, useState } from "react";
import "./PublicationList.css";
import PublicationModel from "../../../../Models/PublicationModel";
import publicationsService from "../../../../Services/PublicationsService";
import notifyService from "../../../../Services/NotifyService";
import UserPublicationCard from "../PublicationCards/UserPublicationCard/UserPublicationCard";
import { Box, Typography } from "@mui/material";
import UserModel from "../../../../Models/UserModel";
import { authStore } from "../../../../Redux/AuthState";
import AdminPublicationCard from "../PublicationCards/AdminPublicationCard/AdminPublicationCard";

function PublicationList(): JSX.Element {

    const [publications, setPublications] = useState<PublicationModel[]>([]);

    const [ user, setUser ] = useState<UserModel>();

    // Loads all publications + user and sorts publications by date
    useEffect(() => {

        publicationsService.getAllPublications()
            .then(dbPublications => {
                
                // Sort publications by date in descending order
                const sortedPublications = dbPublications.sort((a, b) => {
                    return parseInt(b.date) - parseInt(a.date);
                })

                setPublications(sortedPublications);
            })
            .catch(err => notifyService.error(err));

            setUser(authStore.getState().user);
    }, []);

    return (

        <div className="PublicationList">

            {/* Header image + Title */}
            <Box className="headerBox">

                <div className="headerTitle">

                    <Typography>
                        Publications & News
                    </Typography>

                </div>

            </Box>

            {/* If regular user display according List */}
			{!user && 
                publications.map((p, index) => (
                    <UserPublicationCard key={p.publicationId} publication={p} index={index}/>
            ))}

            {/* If Admin display according List */}
            {user && 
                publications.map((p, index) => (
                    <AdminPublicationCard key={p.publicationId} publication={p} index={index}/>
            ))}

        </div>

    );
}

export default PublicationList;
