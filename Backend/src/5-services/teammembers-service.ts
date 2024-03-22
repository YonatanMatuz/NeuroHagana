import { OkPacket } from "mysql";
import { ResourceNotFoundError } from "../2-models/client-errors";
import TeamMemberModel from "../2-models/teammember-model";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import imageHandler from "../4-utils/image-handler";
import CategoryModel from "../2-models/category-model";
import { log } from "console";

async function getAllTeamMembers(): Promise<TeamMemberModel[]> {

    const sql = `
        SELECT *,
        CONCAT('${appConfig.imagesUrl}', imageName)
        AS imageUrl
        FROM teamMembers`;

    const teamMembers = await dal.execute(sql);
    teamMembers.forEach(teamMember => delete teamMember.imageName);

    return teamMembers;
}

async function getSpecificTeamMember(teamMemberId: number): Promise<TeamMemberModel> {

    const sql = `
        SELECT *,
        CONCAT('${appConfig.imagesUrl}', imageName)
        AS imageUrl
        FROM teamMembers
        WHERE teamMemberId = ?`;

    const teamMembers = await dal.execute(sql, [teamMemberId]);

    const teamMember = teamMembers[0];
    if (!teamMember) throw new ResourceNotFoundError(teamMemberId);

    delete teamMember.image;
    delete teamMember.imageName;

    return teamMember;
}

async function getAllCategories(): Promise<CategoryModel[]> {

    const sql = `
        SELECT *
        FROM teamMemberCategories`;

    const categories = await dal.execute(sql);

    return categories;
}

async function addTeamMember(teamMember: TeamMemberModel): Promise<TeamMemberModel> {

    // Joi validation
    teamMember.validatePost();

    // We delete the frontend sent name, and use imageHandler to save the file under a new uuid with the original extension.
    let imageName = null;
    if (teamMember.image) {
        imageName = await imageHandler.saveImage(teamMember.image);
        teamMember.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `
        INSERT INTO teamMembers
        VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

    const result: OkPacket = await dal.execute(sql,
         [teamMember.name, teamMember.jobTitle, teamMember.description, teamMember.categoryId, imageName]);

    teamMember.teamMemberId = result.insertId;
    delete teamMember.image;
    
    return teamMember;
}

async function updateTeamMember(teamMember: TeamMemberModel): Promise<TeamMemberModel> {
    
    // Joi validation
    teamMember.validatePut();
   
    let imageName = await getTeamMemberImageName(teamMember.teamMemberId);
    if (imageName) {
        imageName = await imageHandler.updateImage(teamMember.image, imageName);
        teamMember.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `
        UPDATE teamMembers
        SET name = ?, jobTitle = ?, description = ?, categoryId = ?, imageName = ?
        WHERE teamMemberId = ?`;

    const result: OkPacket = await dal.execute(sql,
        [teamMember.name, teamMember.jobTitle, teamMember.description, teamMember.categoryId, imageName, teamMember.teamMemberId]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(teamMember.teamMemberId);

    delete teamMember.image;

    return teamMember;
}

// Internally used function to retrieve the imageName (or null if doesn't exist) when the frontend updates a infoTopic
async function getTeamMemberImageName(teamMemberId: number): Promise<string> {

    const sql = `
        SELECT imageName
        FROM teamMembers
        WHERE teamMemberId = ?`;

    const teamMembers = await dal.execute(sql, [teamMemberId]);
    const teamMember = teamMembers[0];

    if (!teamMember) return null;

    const imageName = teamMember.imageName;
    return imageName;
}

async function deleteTeamMember(teamMemberId: number): Promise<void> {

    let imageName = await getTeamMemberImageName(teamMemberId);

    const sql = `
        DELETE FROM teamMembers
        WHERE teamMemberId = ?`;

    const result: OkPacket = await dal.execute(sql, [teamMemberId]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(teamMemberId);
    
    await imageHandler.deleteImage(imageName);
}

export default {
    getAllTeamMembers,
    getSpecificTeamMember,
    getAllCategories,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember
}