import { useEffect, useState } from "react";
import TeamMemberModel from "../../../../Models/TeamMemberModel";
import "./TeamMemberList.css";
import teamMembersService from "../../../../Services/TeamMembersService";
import notifyService from "../../../../Services/NotifyService";
import UserTeamMemberCard from "../TeamMemberCards/UserTeamMemberCard/UserTeamMemberCard";
import CategoryModel from "../../../../Models/CategoryModel";
import { Paper, Typography } from "@mui/material";
import UserModel from "../../../../Models/UserModel";
import { authStore } from "../../../../Redux/AuthState";
import AdminTeamMemberCard from "../TeamMemberCards/AdminTeamMemberCard/AdminTeamMemberCard";

function TeamMemberList(): JSX.Element {
    
    const [ teamMembers, setTeamMembers ] = useState<TeamMemberModel[]>([]);

    const [ categories, setCategories ] = useState<CategoryModel[]>([])
    
    const [ user, setUser ] = useState<UserModel>();

    // Loads user first to determine if user or admin cards need to be loaded, then the categories into which the cards are filtered, and them the team members themselves.
    useEffect(() => {

        // In the rest of the app I use then/catch, here I used a async function as I call 2 service functions on mount and this looks cleaner
        async function fetchData() {
            try {

                setUser(authStore.getState().user);

                const dbCategories = await teamMembersService.getAllCategories();
                setCategories(dbCategories);
    
                const dbTeamMembers = await teamMembersService.getAllTeamMembers();

                setTeamMembers(dbTeamMembers);  

            }
            catch (err) {
                notifyService.error(err);
            }
        }
    
        fetchData();
        
    }, []);

    return (

        <div className="TeamMemberList">

                {/* Maps and displays the categories loaded on mount, inside is anthor map, I'm not a fan of a map inside a map, but in this particular case categories shouldn't exceed 3-4,
                 a number that wont cause performance issues if future scaling occurs */}
                {categories.map(c =>

                    <>
                        <Paper elevation={3} 
                        style={{margin: 'auto', marginTop: '30px', height: '60px', backgroundColor: '#f5f5f5', color: '#262262'}}
                        sx={{ width: {xl: '40vh', lg: '40vh', md: '40vh', sm: '35vh', xs: '30vh'}}}>

                            {/* Category */}
                            <Typography variant="h5">
                                {c.category}
                            </Typography>

                        </Paper>

                        <Paper elevation={3} style={{ marginBottom: '15px', color: '#262262'}}>

                            <div key={c.categoryId}>
                
                                <div className="cardsContainer">

                                    {/* If regular user display according List */}
                                    {!user &&
                                        teamMembers
                                            .filter(t => t.categoryId == c.categoryId)
                                            .map(t => <UserTeamMemberCard key={t.teamMemberId} teamMember={t} />)
                                    }
                                    
                                    {/* If Admin display according List */}
                                    {user && 
                                        teamMembers
                                            .filter(t => t.categoryId == c.categoryId)
                                            .map(t => <AdminTeamMemberCard key={t.teamMemberId} teamMember={t} />)
                                    }

                                </div>

                            </div>

                        </Paper>
                    </>
                )}
        </div>
    );
}

export default TeamMemberList;
