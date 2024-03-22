import RoleModel from "./RoleModel";

class TeamMemberModel {

    public teamMemberId: number;
    public name: string;
    public jobTitle: string;
    public description: string;
    public categoryId: number;
    public imageUrl: string;
    public image: File;
    public roleId: RoleModel;

}

export default TeamMemberModel;