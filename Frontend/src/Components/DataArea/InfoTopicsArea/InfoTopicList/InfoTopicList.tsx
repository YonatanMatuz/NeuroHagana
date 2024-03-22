import { useEffect, useState } from "react";
import "./InfoTopicList.css";
import InfoTopicModel from "../../../../Models/InfoTopicModel";
import infoTopicsService from "../../../../Services/InfoTopicsService";
import notifyService from "../../../../Services/NotifyService";
import UserInfoTopicCard from "../InfoTopicCards/UserInfoTopicCard/UserInfoTopicCard";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import UserModel from "../../../../Models/UserModel";
import { authStore } from "../../../../Redux/AuthState";
import AdminInfoTopicCard from "../InfoTopicCards/AdminInfoTopicCard/AdminInfoTopicCard";

function InfoTopicList(): JSX.Element {

    const [ infoTopics, setInfoTopics ] = useState<InfoTopicModel[]>([]);

    const [ user, setUser ] = useState<UserModel>();

    const params = useParams();

    // The variable is declared outside of the useEffect to use as a condition, so we can trigger a remount if the user is currently viewing the component and navigates to it again but with a different categoryId in the url
    const categoryId = +params.categoryId;

    // Loads the relevant information topics based on the categoryId in the URL
    useEffect(() => {        
        infoTopicsService.getInfoTopicsByCategory(categoryId)
        .then((dbInfoTopics => {
            setInfoTopics(dbInfoTopics);
        }))
        .catch((err) => notifyService.error(err));

        setUser(authStore.getState().user);

    }, [params.categoryId]);

    return (

        <div className="InfoTopicList">

            {/* I don't like hard coding but it's a simple solution in this case to the client's request and categories shouldn't change in the future */}
            {categoryId === 3 && 

                <div>
                    
                    <Typography variant="h2">
                        SOCIAL IMPACT
                    </Typography>

                </div>
            }
            
            {/* If regular user display according List */}
            {!user && 
                infoTopics.map((i, index) => (<UserInfoTopicCard key={i.infoId} infoTopic={i} index={index}/>))}
            
            {/* If Admin display according List */}
            {user && 
                infoTopics.map((i, index) => (<AdminInfoTopicCard key={i.infoId} infoTopic={i} index={index}/>))}
			
        </div>
    );
}

export default InfoTopicList;
