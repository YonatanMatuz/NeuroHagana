import { createStore } from "redux";
import TeamMemberModel from "../Models/TeamMemberModel";

export class TeamMembersState {
    public teamMembers: TeamMemberModel[] = [];
}

export enum TeamMembersActionType {
    FetchTeamMembers,
    AddTeamMember,
    UpdateTeamMember,
    DeleteTeamMember
}

export interface TeamMembersAction {
    type: TeamMembersActionType;
    payload: any;
}

export function teamMembersReducer(currentState = new TeamMembersState(), action: TeamMembersAction): TeamMembersState {

    const newState = { ...currentState };

    switch (action.type) {

        case TeamMembersActionType.FetchTeamMembers:
            newState.teamMembers = action.payload;
            break;

        case TeamMembersActionType.AddTeamMember:
            newState.teamMembers.push(action.payload);
            break;

        case TeamMembersActionType.UpdateTeamMember:
            const indexToUpdate = newState.teamMembers.findIndex(t => t.teamMemberId === action.payload.teamMemberId);
            if (indexToUpdate >= 0) {
                newState.teamMembers[indexToUpdate] = action.payload;  
            }
            break;

        case TeamMembersActionType.DeleteTeamMember:
            const indexToDelete = newState.teamMembers.findIndex(t => t.teamMemberId === action.payload);
            if (indexToDelete >= 0) {
                newState.teamMembers.splice(indexToDelete, 1);
            }
            break;
    }

    return newState;
}

export const teamMembersStore = createStore(teamMembersReducer);