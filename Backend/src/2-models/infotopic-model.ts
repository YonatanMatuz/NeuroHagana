import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class InfoTopicModel {

    public infoId: number;
    public title: string;
    public description: string;
    public categoryId: number;
    public imageUrl: string;
    public image: UploadedFile;

    public constructor(infoTopic: InfoTopicModel) {
        this.title = infoTopic.title;
        this.description = infoTopic.description;
        this.categoryId = infoTopic.categoryId;
        this.imageUrl = infoTopic.imageUrl;
        this.image = infoTopic.image;
    }

    private static postValidationSchema = Joi.object({
        title: Joi.string().min(3).max(40).required(),
        description: Joi.string().min(50).max(800).required(),
        categoryId: Joi.number().integer().positive().required(),
        imageUrl: Joi.any().optional(),
        image: Joi.any().required(),
    });

    // A seperate schema in this case isn't necessary as I can put the id as optional in the post schema and use it for put aswell, but I prefer to seperate this now
    // instead of in the future if more specific validation is needed
    private static putValidationSchema = Joi.object({
        infoId: Joi.number().integer().positive().required(),
        title: Joi.string().min(3).max(40).required(),
        description: Joi.string().min(50).max(800).required(),
        categoryId: Joi.number().integer().positive().required(),
        imageUrl: Joi.any().optional(),
        image: Joi.any().optional(),
    });

    public validatePost(): void {
        const result = InfoTopicModel.postValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public validatePut(): void {
        const result = InfoTopicModel.putValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default InfoTopicModel;