import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class TeamMemberModel {

    public teamMemberId: number;
    public name: string;
    public jobTitle: string;
    public description: string;
    public categoryId: number;
    public imageUrl: string;
    public image: UploadedFile;

    public constructor(teamMember: TeamMemberModel) {
        this.name = teamMember.name;
        this.jobTitle = teamMember.jobTitle;
        this.description = teamMember.description;
        this.categoryId = teamMember.categoryId;
        this.imageUrl = teamMember.imageUrl;
        this.image = teamMember.image;
    }

    private static postValidationSchema = Joi.object({
        name: Joi.string().min(6).max(50).required(),
        jobTitle: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(50).max(1000).required(),
        categoryId: Joi.number().integer().positive().required(),
        imageUrl: Joi.any().optional(),
        image: Joi.any().required(),
    });

    // A seperate schema in this case isn't necessary as I can put the id as optional in the post schema and use it for put aswell, but I prefer to seperate this now
    // instead of in the future if more specific validation is needed
    private static putValidationSchema = Joi.object({
        teamMemberId: Joi.number().integer().positive().required(),
        name: Joi.string().min(6).max(50).required(),
        jobTitle: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(50).max(1000).required(),
        categoryId: Joi.number().integer().positive().required(),
        imageUrl: Joi.any().optional(),
        image: Joi.any().optional(),
    });

    public validatePost(): void {
        const result = TeamMemberModel.postValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public validatePut(): void {
        const result = TeamMemberModel.putValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default TeamMemberModel;