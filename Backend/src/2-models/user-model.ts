import Joi from "joi";
import RoleModel from "./role-model";
import { ValidationError } from "./client-errors";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }
    
    private static postValidationSchema = Joi.object({
        firstName: Joi.string().min(3).max(15).required(),
        lastName: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(5).required(),
        image: Joi.any().required(),
    });

    public validatePost(): void {
        const result = UserModel.postValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default UserModel;