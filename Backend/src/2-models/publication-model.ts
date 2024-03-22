import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class PublicationModel {

    public publicationId: number;
    public title: string;
    public description: string;
    public refUrl: string;
    public date: string;
    public imageUrl: string;
    public image: UploadedFile;
    
    public constructor(publication: PublicationModel) {
        this.title = publication.title;
        this.description = publication.description;
        this.refUrl = publication.refUrl;
        this.date = publication.date;
        this.imageUrl = publication.imageUrl;
        this.image = publication.image;
    }

    private static postValidationSchema = Joi.object({
        title: Joi.string().min(3).max(80).required(),
        description: Joi.string().min(50).max(800).required(),
        refUrl: Joi.string().min(10).required(),
        date: Joi.date().required(),
        imageUrl: Joi.any().optional(), 
        image: Joi.any().required()
    });

    // A seperate schema in this case isn't necessary as I can put the id as optional in the post schema and use it for put aswell, but I prefer to seperate this now
    // instead of in the future if more specific validation is needed
    private static putValidationSchema = Joi.object({
        publicationId: Joi.number().integer().positive().required(),
        title: Joi.string().min(3).max(80).required(),
        description: Joi.string().min(50).max(800).required(),
        refUrl: Joi.string().min(10).required(),
        date: Joi.date().required(), 
        imageUrl: Joi.any().optional(),
        image: Joi.any().optional(),
    });

    public validatePost(): void {
        const result = PublicationModel.postValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public validatePut(): void {
        const result = PublicationModel.putValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default PublicationModel;