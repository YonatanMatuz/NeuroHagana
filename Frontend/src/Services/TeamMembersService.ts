import axios from "axios";
import TeamMemberModel from "../Models/TeamMemberModel";
import { TeamMembersActionType, teamMembersStore } from "../Redux/TeamMembersState";
import appConfig from "../Utils/AppConfig";
import CategoryModel from "../Models/CategoryModel";

class TeamMembersService {

    public async getAllTeamMembers(): Promise<TeamMemberModel[]> {

        let teamMembers = teamMembersStore.getState().teamMembers;
        
        if (teamMembers.length === 0) {

            const response = await axios.get<TeamMemberModel[]>(appConfig.teamMembers.baseUrl);
            teamMembers = response.data;

            teamMembersStore.dispatch({ type: TeamMembersActionType.FetchTeamMembers, payload: teamMembers });
        }

        return teamMembers;
    }

    public async getSpecificTeamMember(teamMemberId: number): Promise<TeamMemberModel> {

        const teamMembers = teamMembersStore.getState().teamMembers;
        let teamMember = teamMembers.find(t => t.teamMemberId === teamMemberId);

        if(!teamMember) {
            const response = await axios.get<TeamMemberModel>(appConfig.teamMembers.baseUrl + teamMemberId);
            teamMember = response.data;
        }

        return teamMember;
    }

    public async getAllCategories(): Promise<CategoryModel[]> {
        const response = await axios.get<CategoryModel[]>(appConfig.teamMembers.getCategoriesUrl);
        const categories = response.data;
        return categories;
    }

    // ------------------------------- Admin only functions ------------------------------------ //
    
    public async addTeamMember(teamMember: TeamMemberModel): Promise<TeamMemberModel> {
        
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<TeamMemberModel>(appConfig.teamMembers.baseUrl, teamMember, { headers });

        const addedTeamMember = response.data;
        teamMembersStore.dispatch({ type: TeamMembersActionType.AddTeamMember, payload: addedTeamMember });

        return addedTeamMember;
    }

    public async updateTeamMember(teamMember: TeamMemberModel): Promise<void> {

        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.put<TeamMemberModel>(appConfig.teamMembers.baseUrl + teamMember.teamMemberId, teamMember, { headers });

        const updatedTeamMember = response.data;
        teamMembersStore.dispatch({ type: TeamMembersActionType.UpdateTeamMember, payload: updatedTeamMember });
    }

    public async deleteTeamMember(teamMemberId: number): Promise<void> {
        await axios.delete<TeamMemberModel>(appConfig.teamMembers.baseUrl + teamMemberId);
        teamMembersStore.dispatch({ type: TeamMembersActionType.DeleteTeamMember, payload: teamMemberId });
    }
}

const teamMembersService = new TeamMembersService();

export default teamMembersService;